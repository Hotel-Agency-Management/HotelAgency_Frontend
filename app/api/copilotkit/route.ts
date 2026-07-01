import { BuiltInAgent, CopilotRuntime, convertMessagesToVercelAISDKMessages, createCopilotRuntimeHandler } from '@copilotkit/runtime/v2'
import { createOpenAI } from '@ai-sdk/openai'
import { jsonSchema, stepCountIs, streamText, tool, type ToolSet } from 'ai'
import type { JSONSchema7 } from 'ai'

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
})

// CopilotKit's built-in `convertToolsToVercelAITools` round-trips each tool's JSON
// schema through Zod and only understands plain `object`/`string`/`number`/`boolean`/
// `array` types — it throws "Invalid JSON schema" on anything with a `nullable()`
// field (emitted as `type: ["string", "null"]` or `anyOf`). Wrapping the raw JSON
// schema with `ai`'s `jsonSchema()` instead forwards it to the model unmodified.
function toVercelTools(tools: { name: string; description: string; parameters?: unknown }[]): ToolSet {
  return Object.fromEntries(
    tools.map((agentTool) => [
      agentTool.name,
      tool({
        description: agentTool.description,
        inputSchema: jsonSchema((agentTool.parameters ?? { type: 'object', properties: {} }) as JSONSchema7),
      }),
    ]),
  )
}

const runtime = new CopilotRuntime({
  agents: {
    default: new BuiltInAgent({
      type: 'aisdk',
      factory: ({ input, abortSignal }) =>
        streamText({
          // `.chat()` forces the classic Chat Completions surface. Calling the
          // provider directly (`groq(model)`) defaults to OpenAI's newer Responses
          // API shape, which encodes reasoning as special item types that Groq's
          // `/openai/v1` compatibility layer doesn't implement — leading to
          // "Input contains unsupported content types or unsupported content fields".
          model: groq.chat('openai/gpt-oss-120b'),
          messages: convertMessagesToVercelAISDKMessages(input.messages),
          tools: toVercelTools(input.tools),
          abortSignal,
          stopWhen: stepCountIs(5),
        }),
    }),
  },
})

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: '/api/copilotkit',
  mode: 'single-route',
})

export const GET = handler
export const POST = handler
export const OPTIONS = handler
