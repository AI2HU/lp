import { BlogPost } from '../blog-posts';

export const supabaseCoutReelTechniquePricing: BlogPost = {
  slug: "supabase-cout-reel-technique-pricing",
  title: "Supabase : le coût réel derrière la simplicité apparente",
  excerpt: "Supabase promet une base de données PostgreSQL hébergée avec une API REST automatique. Mais que se cache-t-il vraiment sous le capot ? Analyse technique approfondie et estimation réaliste des coûts pour une application en production.",
  content: `
<strong>Supabase</strong> s'est imposé comme l'une des solutions les plus populaires pour les développeurs cherchant à lancer rapidement une application avec une base de données. La promesse est séduisante : <strong>un PostgreSQL hébergé, une API REST automatique, une authentification intégrée, le tout avec un plan gratuit pour démarrer.</strong> Mais derrière cette simplicité apparente se cache une architecture complexe et des coûts qui peuvent rapidement exploser en production. Si vous utilisez Supabase via Lovable, découvrez <a href="/blog/reprendre-main-code-lovable-prototype-controle-total" class="text-accent hover:text-accent/80 underline font-semibold">comment reprendre la main sur votre code généré</a>.

Cet article plonge dans les <strong>détails techniques de Supabase</strong>, explore ce qui se passe réellement sous le capot, et fournit une <strong>estimation réaliste des coûts</strong> pour une application en production basée sur la grille tarifaire officielle de Supabase.

## Qu'est-ce que Supabase ? Au-delà du marketing

Supabase se présente comme une <strong>"alternative open-source à Firebase"</strong>, mais cette description est réductrice. En réalité, Supabase est une plateforme d'infrastructure as a service (IaaS) qui fournit plusieurs services autour d'une base de données PostgreSQL.

### L'architecture technique sous le capot

**PostgreSQL comme fondation** : Contrairement à Firebase qui utilise NoSQL (Firestore), Supabase s'appuie sur PostgreSQL, un système de gestion de base de données relationnelle open-source et robuste. Chaque projet Supabase obtient sa propre instance PostgreSQL dédiée, isolée des autres projets.

**L'API REST automatique : PostgREST** : L'une des fonctionnalités les plus remarquables de Supabase est la génération automatique d'une API REST à partir du schéma de votre base de données. Cette magie est rendue possible par <strong>PostgREST</strong>, un serveur web léger écrit en Haskell qui traduit les requêtes HTTP en requêtes SQL. PostgREST lit directement le schéma PostgreSQL et expose automatiquement les tables, les vues et les fonctions stockées via des endpoints REST.

**L'authentification : GoTrue** : Le système d'authentification de Supabase est basé sur <strong>GoTrue</strong>, un microservice écrit en Go qui gère l'inscription, la connexion, la réinitialisation de mot de passe, et l'intégration avec des fournisseurs OAuth (Google, GitHub, etc.). GoTrue stocke les informations d'authentification dans des tables PostgreSQL dédiées et génère des tokens JWT (JSON Web Tokens) pour les sessions utilisateur.

**Le stockage de fichiers : Storage** : Supabase propose un service de stockage d'objets similaire à AWS S3, construit sur <strong>Storage</strong>, qui utilise PostgreSQL pour les métadonnées et un système de fichiers distribué pour les données binaires.

**Le temps réel : Realtime** : Pour les fonctionnalités en temps réel, Supabase utilise <strong>Realtime</strong>, qui s'appuie sur les fonctionnalités de réplication logique de PostgreSQL. Les changements dans la base de données sont capturés via les Write-Ahead Logs (WAL) de PostgreSQL et diffusés aux clients connectés via WebSockets.

**Les Edge Functions** : Supabase propose également des fonctions serverless (Edge Functions) qui s'exécutent à la périphérie du réseau, construites sur <strong>Deno Deploy</strong>.

### L'isolation et la sécurité

Chaque projet Supabase est isolé dans sa propre instance PostgreSQL. Les connexions utilisent SSL/TLS par défaut, et Supabase implémente Row Level Security (RLS) de PostgreSQL pour permettre un contrôle d'accès granulaire au niveau des lignes de données. Cette fonctionnalité est cruciale pour la sécurité : elle permet de définir des politiques qui limitent l'accès aux données en fonction de l'utilisateur authentifié, directement au niveau de la base de données.

## Le piège séduisant de la gratuité de Supabase

Le plan gratuit de Supabase semble généreux : <strong>500 MB de base de données, 1 GB de stockage de fichiers, 2 millions de messages en temps réel, 500 000 invocations de fonctions Edge, et 5 GB de bande passante sortante.</strong> Mais cette générosité a des limites cachées.

**Pause automatique après inactivité** : Les projets gratuits sont automatiquement mis en pause après 1 semaine d'inactivité. Pour les réactiver, il faut attendre quelques minutes, ce qui peut être problématique pour une application en production.

**Limite de 2 projets actifs** : Le plan gratuit limite à 2 projets actifs simultanément. Si vous avez besoin d'un environnement de développement et d'un environnement de production, vous atteignez rapidement cette limite.

**Pas de ressources dédiées** : Sur le plan gratuit, votre instance PostgreSQL partage les ressources CPU et RAM avec d'autres projets. Les performances peuvent être imprévisibles, surtout pendant les pics de charge.

**Pas de sauvegardes automatiques** : Le plan gratuit n'inclut pas de sauvegardes automatiques. Si vous perdez des données, elles sont perdues définitivement.

### Récupération et portabilité des données

Une question cruciale pour toute entreprise utilisant Supabase est : <strong>peut-on récupérer ses données rapidement et facilement ?</strong> La réponse est nuancée.

Supabase permet d'exporter vos données via plusieurs méthodes. La plus directe est l'utilisation de l'outil <strong>pg_dump</strong> de PostgreSQL, accessible via l'interface de Supabase ou directement via une connexion PostgreSQL standard. Cette méthode permet de créer un dump complet de votre base de données, incluant le schéma et toutes les données. Cependant, pour les bases de données volumineuses (plusieurs centaines de GB), cette opération peut prendre plusieurs heures et consommer une part importante de votre bande passante sortante, ce qui peut générer des coûts supplémentaires.

Les fichiers stockés dans Supabase Storage peuvent être téléchargés individuellement via l'API ou en masse via l'interface, mais il n'existe pas de mécanisme automatisé pour exporter l'ensemble de votre stockage en une seule opération. Pour migrer des centaines de GB de fichiers, vous devrez soit développer un script personnalisé, soit utiliser des outils tiers.

<strong>Le point critique est le temps de récupération.</strong> Si vous devez migrer rapidement vers une autre infrastructure (par exemple, en cas de problème de service ou de changement stratégique), la récupération complète de vos données peut prendre plusieurs jours pour une application de taille moyenne, surtout si vous devez respecter les limites de bande passante pour éviter des coûts excessifs.

En comparaison, avec une infrastructure auto-hébergée, vous avez un accès direct aux fichiers de base de données et aux sauvegardes, permettant une récupération quasi instantanée. Cette différence peut être cruciale en cas d'urgence ou de besoin de migration rapide.

## On passe en production ? L'explosion des coûts

Dès que votre application commence à avoir du trafic réel, les coûts de Supabase peuvent exploser de manière exponentielle. Analysons les composants de coût principaux.

### Le plan Pro : $25 par mois, mais ce n'est que le début

Le plan Pro coûte <strong>$25 par mois</strong> et inclut :
- 8 GB de stockage de base de données (puis $0,125 par GB supplémentaire)
- 100 GB de stockage de fichiers (puis $0,021 par GB)
- 250 GB de bande passante sortante (puis $0,09 par GB)
- 100 000 utilisateurs actifs mensuels (puis $0,00325 par utilisateur)
- 2 millions d'invocations de fonctions Edge (puis $2 par million)
- 5 millions de messages en temps réel (puis $2,50 par million)

Mais ces limites sont rapidement atteintes pour une application avec un trafic modeste.

### Estimation de coût pour une application moyenne

Prenons l'exemple d'une application SaaS avec :
- **10 000 utilisateurs actifs mensuels**
- **50 GB de données en base**
- **200 GB de fichiers stockés**
- **500 GB de bande passante sortante par mois**
- **10 millions de messages en temps réel**
- **5 millions d'invocations de fonctions Edge**

**Coût de base (Plan Pro)** : $25 / mois

**Dépassements** :
- Base de données : (50 - 8) × $0,125 = **$5,25 / mois**
- Stockage de fichiers : (200 - 100) × $0,021 = **$2,10 / mois**
- Bande passante : (500 - 250) × $0,09 = **$22,50 / mois**
- Messages temps réel : (10 - 5) × $2,50 = **$12,50 / mois**
- Fonctions Edge : (5 - 2) × $2 = **$6 / mois**

**Total mensuel** : $25 + $5,25 + $2,10 + $22,50 + $12,50 + $6 = **$73,35 / mois**

Et nous n'avons pas encore inclus les coûts de compute (CPU/RAM) !

### Les coûts de compute : la variable cachée

Supabase facture séparément les ressources de calcul (CPU et RAM). Le plan Pro inclut $10 de crédits compute par mois, ce qui couvre une instance "Micro" (1 GB RAM, 2 cœurs ARM).

Pour une application avec un trafic modeste, vous aurez probablement besoin d'au moins une instance "Small" (2 GB RAM, 2 cœurs ARM) à **$15 / mois**, soit un supplément de **$5 / mois** après déduction des crédits.

Pour une application avec un trafic moyen, une instance "Medium" (4 GB RAM, 2 cœurs ARM) à **$60 / mois** est plus appropriée, soit un supplément de **$50 / mois**.

**Coût total révisé avec compute Small** : $73,35 + $5 = **$78,35 / mois**

**Coût total révisé avec compute Medium** : $73,35 + $50 = **$123,35 / mois**

### Le cas d'une application à succès

Pour une application avec un trafic important :
- **100 000 utilisateurs actifs mensuels**
- **500 GB de données en base**
- **1 TB de fichiers stockés**
- **5 TB de bande passante sortante par mois**
- **50 millions de messages en temps réel**
- **20 millions d'invocations de fonctions Edge**
- Instance compute "Large" (8 GB RAM) à $110 / mois

**Coût de base** : $25 / mois

**Dépassements** :
- Base de données : (500 - 8) × $0,125 = **$61,50 / mois**
- Stockage de fichiers : (1000 - 100) × $0,021 = **$18,90 / mois**
- Bande passante : (5000 - 250) × $0,09 = **$427,50 / mois**
- Messages temps réel : (50 - 5) × $2,50 = **$112,50 / mois**
- Fonctions Edge : (20 - 2) × $2 = **$36 / mois**
- Compute : ($110 - $10) = **$100 / mois**

**Total mensuel** : $25 + $61,50 + $18,90 + $427,50 + $112,50 + $36 + $100 = **$781,40 / mois**

C'est près de **$9 400 par an** pour une application à succès modeste !

## Les solutions pour reprendre le contrôle

Face à ces coûts, de nombreuses équipes choisissent de migrer vers des solutions auto-hébergées ou des alternatives cloud plus économiques.

**Hébergement PostgreSQL sur un VPS** : Un VPS avec 8 GB de RAM et 4 cœurs CPU coûte environ $40-$60 / mois chez des fournisseurs comme DigitalOcean, Hetzner ou Scaleway. Vous pouvez y installer PostgreSQL, configurer PostgREST pour l'API REST, et utiliser des solutions open-source pour l'authentification et le stockage.

**Services cloud natifs** : AWS RDS, Google Cloud SQL ou Azure Database pour PostgreSQL offrent des instances PostgreSQL gérées à partir de $15-$30 / mois pour des configurations de base, avec des coûts de bande passante généralement inférieurs à ceux de Supabase.

**Architecture hybride** : Certaines équipes choisissent de garder Supabase pour le développement et le prototypage rapide, puis migrent vers une infrastructure auto-hébergée pour la production, réduisant ainsi les coûts de 70 à 90%.

## Conclusion

Supabase est un excellent outil pour prototyper rapidement et lancer un MVP. Son API REST automatique, son système d'authentification intégré et sa gestion du temps réel permettent de gagner un temps précieux en développement.

Cependant, <strong>les coûts peuvent rapidement devenir prohibitifs dès que l'application prend de l'ampleur.</strong> La bande passante sortante, en particulier, peut représenter une part importante de la facture, surtout pour les applications qui servent beaucoup de contenu statique ou de fichiers.

<strong>Pour une application en production avec un trafic modeste à moyen, il est souvent plus économique de migrer vers une infrastructure auto-hébergée ou des services cloud natifs.</strong> Cette migration nécessite certes plus d'expertise technique, mais elle offre un contrôle total, des coûts prévisibles, et une meilleure compréhension de l'architecture sous-jacente.

Le choix entre Supabase et une solution auto-hébergée dépend finalement de votre contexte : si la rapidité de développement et la simplicité d'opération priment, Supabase reste un excellent choix. Si les coûts et le contrôle à long terme sont prioritaires, la migration vers une infrastructure dédiée devient rapidement rentable.
  `,
  author: "Jonathan Serra",
  publishedAt: "2025-11-10",
  readTime: "12 min",
  tags: ["Supabase", "PostgreSQL", "Coûts", "Infrastructure", "Pricing", "PostgREST", "Production", "Architecture"]
};

