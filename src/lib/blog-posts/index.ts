import { BlogPost } from '../blog-posts';
import { vibeCodingRevolutionMirageIngenieurLogiciel } from './vibe-coding-revolution-mirage-ingenieur-logiciel';
import { reprendreMainCodeLovablePrototypeControleTotal } from './reprendre-main-code-lovable-prototype-controle-total';
import { vibeCodingCoutSecuriteRisquesCaches } from './vibe-coding-cout-securite-risques-caches';
import { sortirBoucleInfernaleIaEgareCodeReprendreControle } from './sortir-boucle-infernale-ia-egare-code-reprendre-controle';

export const blogPosts: BlogPost[] = [
  vibeCodingRevolutionMirageIngenieurLogiciel,
  reprendreMainCodeLovablePrototypeControleTotal,
  vibeCodingCoutSecuriteRisquesCaches,
  sortirBoucleInfernaleIaEgareCodeReprendreControle
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}
