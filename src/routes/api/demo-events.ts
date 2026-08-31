import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../db/index.js'
import { demoEvents } from '../../../db/schema.js'

const allowedTypes = new Set(['trip_planned', 'redirect_accepted', 'bid_posted', 'offer_accepted', 'sos_demo', 'vendor_registered', 'vendor_offer_submitted'])

export const Route = createFileRoute('/api/demo-events')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as { type?: unknown; payload?: unknown }
          if (typeof body.type !== 'string' || !allowedTypes.has(body.type) || !body.payload || typeof body.payload !== 'object' || Array.isArray(body.payload)) {
            return Response.json({ error: 'Invalid demo event' }, { status: 400 })
          }
          await db.insert(demoEvents).values({ type: body.type, payload: body.payload })
          return Response.json({ saved: true }, { status: 201 })
        } catch {
          return Response.json({ error: 'Unable to save demo event' }, { status: 500 })
        }
      },
    },
  },
})
