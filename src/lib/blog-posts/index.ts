import { BlogPost } from '../blog-posts';
import { vibeCodingRevolutionMirageIngenieurLogiciel } from './vibe-coding-revolution-mirage-ingenieur-logiciel';
import { reprendreMainCodeLovablePrototypeControleTotal } from './reprendre-main-code-lovable-prototype-controle-total';
import { vibeCodingCoutSecuriteRisquesCaches } from './vibe-coding-cout-securite-risques-caches';
import { sortirBoucleInfernaleIaEgareCodeReprendreControle } from './sortir-boucle-infernale-ia-egare-code-reprendre-controle';
import { supabaseCoutReelTechniquePricing } from './supabase-cout-reel-technique-pricing';
import { plusGrossesFaillesVibeCoding } from './plus-grosses-failles-vibe-coding';

export const blogPosts: BlogPost[] = [
  plusGrossesFaillesVibeCoding,
  vibeCodingRevolutionMirageIngenieurLogiciel,
  reprendreMainCodeLovablePrototypeControleTotal,
  vibeCodingCoutSecuriteRisquesCaches,
  sortirBoucleInfernaleIaEgareCodeReprendreControle,
  supabaseCoutReelTechniquePricing
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}
