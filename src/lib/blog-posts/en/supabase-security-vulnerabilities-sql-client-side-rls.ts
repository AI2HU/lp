import { BlogPost } from '../../blog-posts';

export const supabaseSecurityVulnerabilitiesSqlClientSideRls: BlogPost = {
  slug: "supabase-security-vulnerabilities-sql-client-side-rls",
  lang: "en",
  title: "Supabase: critical security vulnerabilities of client-side SQL queries",
  excerpt: "Exposing SQL queries directly from JavaScript client code is a major security vulnerability. Technical analysis of risks, the crucial importance of RLS, and Edge Functions as a secure solution.",
  content: `
<strong>Supabase</strong> offers an automatic REST API that allows querying your PostgreSQL database directly from client-side JavaScript code. However, this apparent simplicity hides <strong>critical security risks</strong> if best practices are not followed. Too many developers, seduced by ease of use, expose their data without adequate protection, creating gaping vulnerabilities in their applications. To understand the real costs of Supabase, check out our <a href="/en/blog/supabase-real-cost-technical-pricing" class="text-accent hover:text-accent/80 underline font-semibold">in-depth technical analysis</a>.

This article explores in detail the <strong>security vulnerabilities related to client-side SQL queries</strong>, explains why <strong>Row Level Security (RLS)</strong> is absolutely crucial, and presents <strong>Edge Functions</strong> as a secure solution for sensitive operations.

## The simplicity trap: SQL queries exposed client-side

Supabase automatically generates a REST API from your PostgreSQL schema via PostgREST. This technical magic allows writing queries directly from the browser:

<code>
import { createClient } from '@supabase/supabase-js'


const supabase = createClient(
  'https://your-project.supabase.co',
  'your-public-key'
)


// Direct query from client
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', 'admin@example.com')
</code>

This approach is appealing because it eliminates the need for a dedicated backend for simple CRUD operations. However, <strong>this simplicity masks a fundamental danger: your public API key is visible in the JavaScript source code</strong>, accessible to anyone who inspects your web application's code.

### The public API key problem

Supabase's public API key (anon key) is designed to be exposed client-side. It allows authenticating requests, but it must never be used as the sole security mechanism. Here's why:

<code>

// ❌ DANGEROUS: API key visible in source code
const SUPABASE_URL = 'https://your-project.supabase.co'


// Visible to everyone!
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Anyone can extract this key and use it
// from any environment
</code>

An attacker can easily extract this key from browser DevTools, from minified source code (even obfuscated), or from development tools. Once in possession of this key, they can make requests to your Supabase API from any environment, potentially bypassing CORS restrictions if they're not properly configured.

### Possible attacks without RLS

Without Row Level Security (RLS) enabled, an attacker can potentially:

**1. Read all data from all tables**

<code>
// Attack from external script
const { data } = await supabase
  .from('users')
  .select('*') // Retrieves ALL users


const { data: orders } = await supabase
  .from('orders')
  .select('*') // Retrieves ALL orders


const { data: payments } = await supabase
  .from('payments')
  .select('*') // Retrieves ALL payments
</code>

**2. Modify or delete data**

<code>
// Malicious update
await supabase
  .from('users')
  .update({ role: 'admin' })
  .eq('id', 'user-id-attacker')


// Data deletion
await supabase
  .from('orders')
  .delete()
  .gte('created_at', '2024-01-01')
</code>

**3. Perform SQL injections via PostgREST**

Although PostgREST offers some protection against classic SQL injections, sophisticated attacks can exploit filtering features:

<code>
// Injection attempt via PostgREST operators
const maliciousInput = "admin' OR '1'='1"


const { data } = await supabase
  .from('users')
  .select('*')
  .or(\`email.eq.\${maliciousInput},role.eq.admin\`)
</code>

**4. Consume resources and generate costs**

An attacker can launch massive queries to saturate your database and generate significant costs:

<code>
// Denial of service attack
for (let i = 0; i < 10000; i++) {
  await supabase
    .from('users')
    .select('*')
    .limit(1000)
}
</code>

## Row Level Security (RLS): essential protection

<strong>Row Level Security (RLS)</strong> is a native PostgreSQL feature that allows defining security policies at the data row level. With RLS enabled, even if a user has access to a table, they can only see or modify rows authorized by the defined policies.

### Enable RLS on a table

The first step is to enable RLS on each sensitive table:

<code>
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;


-- Enable RLS on orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;


-- Enable RLS on payments table
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
</code>

<strong>Important:</strong> Once RLS is enabled, by default, all operations (SELECT, INSERT, UPDATE, DELETE) are blocked. You must create explicit policies to authorize necessary access.

### Create basic RLS policies

RLS policies use SQL expressions that return a boolean. Here are examples of common policies:

<code>
-- Policy: users can only view their own profile
CREATE POLICY "Users can view own profile"
ON users
FOR SELECT
USING (auth.uid() = id);


-- Policy: users can update their own profile
CREATE POLICY "Users can update own profile"
ON users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);


-- Policy: users can view their own orders
CREATE POLICY "Users can view own orders"
ON orders
FOR SELECT
USING (auth.uid() = user_id);


-- Policy: users can create their own orders
CREATE POLICY "Users can create own orders"
ON orders
FOR INSERT
WITH CHECK (auth.uid() = user_id);
</code>

The \`auth.uid()\` function returns the ID of the currently authenticated user via Supabase Auth. This function is crucial for linking data to the user.

### Advanced RLS policies

For more complex use cases, you can create sophisticated policies:

<code>
-- Policy: administrators can see everything
CREATE POLICY "Admins can view all users"
ON users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);


-- Policy: users can view their team's orders
CREATE POLICY "Users can view team orders"
ON orders
FOR SELECT
USING (
  user_id IN (
    SELECT id FROM users
    WHERE team_id = (
      SELECT team_id FROM users
      WHERE id = auth.uid()
    )
  )
);


-- Policy: users can view public products or their own products
CREATE POLICY "Users can view public or own products"
ON products
FOR SELECT
USING (
  is_public = true
  OR owner_id = auth.uid()
);
</code>

### Common RLS pitfalls

Even with RLS enabled, configuration errors can create vulnerabilities:

**1. Forgetting to enable RLS on certain tables**

<code>
-- ❌ DANGEROUS: Table without RLS
CREATE TABLE api_keys (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  key_value TEXT NOT NULL
);
-- RLS not enabled = data accessible to everyone!
</code>

**2. Overly permissive policies**

<code>
-- ❌ DANGEROUS: Policy too broad
CREATE POLICY "Everyone can view users"
ON users
FOR SELECT
USING (true); -- Allows ALL users to see ALL profiles
</code>

**3. Forgetting UPDATE/DELETE policies**

<code>
-- ⚠️ INCOMPLETE: Only SELECT protected
CREATE POLICY "Users can view own data"
ON sensitive_data
FOR SELECT
USING (auth.uid() = user_id);
-- But UPDATE and DELETE are not protected!
</code>

**4. Using insecure functions in policies**

<code>
-- ❌ DANGEROUS: Function that can be bypassed
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- This function can be called directly and bypassed
  RETURN EXISTS (
    SELECT 1 FROM users WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE POLICY "Admins can do anything"
ON sensitive_table
FOR ALL
USING (is_admin(auth.uid())); -- Risk if function is poorly secured
</code>

### Test your RLS policies

It's crucial to test your RLS policies to ensure they work correctly:

<code>
// Test: a user cannot see another user's data
const { data: otherUser } = await supabase
  .from('users')
  .select('*')
  .eq('id', 'other-user-id')
  .single()


// Should return null or an error if RLS is correctly configured
if (otherUser) {
  console.error('❌ VULNERABILITY: RLS is not working correctly')
}


// Test: a user can see their own data
const { data: ownData } = await supabase
  .from('users')
  .select('*')
  .eq('id', currentUser.id)
  .single()


if (!ownData) {
  console.error('❌ PROBLEM: RLS blocks even own data')
}
</code>

## Edge Functions: the solution for sensitive operations

Even with perfectly configured RLS, certain operations should never be performed directly from the client. Supabase's <strong>Edge Functions</strong> allow executing serverless code at the network edge, offering a secure environment for critical operations.

### Why use Edge Functions?

**1. Complex business logic**

Edge Functions allow implementing complex business logic that shouldn't be exposed client-side:

<code>
// ❌ DANGEROUS: Calculation logic client-side
const calculatePrice = (basePrice: number, discount: number) => {
  // An attacker can modify this logic in the browser
  return basePrice * (1 - discount)
}


// ✅ SECURE: Logic in an Edge Function
// supabase/functions/calculate-price/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


serve(async (req) => {
  const { basePrice, discount } = await req.json()
  

  // Secure server-side logic
  const finalPrice = basePrice * (1 - discount)
  

  // Additional validation and checks
  if (discount > 0.5) {
    return new Response(
      JSON.stringify({ error: 'Discount too high' }),
      { status: 400 }
    )
  }
  

  return new Response(JSON.stringify({ price: finalPrice }))
})
</code>

**2. Access to secret API keys**

Edge Functions have access to environment variables and secret keys that must never be exposed client-side:

<code>
// supabase/functions/send-email/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


serve(async (req) => {
  // Retrieving secret key (never exposed to client)
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  

  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  

  const { to, subject, body } = await req.json()
  

  // Using external email service with secret API key
  const emailApiKey = Deno.env.get('EMAIL_SERVICE_API_KEY')!
  

  const response = await fetch('https://api.email-service.com/send', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${emailApiKey}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ to, subject, body })
  })
  

  return new Response(JSON.stringify({ success: true }))
})
</code>

**3. Batch operations and transactions**

Edge Functions allow performing complex batch operations in a transaction:

<code>
// supabase/functions/process-order/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


serve(async (req) => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  

  const { orderId } = await req.json()
  

  // Retrieve order with verification
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', orderId)
    .single()
  

  if (orderError || !order) {
    return new Response(
      JSON.stringify({ error: 'Order not found' }),
      { status: 404 }
    )
  }
  

  // Stock verification for all items
  for (const item of order.order_items) {
    const { data: product } = await supabase
      .from('products')
      .select('stock')
      .eq('id', item.product_id)
      .single()
    

    if (!product || product.stock < item.quantity) {
      return new Response(
        JSON.stringify({ error: 'Insufficient stock' }),
        { status: 400 }
      )
    }
  }
  

  // Transaction: update stock and create payment
  const { error: transactionError } = await supabase.rpc('process_order_transaction', {
    order_id: orderId
  })
  

  if (transactionError) {
    return new Response(
      JSON.stringify({ error: transactionError.message }),
      { status: 500 }
    )
  }
  

  return new Response(JSON.stringify({ success: true }))
})
</code>

**4. Advanced validation and sanitization**

Edge Functions allow implementing complex validations that cannot be bypassed:

<code>
// supabase/functions/create-user/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod/mod.ts'


const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  name: z.string().min(2).max(100)
})


serve(async (req) => {
  try {
    const body = await req.json()
    const validatedData = createUserSchema.parse(body)
    

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    

    // Email uniqueness verification
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', validatedData.email)
      .single()
    

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Email already exists' }),
        { status: 400 }
      )
    }
    

    // Create user with password hash
    const { data: newUser, error } = await supabase.auth.admin.createUser({
      email: validatedData.email,
      password: validatedData.password,
      user_metadata: { name: validatedData.name }
    })
    

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      )
    }
    

    return new Response(JSON.stringify({ user: newUser }))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: error.errors }),
        { status: 400 }
      )
    }
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
})
</code>

### Call an Edge Function from the client

From client code, you call an Edge Function securely:

<code>
// Call from client
const { data, error } = await supabase.functions.invoke('calculate-price', {
  body: { basePrice: 100, discount: 0.1 }
})


if (error) {
  console.error('Error:', error)
} else {
  console.log('Price:', data.price)
}
</code>

The Edge Function automatically receives the authenticated user's JWT token, allowing identity verification:

<code>
// In the Edge Function
serve(async (req) => {
  // Retrieve JWT token from headers
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    )
  }
  

  const token = authHeader.replace('Bearer ', '')
  

  // Token verification with Supabase
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  

  const { data: { user }, error } = await supabase.auth.getUser(token)
  

  if (error || !user) {
    return new Response(
      JSON.stringify({ error: 'Invalid token' }),
      { status: 401 }
    )
  }
  

  // Secure logic with authenticated user
  // ...
})
</code>

## Security best practices with Supabase

To properly secure your Supabase application, follow these best practices:

### 1. Enable RLS on all sensitive tables

<code>
-- Script to enable RLS on all tables
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', r.tablename);
  END LOOP;
END $$;
</code>

### 2. Use restrictive RLS policies by default

<code>
-- Default policy: everything is blocked
-- Then add explicit exceptions
CREATE POLICY "Users can only see own data"
ON sensitive_data
FOR SELECT
USING (auth.uid() = user_id);
</code>

### 3. Never expose the service_role key client-side

<code>
// ❌ NEVER in client code
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'


// ✅ Only in Edge Functions or backend
// Via Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
</code>

### 4. Validate all user input

<code>
// Use validation libraries like Zod
import { z } from 'zod'


const userInputSchema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(120)
})


const validated = userInputSchema.parse(userInput)
</code>

### 5. Limit queries with limits

<code>
// Always limit the number of results
const { data } = await supabase
  .from('posts')
  .select('*')
  .limit(100) // Explicit limit
</code>

### 6. Use indexes for RLS performance

<code>
-- Create indexes on columns used in RLS policies
CREATE INDEX idx_users_id ON users(id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_products_owner_id ON products(owner_id);
</code>

## Conclusion

Supabase offers a remarkable development experience, but this simplicity must not come at the expense of security. <strong>Exposing SQL queries directly from the client without adequate protection is a critical security vulnerability</strong> that can lead to exposure of sensitive data, unauthorized modifications, and denial of service attacks.

<strong>Row Level Security (RLS)</strong> is absolutely essential to protect your data. It must be enabled on all sensitive tables, with restrictive and well-tested policies. However, RLS alone is not enough for all operations. <strong>Edge Functions</strong> offer a secure environment for complex business logic, access to secret API keys, and transactional operations.

The golden rule: <strong>if an operation involves complex business logic, secret keys, or critical validations, it must be performed in an Edge Function or dedicated backend, never directly from the client.</strong> Security is not optional, and the few extra minutes spent correctly configuring RLS and creating Edge Functions can avoid costly and irreversible disasters.
  `,
  author: "Jonathan Serra",
  publishedAt: "2025-12-14",
  readTime: "15 min",
  tags: ["Supabase", "Security", "RLS", "PostgreSQL", "Edge Functions", "SQL Injection", "Client-Side", "PostgREST"]
};