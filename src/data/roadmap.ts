export type Resource = {
  id: string;
  title: string;
  url?: string;
  kind: "course" | "book" | "doc" | "video" | "post" | "repo" | "benchmark" | "tool";
  est?: string;
  note?: string;
  secret?: boolean;
};

export type Phase = {
  index: number;
  id: string;
  region: string;
  tagline: string;
  blurb: string;
  resources: Resource[];
};

export const phases: Phase[] = [
  {
    index: 0,
    id: "home-port",
    region: "Home Port",
    tagline: "Re-read the home charts",
    blurb:
      "Anchor the journey. Re-read every module of the AI Agent Engineering course end to end so the rest of the voyage rests on a sound deck.",
    resources: [
      {
        id: "p0-m01-05",
        title: "Re-read M01-M05: Foundations of agent engineering",
        kind: "course",
        est: "4-6h",
        note: "Tokens, context windows, tool calls, retries, deterministic core loop.",
      },
      {
        id: "p0-m06-10",
        title: "Re-read M06-M10: Tool use and structured outputs",
        kind: "course",
        est: "4-6h",
        note: "JSON schemas, function calling, MCP primer, parsing failures.",
      },
      {
        id: "p0-m11-15",
        title: "Re-read M11-M15: Agentic patterns and orchestration",
        kind: "course",
        est: "4-6h",
        note: "Planner-executor, reflection, routing, supervisor patterns.",
      },
      {
        id: "p0-m16-20",
        title: "Re-read M16-M20: Production concerns",
        kind: "course",
        est: "4-6h",
        note: "Latency, cost, retries, idempotency, observability.",
      },
      {
        id: "p0-m21-25",
        title: "Re-read M21-M25: Advanced topics and capstones",
        kind: "course",
        est: "4-6h",
        note: "Multi-agent, evals, deployment patterns, long-running workflows.",
      },
    ],
  },
  {
    index: 1,
    id: "the-library",
    region: "The Library",
    tagline: "Canon reading and the lay of the land",
    blurb:
      "Field literacy. Read the canonical pieces, then learn the benchmarks the field measures itself against.",
    resources: [
      {
        id: "p1-bea",
        title: "Building Effective Agents (Anthropic)",
        url: "https://www.anthropic.com/research/building-effective-agents",
        kind: "post",
        est: "1h",
      },
      {
        id: "p1-12factor",
        title: "12-Factor Agents",
        url: "https://github.com/humanlayer/12-factor-agents",
        kind: "repo",
        est: "2h",
      },
      {
        id: "p1-patterns",
        title: "Patterns of Agentic Systems (learnagenticpatterns.com)",
        url: "https://learnagenticpatterns.com",
        kind: "doc",
        est: "3-4h",
      },
      {
        id: "p1-swebench",
        title: "SWE-bench",
        url: "https://www.swebench.com",
        kind: "benchmark",
        est: "1h",
      },
      {
        id: "p1-gaia",
        title: "GAIA benchmark",
        url: "https://huggingface.co/papers/2311.12983",
        kind: "benchmark",
        est: "1h",
      },
      {
        id: "p1-taubench",
        title: "tau-bench",
        url: "https://github.com/sierra-research/tau-bench",
        kind: "benchmark",
        est: "1h",
      },
      {
        id: "p1-agentbench",
        title: "AgentBench",
        url: "https://github.com/THUDM/AgentBench",
        kind: "benchmark",
        est: "1h",
      },
      {
        id: "p1-browsecomp",
        title: "BrowseComp",
        url: "https://openai.com/index/browsecomp/",
        kind: "benchmark",
        est: "1h",
      },
    ],
  },
  {
    index: 2,
    id: "harbor-of-protocols",
    region: "Harbor of Protocols",
    tagline: "MCP, Anthropic primitives, and the programmatic surface",
    blurb:
      "Make Claude programmable. Master the Model Context Protocol, the Anthropic primitives, and the Claude Code surface.",
    resources: [
      {
        id: "p2-mcp",
        title: "Model Context Protocol specification",
        url: "https://modelcontextprotocol.io",
        kind: "doc",
        est: "3h",
      },
      {
        id: "p2-cc-101",
        title: "Claude Code 101 (Anthropic)",
        url: "https://www.anthropic.com/claude-code",
        kind: "doc",
        est: "2h",
      },
      {
        id: "p2-cc-in-action",
        title: "Claude Code in Action",
        kind: "video",
        est: "3h",
        note: "Anthropic workshop series. Hands-on Claude Code patterns.",
      },
      {
        id: "p2-agent-sdk",
        title: "Anthropic Agent SDK",
        url: "https://docs.anthropic.com/en/docs/agents",
        kind: "doc",
        est: "3h",
      },
      {
        id: "p2-claude-p",
        title: "claude -p CLI usage",
        kind: "doc",
        est: "1h",
        note: "Headless mode for scripts and batch automations.",
      },
      {
        id: "p2-cc-actions",
        title: "Claude Code GitHub Actions",
        kind: "doc",
        est: "2h",
        note: "Branch-level autonomous PR review and goal execution.",
      },
      {
        id: "p2-third-party",
        title: "Third-party Agent SDK apps",
        kind: "repo",
        est: "3h",
        note: "Study open-source apps built on the Anthropic Agent SDK.",
      },
      {
        id: "p2-computer-use",
        title: "Anthropic Computer Use",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/computer-use",
        kind: "doc",
        est: "2h",
      },
    ],
  },
  {
    index: 3,
    id: "the-workshop",
    region: "The Workshop",
    tagline: "Open source, fine-tuning, and memory beyond RAG",
    blurb:
      "Get your hands dirty. Open-source models, fine-tuning fundamentals, browser automation, and memory architectures past plain RAG.",
    resources: [
      {
        id: "p3-hf-full",
        title: "Hugging Face Agents Course (full)",
        url: "https://huggingface.co/learn/agents-course",
        kind: "course",
        est: "12-15h",
      },
      {
        id: "p3-hf-bonus",
        title: "Hugging Face Agents Course bonuses",
        url: "https://huggingface.co/learn/agents-course/bonus-unit1/introduction",
        kind: "course",
        est: "4-6h",
      },
      {
        id: "p3-karpathy",
        title: "Karpathy: Neural Networks Zero to Hero",
        url: "https://karpathy.ai/zero-to-hero.html",
        kind: "video",
        est: "20-25h",
      },
      {
        id: "p3-stagehand",
        title: "Stagehand (Browserbase)",
        url: "https://github.com/browserbase/stagehand",
        kind: "repo",
        est: "3h",
      },
      {
        id: "p3-browser-use",
        title: "browser-use",
        url: "https://github.com/browser-use/browser-use",
        kind: "repo",
        est: "3h",
      },
      {
        id: "p3-mem0",
        title: "Mem0",
        url: "https://github.com/mem0ai/mem0",
        kind: "repo",
        est: "2h",
      },
      {
        id: "p3-graphrag",
        title: "GraphRAG (Microsoft)",
        url: "https://github.com/microsoft/graphrag",
        kind: "repo",
        est: "3h",
      },
      {
        id: "p3-long-term-mem",
        title: "Long-term memory patterns survey",
        kind: "post",
        est: "2h",
        note: "Anthropic + Mem0 + GraphRAG + cognitive architectures, compared.",
      },
    ],
  },
  {
    index: 4,
    id: "framework-crossroads",
    region: "Framework Crossroads",
    tagline: "Multi-framework fluency and multi-agent coordination",
    blurb:
      "Learn the maps the rest of the field uses. Then learn when and when not to coordinate multiple agents.",
    resources: [
      {
        id: "p4-ed-donner",
        title: "Ed Donner: Complete Agentic AI in 6 weeks",
        url: "https://www.udemy.com/course/agentic-ai-engineering",
        kind: "course",
        est: "30-40h",
      },
      {
        id: "p4-langgraph-ts",
        title: "LangChain Academy: LangGraph.js Quickstart",
        url: "https://academy.langchain.com",
        kind: "course",
        est: "6-8h",
      },
      {
        id: "p4-devin",
        title: "Cognition Devin engineering posts",
        url: "https://cognition.ai/blog",
        kind: "post",
        est: "3h",
      },
      {
        id: "p4-multi-agent",
        title: "Anthropic multi-agent orchestration",
        url: "https://www.anthropic.com/news/multi-agent-research-system",
        kind: "post",
        est: "2h",
      },
      {
        id: "p4-hamel-multi",
        title: "Hamel: when not to multi-agent",
        url: "https://hamel.dev",
        kind: "post",
        est: "1h",
      },
    ],
  },
  {
    index: 5,
    id: "the-observatory",
    region: "The Observatory",
    tagline: "Evals discipline",
    blurb:
      "Stop guessing. Build the muscle of measuring agents the way the field's best teams do.",
    resources: [
      {
        id: "p5-hamel",
        title: "Hamel's evals corpus",
        url: "https://hamel.dev/blog/posts/evals-faq/",
        kind: "post",
        est: "4-6h",
      },
      {
        id: "p5-forest-friends",
        title: "Forest Friends evals zine",
        url: "https://github.com/forest-friends/evals-zine",
        kind: "doc",
        est: "2h",
      },
      {
        id: "p5-lenny",
        title: "Lenny: Beyond Vibe Checks",
        url: "https://www.lennysnewsletter.com",
        kind: "post",
        est: "1h",
      },
      {
        id: "p5-eugene-yan",
        title: "Eugene Yan evals writing",
        url: "https://eugeneyan.com",
        kind: "post",
        est: "3h",
      },
      {
        id: "p5-arize",
        title: "Arize Recipe Bot eval case study",
        url: "https://arize.com",
        kind: "post",
        est: "2h",
      },
      {
        id: "p5-dlai",
        title: "DeepLearning.AI eval shorts",
        url: "https://www.deeplearning.ai",
        kind: "video",
        est: "3h",
      },
      {
        id: "p5-anthropic-prompt",
        title: "Anthropic prompt engineering tutorial",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        kind: "doc",
        est: "3h",
      },
    ],
  },
  {
    index: 6,
    id: "the-summit",
    region: "The Summit",
    tagline: "Cloud capstone and cost engineering",
    blurb:
      "Ship the eval-gated agent. Run it on managed infrastructure. Engineer cost down to a target session price.",
    resources: [
      {
        id: "p6-managed-agents",
        title: "Anthropic Managed Agents docs",
        url: "https://docs.anthropic.com/en/docs/agents/managed-agents",
        kind: "doc",
        est: "3h",
      },
      {
        id: "p6-inngest",
        title: "Inngest for durable workflows",
        url: "https://www.inngest.com",
        kind: "doc",
        est: "3h",
      },
      {
        id: "p6-cloud-run",
        title: "Google Cloud Run for agent workloads",
        url: "https://cloud.google.com/run",
        kind: "doc",
        est: "2h",
      },
      {
        id: "p6-railway-pgvector",
        title: "Railway + pgvector deployment",
        url: "https://railway.app",
        kind: "doc",
        est: "2h",
      },
      {
        id: "p6-capstone",
        title: "Ship the eval-gated agent capstone",
        kind: "course",
        est: "20-30h",
        note: "Deploy a production agent gated by an eval suite. The journey's summit.",
      },
      {
        id: "p6-prompt-caching",
        title: "Prompt caching (Anthropic)",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
        kind: "doc",
        est: "1h",
      },
      {
        id: "p6-batch",
        title: "Batch API and async patterns",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/batch-processing",
        kind: "doc",
        est: "1h",
      },
      {
        id: "p6-routing",
        title: "Model routing: Opus vs Sonnet vs Haiku",
        kind: "post",
        est: "1h",
        note: "Cost per session calculation, routing heuristics, observable spend.",
      },
      {
        id: "p6-secret-cache",
        title: "Cartographer's secret cache",
        kind: "post",
        secret: true,
        note: "Hidden stamp. Reachable by the curious. No hints in the README.",
      },
    ],
  },
];

