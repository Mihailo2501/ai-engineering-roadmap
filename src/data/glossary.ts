export type GlossaryEntry = {
  term: string;
  phase?: number;
  def: string;
};

export const glossary: GlossaryEntry[] = [
  {
    term: "Agent SDK",
    phase: 2,
    def: "Anthropic's official SDK for building agents on top of Claude, with primitives for tool use, structured outputs, and the core loop.",
  },
  {
    term: "AgentBench",
    phase: 1,
    def: "Multi-domain agent benchmark covering operating systems, databases, web, coding, and household environments. Useful for cross-task field literacy.",
  },
  {
    term: "Anthropic Academy",
    phase: 2,
    def: "Anthropic's official training platform on Skilljar. Hosts Claude Code 101, Claude Code in Action, and other short courses with video, quizzes, and completion certificates. Free with a Pro/Max plan or API key.",
  },
  {
    term: "Batch API",
    phase: 6,
    def: "Anthropic endpoint for submitting many Claude requests at once at a discounted rate, with results delivered asynchronously.",
  },
  {
    term: "browser-use",
    phase: 3,
    def: "Open-source library that lets an LLM drive a real browser via Playwright. A reference implementation for agentic browsing.",
  },
  {
    term: "BrowseComp",
    phase: 1,
    def: "OpenAI's benchmark for open-ended web browsing tasks where the agent must research and synthesize answers across pages.",
  },
  {
    term: "Capstone",
    phase: 6,
    def: "The end-to-end project that integrates every skill from the roadmap. Here, an eval-gated agent shipped to managed infrastructure.",
  },
  {
    term: "Claude Code",
    phase: 2,
    def: "Anthropic's official agentic coding CLI. Runs Claude inside a terminal session with tool access to the filesystem, shell, and editors.",
  },
  {
    term: "claude -p",
    phase: 2,
    def: "Headless, one-shot mode for the Claude Code CLI. Used in scripts and batch automations where no interactive session is needed.",
  },
  {
    term: "Cloud Run",
    phase: 6,
    def: "Google Cloud's managed container runtime. A common host for agent backends because it scales to zero and accepts any container image.",
  },
  {
    term: "Computer Use",
    phase: 2,
    def: "Anthropic capability that lets Claude move a mouse, click, scroll, and type on a virtual desktop. The general-purpose escape hatch when no API exists.",
  },
  {
    term: "Devin",
    phase: 4,
    def: "Cognition's autonomous software engineer agent. Their engineering blog is frequently referenced for hard-won lessons about long-running agents.",
  },
  {
    term: "Evals",
    phase: 5,
    def: "Programmatic tests that score an agent's output. The discipline of measuring agents rigorously rather than vibe-checking.",
  },
  {
    term: "Forest Friends zine",
    phase: 5,
    def: "Community-authored zine that walks through eval design at a beginner-friendly level. Treats evals as a craft, not a checkbox.",
  },
  {
    term: "Function calling",
    phase: 0,
    def: "Pattern where the model emits structured calls to named tools with typed arguments. The mechanical foundation for tool use.",
  },
  {
    term: "GAIA",
    phase: 1,
    def: "General AI Assistants benchmark. Tests real-world tasks like reading PDFs, browsing the web, and reasoning across modalities.",
  },
  {
    term: "GraphRAG",
    phase: 3,
    def: "Microsoft's open-source retrieval system that builds a knowledge graph from a corpus, then queries the graph as part of RAG.",
  },
  {
    term: "Idempotency",
    phase: 0,
    def: "Property where running an action twice has the same effect as running it once. Critical for safe retries inside an agent loop.",
  },
  {
    term: "Inngest",
    phase: 6,
    def: "Durable workflow service that handles retries, scheduling, and step-level state for long-running agents. Lets you treat agent steps as resumable.",
  },
  {
    term: "LangGraph",
    phase: 4,
    def: "LangChain's graph-based framework for stateful, multi-step agent workflows. Models the agent as a directed graph of nodes and edges.",
  },
  {
    term: "Managed Agents",
    phase: 6,
    def: "Anthropic's hosted agent runtime. Handles the infrastructure (tool execution, retries, state) so you can ship without standing up your own backend.",
  },
  {
    term: "MCP (Model Context Protocol)",
    phase: 2,
    def: "Open protocol for connecting LLMs to external tools, data sources, and applications via a standard interface. Built and stewarded by Anthropic.",
  },
  {
    term: "Mem0",
    phase: 3,
    def: "Open-source memory layer for LLM applications. Designed to give agents persistent user-level memory across sessions, beyond what fits in context.",
  },
  {
    term: "Model routing",
    phase: 6,
    def: "Strategy of choosing the right Claude tier (Opus, Sonnet, or Haiku) per task to control cost and latency at the session level.",
  },
  {
    term: "Multi-agent orchestration",
    phase: 4,
    def: "Pattern where multiple specialized agents coordinate to solve a problem, often with a supervisor splitting work and aggregating results.",
  },
  {
    term: "Opus / Sonnet / Haiku",
    phase: 6,
    def: "Claude's three model tiers. Opus is the most capable, Sonnet is the balanced default, Haiku is the fastest and cheapest.",
  },
  {
    term: "pgvector",
    phase: 6,
    def: "PostgreSQL extension that adds vector similarity search. Common embedding store for RAG because it sits inside an existing Postgres database.",
  },
  {
    term: "Planner-executor pattern",
    phase: 0,
    def: "Agent architecture that separates planning a sequence of steps from executing each one. Lets the model think before it acts.",
  },
  {
    term: "Prompt caching",
    phase: 6,
    def: "Anthropic feature that lets you reuse cached portions of large prompts at a fraction of normal input cost. The fastest cost win on long contexts.",
  },
  {
    term: "RAG (Retrieval-Augmented Generation)",
    phase: 3,
    def: "Pattern of fetching relevant context (often via vector search) before generating an answer. Phase 3 looks at memory architectures that go beyond plain RAG.",
  },
  {
    term: "Railway",
    phase: 6,
    def: "Hosting platform popular for deploying agent backends with managed Postgres and pgvector behind a single deploy command.",
  },
  {
    term: "Reflection pattern",
    phase: 0,
    def: "Agent loop where the model critiques and revises its own output before submitting. Trades latency and tokens for higher final-answer quality.",
  },
  {
    term: "Stagehand",
    phase: 3,
    def: "Browserbase's open-source library for building reliable AI-driven browser automation. Higher-level than raw Playwright, lower-level than full agents.",
  },
  {
    term: "Structured outputs",
    phase: 0,
    def: "Forcing the model to emit JSON that matches a schema. Makes downstream parsing deterministic and lets you treat the model like a typed function.",
  },
  {
    term: "Supervisor pattern",
    phase: 0,
    def: "Multi-agent setup where one agent routes tasks to specialized sub-agents and aggregates their results.",
  },
  {
    term: "SWE-bench",
    phase: 1,
    def: "Benchmark of real GitHub issues where agents must produce patches that pass the project's existing test suite. The yardstick for software-engineering agents.",
  },
  {
    term: "tau-bench",
    phase: 1,
    def: "Sierra's benchmark for tool-using agents in realistic customer-service scenarios. Stress-tests multi-turn tool use with adversarial users.",
  },
  {
    term: "Tool use",
    phase: 0,
    def: "General term for the model's ability to call external functions and incorporate the results into its next response.",
  },
  {
    term: "12-Factor Agents",
    phase: 1,
    def: "HumanLayer's adaptation of the 12-Factor App methodology to agent engineering. A pragmatic checklist for building agents that survive production.",
  },
];
