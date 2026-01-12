import { BlogPost } from '../../blog-posts';

export const supabaseRealCostTechnicalPricing: BlogPost = {
  slug: "supabase-real-cost-technical-pricing",
  lang: "en",
  title: "Supabase: the real cost behind apparent simplicity",
  excerpt: "Supabase promises a hosted PostgreSQL database with an automatic REST API. But what's really under the hood? In-depth technical analysis and realistic cost estimate for a production application.",
  content: `
<strong>Supabase</strong> has established itself as one of the most popular solutions for developers looking to quickly launch an application with a database. The promise is appealing: <strong>a hosted PostgreSQL, an automatic REST API, integrated authentication, all with a free plan to get started.</strong> But behind this apparent simplicity lies a complex architecture and costs that can quickly explode in production. If you use Supabase via Lovable, discover <a href="/en/blog/regain-control-lovable-code-prototype-total-control" class="text-accent hover:text-accent/80 underline font-semibold">how to regain control of your generated code</a>.

This article dives into the <strong>technical details of Supabase</strong>, explores what really happens under the hood, and provides a <strong>realistic cost estimate</strong> for a production application based on Supabase's official pricing grid.

## What is Supabase? Beyond marketing

Supabase presents itself as an <strong>"open-source alternative to Firebase"</strong>, but this description is reductive. In reality, Supabase is an Infrastructure as a Service (IaaS) platform that provides several services around a PostgreSQL database.

### Technical architecture under the hood

**PostgreSQL as foundation**: Unlike Firebase which uses NoSQL (Firestore), Supabase relies on PostgreSQL, an open-source and robust relational database management system. Each Supabase project gets its own dedicated PostgreSQL instance, isolated from other projects.

**Automatic REST API: PostgREST**: One of Supabase's most remarkable features is the automatic generation of a REST API from your database schema. This magic is made possible by <strong>PostgREST</strong>, a lightweight web server written in Haskell that translates HTTP requests into SQL queries. PostgREST reads the PostgreSQL schema directly and automatically exposes tables, views, and stored functions via REST endpoints.

**Authentication: GoTrue**: Supabase's authentication system is based on <strong>GoTrue</strong>, a microservice written in Go that handles registration, login, password reset, and integration with OAuth providers (Google, GitHub, etc.). GoTrue stores authentication information in dedicated PostgreSQL tables and generates JWT (JSON Web Tokens) for user sessions.

**File storage: Storage**: Supabase offers an object storage service similar to AWS S3, built on <strong>Storage</strong>, which uses PostgreSQL for metadata and a distributed file system for binary data.

**Real-time: Realtime**: For real-time features, Supabase uses <strong>Realtime</strong>, which relies on PostgreSQL's logical replication features. Database changes are captured via PostgreSQL's Write-Ahead Logs (WAL) and broadcast to connected clients via WebSockets.

**Edge Functions**: Supabase also offers serverless functions (Edge Functions) that run at the network edge, built on <strong>Deno Deploy</strong>.

### Isolation and security

Each Supabase project is isolated in its own PostgreSQL instance. Connections use SSL/TLS by default, and Supabase implements PostgreSQL's Row Level Security (RLS) to enable granular access control at the data row level. This feature is crucial for security: it allows defining policies that limit data access based on the authenticated user, directly at the database level.

## The seductive trap of Supabase's free tier

Supabase's free plan seems generous: <strong>500 MB of database storage, 1 GB of file storage, 2 million real-time messages, 500,000 Edge function invocations, and 5 GB of outbound bandwidth.</strong> But this generosity has hidden limits.

**Automatic pause after inactivity**: Free projects are automatically paused after 1 week of inactivity. To reactivate them, you need to wait a few minutes, which can be problematic for a production application.

**Limit of 2 active projects**: The free plan limits you to 2 active projects simultaneously. If you need a development environment and a production environment, you quickly reach this limit.

**No dedicated resources**: On the free plan, your PostgreSQL instance shares CPU and RAM resources with other projects. Performance can be unpredictable, especially during traffic spikes.

**No automatic backups**: The free plan doesn't include automatic backups. If you lose data, it's lost permanently.

### Data recovery and portability

A crucial question for any company using Supabase is: <strong>can you recover your data quickly and easily?</strong> The answer is nuanced.

Supabase allows exporting your data via several methods. The most direct is using PostgreSQL's <strong>pg_dump</strong> tool, accessible via Supabase's interface or directly via a standard PostgreSQL connection. This method allows creating a complete dump of your database, including the schema and all data. However, for large databases (several hundred GB), this operation can take several hours and consume a significant portion of your outbound bandwidth, which can generate additional costs.

Files stored in Supabase Storage can be downloaded individually via the API or in bulk via the interface, but there's no automated mechanism to export your entire storage in a single operation. To migrate hundreds of GB of files, you'll need to either develop a custom script or use third-party tools.

<strong>The critical point is recovery time.</strong> If you need to quickly migrate to another infrastructure (for example, in case of service issues or strategic change), complete data recovery can take several days for a medium-sized application, especially if you must respect bandwidth limits to avoid excessive costs.

In comparison, with a self-hosted infrastructure, you have direct access to database files and backups, enabling near-instant recovery. This difference can be crucial in case of emergency or need for rapid migration.

## Going to production? Cost explosion

As soon as your application starts having real traffic, Supabase costs can explode exponentially. Let's analyze the main cost components.

### The Pro plan: $25 per month, but that's just the beginning

The Pro plan costs <strong>$25 per month</strong> and includes:
- 8 GB of database storage (then $0.125 per additional GB)
- 100 GB of file storage (then $0.021 per GB)
- 250 GB of outbound bandwidth (then $0.09 per GB)
- 100,000 active monthly users (then $0.00325 per user)
- 2 million Edge function invocations (then $2 per million)
- 5 million real-time messages (then $2.50 per million)

But these limits are quickly reached for an application with modest traffic.

### Cost estimate for an average application

Let's take the example of a SaaS application with:
- **10,000 active monthly users**
- **50 GB of database data**
- **200 GB of stored files**
- **500 GB of outbound bandwidth per month**
- **10 million real-time messages**
- **5 million Edge function invocations**

**Base cost (Pro plan)**: $25 / month

**Overage**:
- Database: (50 - 8) × $0.125 = **$5.25 / month**
- File storage: (200 - 100) × $0.021 = **$2.10 / month**
- Bandwidth: (500 - 250) × $0.09 = **$22.50 / month**
- Real-time messages: (10 - 5) × $2.50 = **$12.50 / month**
- Edge functions: (5 - 2) × $2 = **$6 / month**

**Monthly total**: $25 + $5.25 + $2.10 + $22.50 + $12.50 + $6 = **$73.35 / month**

And we haven't included compute costs (CPU/RAM) yet!

### Compute costs: the hidden variable

Supabase bills computing resources (CPU and RAM) separately. The Pro plan includes $10 of compute credits per month, which covers a "Micro" instance (1 GB RAM, 2 ARM cores).

For an application with modest traffic, you'll probably need at least a "Small" instance (2 GB RAM, 2 ARM cores) at **$15 / month**, or an additional **$5 / month** after deducting credits.

For an application with medium traffic, a "Medium" instance (4 GB RAM, 2 ARM cores) at **$60 / month** is more appropriate, or an additional **$50 / month**.

**Revised total cost with Small compute**: $73.35 + $5 = **$78.35 / month**

**Revised total cost with Medium compute**: $73.35 + $50 = **$123.35 / month**

### The case of a successful application

For an application with significant traffic:
- **100,000 active monthly users**
- **500 GB of database data**
- **1 TB of stored files**
- **5 TB of outbound bandwidth per month**
- **50 million real-time messages**
- **20 million Edge function invocations**
- "Large" compute instance (8 GB RAM) at $110 / month

**Base cost**: $25 / month

**Overage**:
- Database: (500 - 8) × $0.125 = **$61.50 / month**
- File storage: (1000 - 100) × $0.021 = **$18.90 / month**
- Bandwidth: (5000 - 250) × $0.09 = **$427.50 / month**
- Real-time messages: (50 - 5) × $2.50 = **$112.50 / month**
- Edge functions: (20 - 2) × $2 = **$36 / month**
- Compute: ($110 - $10) = **$100 / month**

**Monthly total**: $25 + $61.50 + $18.90 + $427.50 + $112.50 + $36 + $100 = **$781.40 / month**

That's nearly **$9,400 per year** for a modestly successful application!

## Solutions to regain control

Faced with these costs, many teams choose to migrate to self-hosted solutions or more economical cloud alternatives.

**PostgreSQL hosting on a VPS**: A VPS with 8 GB RAM and 4 CPU cores costs around $40-$60 / month from providers like DigitalOcean, Hetzner, or Scaleway. You can install PostgreSQL, configure PostgREST for the REST API, and use open-source solutions for authentication and storage.

**Native cloud services**: AWS RDS, Google Cloud SQL, or Azure Database for PostgreSQL offer managed PostgreSQL instances starting at $15-$30 / month for basic configurations, with bandwidth costs generally lower than Supabase's.

**Hybrid architecture**: Some teams choose to keep Supabase for development and rapid prototyping, then migrate to a self-hosted infrastructure for production, thus reducing costs by 70 to 90%.

## Conclusion

Supabase is an excellent tool for quickly prototyping and launching an MVP. Its automatic REST API, integrated authentication system, and real-time management allow saving precious development time.

However, <strong>costs can quickly become prohibitive as soon as the application grows.</strong> Outbound bandwidth, in particular, can represent a significant portion of the bill, especially for applications that serve a lot of static content or files.

<strong>For a production application with modest to medium traffic, it's often more economical to migrate to a self-hosted infrastructure or native cloud services.</strong> This migration certainly requires more technical expertise, but it offers total control, predictable costs, and better understanding of the underlying architecture.

The choice between Supabase and a self-hosted solution ultimately depends on your context: if development speed and operational simplicity are priorities, Supabase remains an excellent choice. If costs and long-term control are priorities, migration to a dedicated infrastructure quickly becomes profitable.
  `,
  author: "Jonathan Serra",
  publishedAt: "2025-11-10",
  readTime: "12 min",
  tags: ["Supabase", "PostgreSQL", "Costs", "Infrastructure", "Pricing", "PostgREST", "Production", "Architecture"]
};