export type AppendixEntry = {
  id: string;
  title: string;
  url?: string;
  blurb: string;
};

export const appendix: AppendixEntry[] = [
  {
    id: "anthropic-cookbook",
    title: "Anthropic Cookbook",
    url: "https://github.com/anthropics/anthropic-cookbook",
    blurb: "Reference notebooks for tool use, RAG, agents, and evals.",
  },
  {
    id: "agent-sdk-examples",
    title: "Anthropic Agent SDK examples",
    url: "https://github.com/anthropics/agent-sdk-examples",
    blurb: "Reference apps built on the Agent SDK.",
  },
  {
    id: "openai-evals",
    title: "OpenAI evals framework",
    url: "https://github.com/openai/evals",
    blurb: "Battle-tested eval orchestration patterns.",
  },
  {
    id: "promptfoo",
    title: "promptfoo",
    url: "https://www.promptfoo.dev",
    blurb: "Local-first eval and red-team tool used in production shops.",
  },
  {
    id: "ragas",
    title: "Ragas",
    url: "https://github.com/explodinggradients/ragas",
    blurb: "RAG and retrieval evaluation toolkit.",
  },
  {
    id: "smol-agents",
    title: "smolagents (Hugging Face)",
    url: "https://github.com/huggingface/smolagents",
    blurb: "Minimal agent framework. Source-readable in an afternoon.",
  },
];

export function totalCheckpoints(): number {
  return phases.reduce((sum, p) => sum + p.resources.filter(r => !r.secret).length, 0);
}

export function totalCheckpointsWithSecret(): number {
  return phases.reduce((sum, p) => sum + p.resources.length, 0);
}
