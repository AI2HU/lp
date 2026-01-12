import { BlogPost } from '../blog-posts';
import { vibeCodingRevolutionMirageIngenieurLogiciel } from './fr/vibe-coding-revolution-mirage-ingenieur-logiciel';
import { reprendreMainCodeLovablePrototypeControleTotal } from './fr/reprendre-main-code-lovable-prototype-controle-total';
import { vibeCodingCoutSecuriteRisquesCaches } from './fr/vibe-coding-cout-securite-risques-caches';
import { sortirBoucleInfernaleIaEgareCodeReprendreControle } from './fr/sortir-boucle-infernale-ia-egare-code-reprendre-controle';
import { supabaseCoutReelTechniquePricing } from './fr/supabase-cout-reel-technique-pricing';
import { plusGrossesFaillesVibeCoding } from './fr/plus-grosses-failles-vibe-coding';
import { vibeCodingKitSurvieLivrerProd } from './fr/vibe-coding-kit-survie-livrer-prod';
import { supabaseFaillesSecuriteSqlClientSideRls } from './fr/supabase-failles-securite-sql-client-side-rls';
import { vibeWallPourquoiPrototypeExplose1000Utilisateurs } from './fr/vibe-wall-pourquoi-prototype-explose-1000-utilisateurs';
import { vibeWallWhyPrototypeExplodes1000Users } from './en/vibe-wall-why-prototype-explodes-1000-users';
import { biggestVulnerabilitiesVibeCoding } from './en/biggest-vulnerabilities-vibe-coding';
import { regainControlLovableCodePrototypeTotalControl } from './en/regain-control-lovable-code-prototype-total-control';
import { breakOutInfernalLoopAiGoesAstrayRegainControl } from './en/break-out-infernal-loop-ai-goes-astray-regain-control';
import { supabaseRealCostTechnicalPricing } from './en/supabase-real-cost-technical-pricing';
import { supabaseSecurityVulnerabilitiesSqlClientSideRls } from './en/supabase-security-vulnerabilities-sql-client-side-rls';
import { vibeCodingHiddenCostsSecurityRisks } from './en/vibe-coding-hidden-costs-security-risks';
import { vibeCodingSurvivalKitDeliverProd } from './en/vibe-coding-survival-kit-deliver-prod';
import { vibeCodingRevolutionMirageSoftwareEngineer } from './en/vibe-coding-revolution-mirage-software-engineer';

export const blogPosts: BlogPost[] = [
  vibeWallPourquoiPrototypeExplose1000Utilisateurs,
  vibeWallWhyPrototypeExplodes1000Users,
  supabaseFaillesSecuriteSqlClientSideRls,
  supabaseSecurityVulnerabilitiesSqlClientSideRls,
  vibeCodingKitSurvieLivrerProd,
  vibeCodingSurvivalKitDeliverProd,
  plusGrossesFaillesVibeCoding,
  biggestVulnerabilitiesVibeCoding,
  vibeCodingRevolutionMirageIngenieurLogiciel,
  vibeCodingRevolutionMirageSoftwareEngineer,
  reprendreMainCodeLovablePrototypeControleTotal,
  regainControlLovableCodePrototypeTotalControl,
  vibeCodingCoutSecuriteRisquesCaches,
  vibeCodingHiddenCostsSecurityRisks,
  sortirBoucleInfernaleIaEgareCodeReprendreControle,
  breakOutInfernalLoopAiGoesAstrayRegainControl,
  supabaseCoutReelTechniquePricing,
  supabaseRealCostTechnicalPricing
];

export function getBlogPost(slug: string, lang: string = 'fr'): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.lang === lang);
}

export function getAllBlogPosts(lang?: string): BlogPost[] {
  if (lang) {
    return blogPosts.filter(post => post.lang === lang);
  }
  return blogPosts;
}
