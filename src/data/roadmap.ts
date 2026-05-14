export type Resource = {
  id: string;
  title: string;
  url?: string;
  source: string;
  est: string;
  note?: string;
};

export type Phase = {
  index: number;
  id: string;
  region: string;
  blurb: string;
  resources: Resource[];
};

export const phases: Phase[] = [
  {
    index: 0,
    id: "home-port",
    region: "Home Port",
    blurb:
      "Re-read the AI Agent Engineering course end to end. Anchor the foundation before the rest of the journey.",
    resources: [
      {
        id: "p0-m01-05",
        title: "Re-read M01-M05: Foundations of agent engineering",
        source: "AI Agent Engineering course",
        est: "4-6h",
        note: "Tokens, context windows, tool calls, retries, deterministic core loop.",
      },
      {
        id: "p0-m06-10",
        title: "Re-read M06-M10: Tool use and structured outputs",
        source: "AI Agent Engineering course",
        est: "4-6h",
        note: "JSON schemas, function calling, MCP primer, parsing failures.",
      },
      {
        id: "p0-m11-15",
        title: "Re-read M11-M15: Agentic patterns and orchestration",
        source: "AI Agent Engineering course",
        est: "4-6h",
        note: "Planner-executor, reflection, routing, supervisor patterns.",
      },
      {
        id: "p0-m16-20",
        title: "Re-read M16-M20: Production concerns",
        source: "AI Agent Engineering course",
        est: "4-6h",
        note: "Latency, cost, retries, idempotency, observability.",
      },
      {
        id: "p0-m21-25",
        title: "Re-read M21-M25: Advanced topics and capstones",
        source: "AI Agent Engineering course",
        est: "4-6h",
        note: "Multi-agent, evals, deployment patterns, long-running workflows.",
      },
    ],
  },
  {
    index: 1,
    id: "the-library",
    region: "The Library",
    blurb:
      "Canon reading and the lay of the land. Read the canonical pieces, then learn the benchmarks the field measures itself against.",
    resources: [
      {
        id: "p1-bea",
        title: "Building Effective Agents",
        url: "https://www.anthropic.com/engineering/building-effective-agents",
        source: "Anthropic",
        est: "1h",
      },
      {
        id: "p1-12factor",
        title: "12-Factor Agents",
        url: "https://github.com/humanlayer/12-factor-agents",
        source: "HumanLayer",
        est: "2h",
      },
      {
        id: "p1-patterns",
        title: "Patterns of Agentic Systems",
        url: "https://learnagenticpatterns.com",
        source: "learnagenticpatterns.com",
        est: "3-4h",
      },
      {
        id: "p1-swebench",
        title: "SWE-bench",
        url: "https://www.swebench.com",
        source: "Benchmark",
        est: "1h",
      },
      {
        id: "p1-gaia",
        title: "GAIA benchmark",
        url: "https://huggingface.co/papers/2311.12983",
        source: "Benchmark",
        est: "1h",
      },
      {
        id: "p1-taubench",
        title: "tau-bench",
        url: "https://github.com/sierra-research/tau-bench",
        source: "Benchmark",
        est: "1h",
      },
      {
        id: "p1-agentbench",
        title: "AgentBench",
        url: "https://github.com/THUDM/AgentBench",
        source: "Benchmark",
        est: "1h",
      },
      {
        id: "p1-browsecomp",
        title: "BrowseComp",
        url: "https://openai.com/index/browsecomp/",
        source: "Benchmark",
        est: "1h",
      },
    ],
  },
  {
    index: 2,
    id: "harbor-of-protocols",
    region: "Harbor of Protocols",
    blurb:
      "MCP, Anthropic primitives, and the programmatic surface. Make Claude programmable.",
    resources: [
      {
        id: "p2-mcp",
        title: "Model Context Protocol specification",
        url: "https://modelcontextprotocol.io",
        source: "MCP",
        est: "3h",
      },
      {
        id: "p2-cc-101",
        title: "Claude Code 101",
        url: "https://anthropic.skilljar.com/claude-code-101",
        source: "Anthropic Academy",
        est: "1-2h",
      },
      {
        id: "p2-cc-in-action",
        title: "Claude Code in Action",
        url: "https://anthropic.skilljar.com/claude-code-in-action",
        source: "Anthropic Academy",
        est: "3h",
        note: "Hands-on Claude Code patterns.",
      },
      {
        id: "p2-agent-sdk",
        title: "Anthropic Agent SDK",
        url: "https://code.claude.com/docs/en/agent-sdk/overview",
        source: "Claude Code docs",
        est: "3h",
      },
      {
        id: "p2-claude-p",
        title: "claude -p (headless mode)",
        url: "https://code.claude.com/docs/en/headless",
        source: "Claude Code docs",
        est: "1h",
        note: "Non-interactive Claude Code for scripts and CI.",
      },
      {
        id: "p2-cc-actions",
        title: "Claude Code GitHub Actions",
        url: "https://code.claude.com/docs/en/github-actions",
        source: "Claude Code docs",
        est: "2h",
        note: "Branch-level autonomous PR review and goal execution.",
      },
      {
        id: "p2-third-party",
        title: "Agent SDK demos",
        url: "https://github.com/anthropics/claude-agent-sdk-demos",
        source: "Anthropic",
        est: "3h",
        note: "Anthropic's reference apps built on the Agent SDK.",
      },
      {
        id: "p2-computer-use",
        title: "Anthropic Computer Use",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool",
        source: "Anthropic docs",
        est: "2h",
      },
    ],
  },
  {
    index: 3,
    id: "the-workshop",
    region: "The Workshop",
    blurb:
      "Open source, fine-tuning, and memory beyond RAG. Hands dirty with open models, browser automation, and memory architectures.",
    resources: [
      {
        id: "p3-hf-full",
        title: "Hugging Face Agents Course (full)",
        url: "https://huggingface.co/learn/agents-course",
        source: "Hugging Face",
        est: "12-15h",
      },
      {
        id: "p3-hf-bonus",
        title: "Hugging Face Agents Course bonuses",
        url: "https://huggingface.co/learn/agents-course/bonus-unit1/introduction",
        source: "Hugging Face",
        est: "4-6h",
      },
      {
        id: "p3-karpathy",
        title: "Neural Networks: Zero to Hero",
        url: "https://karpathy.ai/zero-to-hero.html",
        source: "Andrej Karpathy",
        est: "20-25h",
      },
      {
        id: "p3-stagehand",
        title: "Stagehand",
        url: "https://github.com/browserbase/stagehand",
        source: "Browserbase",
        est: "3h",
      },
      {
        id: "p3-browser-use",
        title: "browser-use",
        url: "https://github.com/browser-use/browser-use",
        source: "Open source",
        est: "3h",
      },
      {
        id: "p3-mem0",
        title: "Mem0",
        url: "https://github.com/mem0ai/mem0",
        source: "Mem0",
        est: "2h",
      },
      {
        id: "p3-graphrag",
        title: "GraphRAG",
        url: "https://github.com/microsoft/graphrag",
        source: "Microsoft",
        est: "3h",
      },
      {
        id: "p3-long-term-mem",
        title: "Long-term memory patterns survey",
        source: "Compiled reading list",
        est: "2h",
        note: "Anthropic, Mem0, GraphRAG, and cognitive architectures, compared.",
      },
    ],
  },
  {
    index: 4,
    id: "framework-crossroads",
    region: "Framework Crossroads",
    blurb:
      "Multi-framework fluency and multi-agent coordination at production scale.",
    resources: [
      {
        id: "p4-ed-donner",
        title: "Complete Agentic AI in 6 weeks",
        url: "https://www.udemy.com/course/agentic-ai-engineering",
        source: "Ed Donner",
        est: "30-40h",
      },
      {
        id: "p4-langgraph-ts",
        title: "LangGraph.js Quickstart",
        url: "https://academy.langchain.com",
        source: "LangChain Academy",
        est: "6-8h",
      },
      {
        id: "p4-devin",
        title: "Devin engineering posts",
        url: "https://cognition.ai/blog",
        source: "Cognition",
        est: "3h",
      },
      {
        id: "p4-multi-agent",
        title: "How we built our multi-agent research system",
        url: "https://www.anthropic.com/engineering/multi-agent-research-system",
        source: "Anthropic Engineering",
        est: "2h",
      },
      {
        id: "p4-hamel-multi",
        title: "When to use multi-agent (and when not to)",
        url: "https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them",
        source: "Anthropic",
        est: "1h",
      },
    ],
  },
  {
    index: 5,
    id: "the-observatory",
    region: "The Observatory",
    blurb:
      "Evals discipline. Build the muscle of measuring agents the way the field's best teams do.",
    resources: [
      {
        id: "p5-hamel",
        title: "Evals corpus",
        url: "https://hamel.dev/blog/posts/evals-faq/",
        source: "Hamel Husain",
        est: "4-6h",
      },
      {
        id: "p5-forest-friends",
        title: "Forest Friends evals zine",
        url: "https://forestfriends.tech/",
        source: "Forest Friends",
        est: "2h",
      },
      {
        id: "p5-lenny",
        title: "Beyond vibe checks: a PM's guide to evals",
        url: "https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete",
        source: "Lenny's Newsletter",
        est: "1h",
      },
      {
        id: "p5-eugene-yan",
        title: "Eugene Yan eval posts",
        url: "https://eugeneyan.com/tag/eval/",
        source: "Eugene Yan",
        est: "3h",
      },
      {
        id: "p5-arize",
        title: "Recipe Bot eval workflow",
        url: "https://arize.com/blog/ai-evals-maven-course-homework-the-recipe-bot-workflow/",
        source: "Arize",
        est: "2h",
      },
      {
        id: "p5-dlai",
        title: "Evaluating AI Agents",
        url: "https://www.deeplearning.ai/courses/evaluating-ai-agents",
        source: "DeepLearning.AI",
        est: "3h",
      },
      {
        id: "p5-anthropic-prompt",
        title: "Prompt engineering interactive tutorial",
        url: "https://github.com/anthropics/prompt-eng-interactive-tutorial",
        source: "Anthropic",
        est: "3h",
      },
    ],
  },
  {
    index: 6,
    id: "the-summit",
    region: "The Summit",
    blurb:
      "Cloud capstone and cost engineering. Ship the eval-gated agent. Run it on managed infrastructure. Engineer cost down to a target session price.",
    resources: [
      {
        id: "p6-managed-agents",
        title: "Managed Agents docs",
        url: "https://platform.claude.com/docs/en/agents/managed-agents",
        source: "Anthropic",
        est: "3h",
      },
      {
        id: "p6-inngest",
        title: "Inngest for durable workflows",
        url: "https://www.inngest.com",
        source: "Inngest",
        est: "3h",
      },
      {
        id: "p6-cloud-run",
        title: "Google Cloud Run for agent workloads",
        url: "https://cloud.google.com/run",
        source: "Google Cloud",
        est: "2h",
      },
      {
        id: "p6-railway-pgvector",
        title: "Deploy a RAG pipeline with pgvector",
        url: "https://docs.railway.com/guides/rag-pipeline-pgvector",
        source: "Railway",
        est: "2h",
      },
      {
        id: "p6-capstone",
        title: "Ship the eval-gated agent capstone",
        source: "Self-directed project",
        est: "20-30h",
        note: "Deploy a production agent gated by an eval suite.",
      },
      {
        id: "p6-prompt-caching",
        title: "Prompt caching",
        url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
        source: "Anthropic",
        est: "1h",
      },
      {
        id: "p6-batch",
        title: "Batch API and async patterns",
        url: "https://platform.claude.com/docs/en/build-with-claude/batch-processing",
        source: "Anthropic",
        est: "1h",
      },
      {
        id: "p6-routing",
        title: "Model routing: Opus vs Sonnet vs Haiku",
        url: "https://platform.claude.com/docs/en/about-claude/models/overview",
        source: "Anthropic",
        est: "1h",
        note: "Compare capability, latency, and cost per tier to route per task.",
      },
    ],
  },
];

export function totalCheckpoints(): number {
  return phases.reduce((sum, p) => sum + p.resources.length, 0);
}
