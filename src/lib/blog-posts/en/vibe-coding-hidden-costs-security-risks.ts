import { BlogPost } from '../../blog-posts';

export const vibeCodingHiddenCostsSecurityRisks: BlogPost = {
  slug: "vibe-coding-hidden-costs-security-risks",
  lang: "en",
  title: "Vibe coding: hidden costs and security risks of AI-assisted programming",
  excerpt: "Vibe coding promises multiplied productivity, but hides explosive costs related to tokens and critical security vulnerabilities. Analysis of the real risks of AI-assisted programming.",
  content: `
<strong>"Vibe coding"</strong>, or "intuitive" programming assisted by artificial intelligence, has quickly become a common practice among many developers, seduced by the <strong>promise of multiplied productivity</strong>. Tools like GitHub Copilot, Tabnine, or advanced conversational models allow generating code blocks, entire functions, or even complete applications from a simple natural language description. <strong>However, behind this apparent ease lie deep and costly issues</strong>, particularly related to the technical limits of AI models and critical security risks. For a broader analysis of this approach, check out our article on <a href="/en/blog/vibe-coding-revolution-mirage-ingenieur-logiciel" class="text-accent hover:text-accent/80 underline font-semibold">vibe coding as a revolution or mirage</a>.

## The context window: short memory that costs dearly

One of the major constraints of large language models (LLMs) lies in their context window. This is the amount of information, measured in tokens (word fragments), that the model can take into account simultaneously to generate a response. For an AI to modify or add a feature to an existing project, the developer must ideally provide all relevant code. This is where the problem lies.

With each new request, for example to fix a bug or add a simple feature, the developer is often forced to reinject a large portion, or even the entirety, of the application code into the prompt. This process is not only tedious, but it generates massive redundancy. The AI processes the same code over and over again, which has a direct and significant impact on API usage costs.

The billing model of most of these services is based on the number of input tokens (the prompt) and output tokens (the generated code). By constantly submitting redundant code, token consumption explodes. A simple update can thus cost disproportionately compared to the task's complexity. This cost inflation, often invisible at first glance, becomes a non-negligible financial burden for projects that heavily depend on AI code generation, transforming a productivity tool into a financial abyss.

## Insidious and omnipresent security vulnerabilities

Beyond the economic aspect, the security of AI-generated code is a major and growing concern. AI models are trained on vast corpora of public code, particularly from GitHub repositories. However, this code is far from always exemplary. It often contains obsolete practices, logic errors, and, above all, gaping security vulnerabilities. AI, lacking qualitative judgment, learns and reproduces these bad patterns indiscriminately.

The consequences are multiple and can be critical for application security:

**Unsecured endpoints**: It's common for AI to generate APIs or network access points without implementing necessary authentication and authorization controls. It can omit rights checks, thus exposing sensitive data to unauthorized access.

**Poor encryption practices**: AI may suggest using weak or deprecated encryption algorithms (like MD5 for password storage). Worse still, it can "hardcode" secret keys or passwords directly in code, a practice universally recognized as extremely dangerous.

**Use of old or malicious libraries**: In its quest for solutions, AI may propose integrating software dependencies that haven't been updated in years and contain known vulnerabilities (CVEs). Even more pernicious is the "library hallucination" risk: AI can invent the name of a package that doesn't exist. Malicious actors can then create and publish a malicious library under that name, knowing that unsuspecting developers will install it, creating a direct attack on the software supply chain.

"Vibe coding" encourages an approach where the developer trusts the "magic" of AI without necessarily understanding the produced code in depth. This absence of critical review and human validation transforms AI-assisted code generation into a true security roulette. A recent Veracode study revealed that a very significant portion of AI-generated code contains security vulnerabilities. For a detailed analysis of the most common vulnerabilities, read our article on <a href="/en/blog/biggest-vulnerabilities-vibe-coding" class="text-accent hover:text-accent/80 underline font-semibold">the biggest vulnerabilities in vibe coding</a>.

## Conclusion

While AI code generation tools offer undeniable speed gains, their "blind" use is perilous. Inefficient management of the context window leads to a spiral of costs related to redundancy, while the very nature of their training predisposes them to generate code riddled with vulnerabilities. "Vibe coding" must therefore not substitute for the rigor, expertise, and vigilance of the developer, who remains the ultimate guarantor of the quality, maintainability, and security of the final software. If you're facing costly AI coding loops, discover <a href="/en/blog/break-out-infernal-loop-ai-goes-astray-regain-control" class="text-accent hover:text-accent/80 underline font-semibold">how to regain control of your code</a>.
  `,
  author: "Jonathan Serra",
  publishedAt: "2025-09-18",
  readTime: "7 min",
  tags: ["Vibe Coding", "Security", "Costs", "AI", "Tokens", "Vulnerabilities", "Development"]
};