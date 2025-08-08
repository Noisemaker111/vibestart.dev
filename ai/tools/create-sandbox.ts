import type { UIMessageStreamWriter, UIMessage } from 'ai'
import type { DataPart } from '../messages/data-parts'
import { Sandbox } from '@vercel/sandbox'
import { tool } from 'ai'
import description from './create-sandbox.md'
import z from 'zod/v3'

interface Params {
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>
}

export const createSandbox = ({ writer }: Params) =>
  tool({
    description,
    inputSchema: ((): z.ZodObject<{
      timeout: z.ZodOptional<z.ZodNumber>
      ports: z.ZodOptional<z.ZodArray<z.ZodNumber>>
    }> => {
      return z.object({
        timeout: z
          .number()
          .optional()
          .describe(
            'Maximum time in milliseconds the Vercel Sandbox will remain active before automatically shutting down. In this app, the default is 45 minutes (2700000 ms) unless explicitly overridden. The sandbox will terminate all running processes when this timeout is reached. Provider max is 45 minutes.'
          ),
        ports: z
          .array(z.number())
          .max(2)
          .optional()
          .describe(
            'Array of network ports to expose and make accessible from outside the Vercel Sandbox. These ports allow web servers, APIs, or other services running inside the Vercel Sandbox to be reached externally. Common ports include 3000 (Next.js), 8000 (Python servers), 5000 (Flask), etc.'
          ),
      })
    })(),
    execute: async (
      { timeout, ports }: { timeout?: number; ports?: number[] },
      { toolCallId }: { toolCallId: string }
    ) => {
      writer.write({
        id: toolCallId,
        type: 'data-create-sandbox',
        data: { status: 'loading' },
      })

      // Determine effective timeout:
      // - Prefer explicit `timeout` param
      // - Else use env `SANDBOX_TIMEOUT_MS` if set (number, in ms)
      // - Else fall back to a longer default of 30 minutes
      // Cap at the documented maximum (45 minutes)
      const MAX_TIMEOUT_MS = 45 * 60 * 1000
      const DEFAULT_TIMEOUT_MS = 45 * 60 * 1000
      const requestedTimeout = timeout ?? DEFAULT_TIMEOUT_MS
      const effectiveTimeout = Math.min(requestedTimeout, MAX_TIMEOUT_MS)

      const sandbox = await Sandbox.create({
        timeout: effectiveTimeout,
        ports,
      })

      writer.write({
        id: toolCallId,
        type: 'data-create-sandbox',
        data: { sandboxId: sandbox.sandboxId, status: 'done' },
      })

      return `Sandbox created with ID: ${sandbox.sandboxId}. You can now upload files, run commands, and access services on the exposed ports.`
    },
  })
