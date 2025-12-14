import { BlogPost } from '../blog-posts';

export const supabaseFaillesSecuriteSqlClientSideRls: BlogPost = {
  slug: "supabase-failles-securite-sql-client-side-rls",
  title: "Supabase : les failles de sécurité critiques des requêtes SQL côté client",
  excerpt: "Exposer des requêtes SQL directement depuis le client JavaScript est une faille de sécurité majeure. Analyse technique des risques, de l'importance cruciale du RLS et des Edge Functions comme solution sécurisée.",
  content: `
<strong>Supabase</strong> offre une API REST automatique qui permet d'interroger directement votre base de données PostgreSQL depuis le code JavaScript côté client. Cette simplicité apparente cache cependant des <strong>risques de sécurité critiques</strong> si les bonnes pratiques ne sont pas respectées. Trop de développeurs, séduits par la facilité d'utilisation, exposent leurs données sans protection adéquate, créant des failles béantes dans leurs applications. Pour comprendre les coûts réels de Supabase, consultez notre <a href="/blog/supabase-cout-reel-technique-pricing" class="text-accent hover:text-accent/80 underline font-semibold">analyse technique approfondie</a>.

Cet article explore en détail les <strong>failles de sécurité liées aux requêtes SQL côté client</strong>, explique pourquoi le <strong>Row Level Security (RLS)</strong> est absolument crucial, et présente les <strong>Edge Functions</strong> comme solution sécurisée pour les opérations sensibles.

## Le piège de la simplicité : requêtes SQL exposées côté client

Supabase génère automatiquement une API REST à partir de votre schéma PostgreSQL via PostgREST. Cette magie technique permet d'écrire des requêtes directement depuis le navigateur :

<code>
import { createClient } from '@supabase/supabase-js'


const supabase = createClient(
  'https://votre-projet.supabase.co',
  'votre-cle-publique'
)


// Requête directe depuis le client
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', 'admin@example.com')
</code>

Cette approche est séduisante car elle élimine la nécessité d'un backend dédié pour les opérations CRUD simples. Cependant, <strong>cette simplicité masque un danger fondamental : votre clé API publique est visible dans le code source JavaScript</strong>, accessible à quiconque inspecte le code de votre application web.

### Le problème de la clé API publique

La clé API publique de Supabase (anon key) est conçue pour être exposée côté client. Elle permet d'authentifier les requêtes, mais elle ne doit jamais être utilisée comme mécanisme de sécurité unique. Voici pourquoi :

<code>

// ❌ DANGEREUX : Clé API visible dans le code source
const SUPABASE_URL = 'https://votre-projet.supabase.co'


// Visible par tous !
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// N'importe qui peut extraire cette clé et l'utiliser
// depuis n'importe quel environnement
</code>

Un attaquant peut facilement extraire cette clé depuis les DevTools du navigateur, depuis le code source minifié (même obfusqué), ou depuis les outils de développement. Une fois en possession de cette clé, il peut effectuer des requêtes vers votre API Supabase depuis n'importe quel environnement, contournant potentiellement les restrictions CORS si elles ne sont pas correctement configurées.

### Les attaques possibles sans RLS

Sans Row Level Security (RLS) activé, un attaquant peut potentiellement :

**1. Lire toutes les données de toutes les tables**

<code>
// Attaque depuis un script externe
const { data } = await supabase
  .from('users')
  .select('*') // Récupère TOUS les utilisateurs


const { data: orders } = await supabase
  .from('orders')
  .select('*') // Récupère TOUTES les commandes


const { data: payments } = await supabase
  .from('payments')
  .select('*') // Récupère TOUS les paiements
</code>

**2. Modifier ou supprimer des données**

<code>
// Mise à jour malveillante
await supabase
  .from('users')
  .update({ role: 'admin' })
  .eq('id', 'user-id-attacker')


// Suppression de données
await supabase
  .from('orders')
  .delete()
  .gte('created_at', '2024-01-01')
</code>

**3. Effectuer des injections SQL via PostgREST**

Bien que PostgREST offre une certaine protection contre les injections SQL classiques, des attaques sophistiquées peuvent exploiter les fonctionnalités de filtrage :

<code>
// Tentative d'injection via les opérateurs PostgREST
const maliciousInput = "admin' OR '1'='1"


const { data } = await supabase
  .from('users')
  .select('*')
  .or(\`email.eq.\${maliciousInput},role.eq.admin\`)
</code>

**4. Consommer des ressources et générer des coûts**

Un attaquant peut lancer des requêtes massives pour saturer votre base de données et générer des coûts importants :

<code>
// Attaque par déni de service
for (let i = 0; i < 10000; i++) {
  await supabase
    .from('users')
    .select('*')
    .limit(1000)
}
</code>

## Row Level Security (RLS) : la protection essentielle

Le <strong>Row Level Security (RLS)</strong> est une fonctionnalité native de PostgreSQL qui permet de définir des politiques de sécurité au niveau des lignes de données. Avec RLS activé, même si un utilisateur a accès à une table, il ne peut voir ou modifier que les lignes autorisées par les politiques définies.

### Activer RLS sur une table

La première étape consiste à activer RLS sur chaque table sensible :

<code>
-- Activer RLS sur la table users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;


-- Activer RLS sur la table orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;


-- Activer RLS sur la table payments
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
</code>

<strong>Important :</strong> Une fois RLS activé, par défaut, toutes les opérations (SELECT, INSERT, UPDATE, DELETE) sont bloquées. Vous devez créer des politiques explicites pour autoriser les accès nécessaires.

### Créer des politiques RLS basiques

Les politiques RLS utilisent des expressions SQL qui retournent un booléen. Voici des exemples de politiques courantes :

<code>
-- Politique : les utilisateurs ne peuvent voir que leur propre profil
CREATE POLICY "Users can view own profile"
ON users
FOR SELECT
USING (auth.uid() = id);


-- Politique : les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
ON users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);


-- Politique : les utilisateurs peuvent voir leurs propres commandes
CREATE POLICY "Users can view own orders"
ON orders
FOR SELECT
USING (auth.uid() = user_id);


-- Politique : les utilisateurs peuvent créer leurs propres commandes
CREATE POLICY "Users can create own orders"
ON orders
FOR INSERT
WITH CHECK (auth.uid() = user_id);
</code>

La fonction \`auth.uid()\` retourne l'ID de l'utilisateur actuellement authentifié via Supabase Auth. Cette fonction est cruciale pour lier les données à l'utilisateur.

### Politiques RLS avancées

Pour des cas d'usage plus complexes, vous pouvez créer des politiques sophistiquées :

<code>
-- Politique : les administrateurs peuvent tout voir
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


-- Politique : les utilisateurs peuvent voir les commandes de leur équipe
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


-- Politique : les utilisateurs peuvent voir les produits publics ou leurs propres produits
CREATE POLICY "Users can view public or own products"
ON products
FOR SELECT
USING (
  is_public = true
  OR owner_id = auth.uid()
);
</code>

### Les pièges courants du RLS

Même avec RLS activé, des erreurs de configuration peuvent créer des failles :

**1. Oublier d'activer RLS sur certaines tables**

<code>
-- ❌ DANGEREUX : Table sans RLS
CREATE TABLE api_keys (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  key_value TEXT NOT NULL
);
-- RLS non activé = données accessibles à tous !
</code>

**2. Politiques trop permissives**

<code>
-- ❌ DANGEREUX : Politique trop large
CREATE POLICY "Everyone can view users"
ON users
FOR SELECT
USING (true); -- Autorise TOUS les utilisateurs à voir TOUS les profils
</code>

**3. Oublier les politiques UPDATE/DELETE**

<code>
-- ⚠️ INCOMPLET : Seulement SELECT protégé
CREATE POLICY "Users can view own data"
ON sensitive_data
FOR SELECT
USING (auth.uid() = user_id);
-- Mais UPDATE et DELETE ne sont pas protégés !
</code>

**4. Utiliser des fonctions non sécurisées dans les politiques**

<code>
-- ❌ DANGEREUX : Fonction qui peut être contournée
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Cette fonction peut être appelée directement et contournée
  RETURN EXISTS (
    SELECT 1 FROM users WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE POLICY "Admins can do anything"
ON sensitive_table
FOR ALL
USING (is_admin(auth.uid())); -- Risque si la fonction est mal sécurisée
</code>

### Tester vos politiques RLS

Il est crucial de tester vos politiques RLS pour s'assurer qu'elles fonctionnent correctement :

<code>
// Test : un utilisateur ne peut pas voir les données d'un autre
const { data: otherUser } = await supabase
  .from('users')
  .select('*')
  .eq('id', 'autre-user-id')
  .single()


// Devrait retourner null ou une erreur si RLS est correctement configuré
if (otherUser) {
  console.error('❌ FAILLE : RLS ne fonctionne pas correctement')
}


// Test : un utilisateur peut voir ses propres données
const { data: ownData } = await supabase
  .from('users')
  .select('*')
  .eq('id', currentUser.id)
  .single()


if (!ownData) {
  console.error('❌ PROBLÈME : RLS bloque même les données propres')
}
</code>

## Edge Functions : la solution pour les opérations sensibles

Même avec un RLS parfaitement configuré, certaines opérations ne devraient jamais être effectuées directement depuis le client. Les <strong>Edge Functions</strong> de Supabase permettent d'exécuter du code serverless à la périphérie du réseau, offrant un environnement sécurisé pour les opérations critiques.

### Pourquoi utiliser des Edge Functions ?

**1. Logique métier complexe**

Les Edge Functions permettent d'implémenter une logique métier complexe qui ne devrait pas être exposée côté client :

<code>
// ❌ DANGEREUX : Logique de calcul côté client
const calculatePrice = (basePrice: number, discount: number) => {
  // Un attaquant peut modifier cette logique dans le navigateur
  return basePrice * (1 - discount)
}


// ✅ SÉCURISÉ : Logique dans une Edge Function
// supabase/functions/calculate-price/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


serve(async (req) => {
  const { basePrice, discount } = await req.json()
  

  // Logique sécurisée côté serveur
  const finalPrice = basePrice * (1 - discount)
  

  // Validation et vérifications supplémentaires
  if (discount > 0.5) {
    return new Response(
      JSON.stringify({ error: 'Discount too high' }),
      { status: 400 }
    )
  }
  

  return new Response(JSON.stringify({ price: finalPrice }))
})
</code>

**2. Accès à des clés API secrètes**

Les Edge Functions ont accès aux variables d'environnement et aux clés secrètes qui ne doivent jamais être exposées côté client :

<code>
// supabase/functions/send-email/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


serve(async (req) => {
  // Récupération de la clé secrète (jamais exposée au client)
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  

  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  

  const { to, subject, body } = await req.json()
  

  // Utilisation d'un service d'email externe avec clé API secrète
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

**3. Opérations batch et transactions**

Les Edge Functions permettent d'effectuer des opérations batch complexes dans une transaction :

<code>
// supabase/functions/process-order/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


serve(async (req) => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  

  const { orderId } = await req.json()
  

  // Récupération de la commande avec vérification
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
  

  // Vérification du stock pour tous les articles
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
  

  // Transaction : mise à jour du stock et création du paiement
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

**4. Validation et sanitization avancées**

Les Edge Functions permettent d'implémenter des validations complexes qui ne peuvent pas être contournées :

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
    

    // Vérification de l'unicité de l'email
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
    

    // Création de l'utilisateur avec hash du mot de passe
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

### Appeler une Edge Function depuis le client

Depuis le code client, vous appelez une Edge Function de manière sécurisée :

<code>
// Appel depuis le client
const { data, error } = await supabase.functions.invoke('calculate-price', {
  body: { basePrice: 100, discount: 0.1 }
})


if (error) {
  console.error('Error:', error)
} else {
  console.log('Price:', data.price)
}
</code>

L'Edge Function reçoit automatiquement le token JWT de l'utilisateur authentifié, permettant de vérifier son identité :

<code>
// Dans l'Edge Function
serve(async (req) => {
  // Récupération du token JWT depuis les headers
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    )
  }
  

  const token = authHeader.replace('Bearer ', '')
  

  // Vérification du token avec Supabase
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
  

  // Logique sécurisée avec utilisateur authentifié
  // ...
})
</code>

## Bonnes pratiques de sécurité avec Supabase

Pour sécuriser correctement votre application Supabase, suivez ces bonnes pratiques :

### 1. Activer RLS sur toutes les tables sensibles

<code>
-- Script pour activer RLS sur toutes les tables
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', r.tablename);
  END LOOP;
END $$;
</code>

### 2. Utiliser des politiques RLS restrictives par défaut

<code>
-- Politique par défaut : tout est bloqué
-- Puis ajouter des exceptions explicites
CREATE POLICY "Users can only see own data"
ON sensitive_data
FOR SELECT
USING (auth.uid() = user_id);
</code>

### 3. Ne jamais exposer la clé service_role côté client

<code>
// ❌ JAMAIS dans le code client
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'


// ✅ Uniquement dans les Edge Functions ou backend
// Via Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
</code>

### 4. Valider toutes les entrées utilisateur

<code>
// Utiliser des bibliothèques de validation comme Zod
import { z } from 'zod'


const userInputSchema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(120)
})


const validated = userInputSchema.parse(userInput)
</code>

### 5. Limiter les requêtes avec des limites

<code>
// Toujours limiter le nombre de résultats
const { data } = await supabase
  .from('posts')
  .select('*')
  .limit(100) // Limite explicite
</code>

### 6. Utiliser des index pour les performances RLS

<code>
-- Créer des index sur les colonnes utilisées dans les politiques RLS
CREATE INDEX idx_users_id ON users(id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_products_owner_id ON products(owner_id);
</code>

## Conclusion

Supabase offre une expérience de développement remarquable, mais cette simplicité ne doit pas se faire au détriment de la sécurité. <strong>Exposer des requêtes SQL directement depuis le client sans protection adéquate est une faille de sécurité critique</strong> qui peut mener à l'exposition de données sensibles, à des modifications non autorisées, et à des attaques par déni de service.

Le <strong>Row Level Security (RLS)</strong> est absolument essentiel pour protéger vos données. Il doit être activé sur toutes les tables sensibles, avec des politiques restrictives et bien testées. Cependant, RLS seul ne suffit pas pour toutes les opérations. Les <strong>Edge Functions</strong> offrent un environnement sécurisé pour la logique métier complexe, l'accès aux clés API secrètes, et les opérations transactionnelles.

La règle d'or : <strong>si une opération implique de la logique métier complexe, des clés secrètes, ou des validations critiques, elle doit être effectuée dans une Edge Function ou un backend dédié, jamais directement depuis le client.</strong> La sécurité n'est pas optionnelle, et les quelques minutes supplémentaires passées à configurer correctement RLS et à créer des Edge Functions peuvent éviter des catastrophes coûteuses et irréversibles.
  `,
  author: "Jonathan Serra",
  publishedAt: "2025-12-14",
  readTime: "15 min",
  tags: ["Supabase", "Sécurité", "RLS", "PostgreSQL", "Edge Functions", "SQL Injection", "Client-Side", "PostgREST"]
};

