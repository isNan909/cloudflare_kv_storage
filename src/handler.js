import { Router } from 'itty-router'
import { nanoid } from 'nanoid'
import { getAllSubscriptions, addSubscriptions } from './utils/main'

const router = Router()
export const KV_KEY_ID = 'subs'

router.get('/api/subscriptions', async req => {
  const allSubs = await getAllSubscriptions()
  return new Response(JSON.stringify(allSubs))
})

router.post('/api/subscriptions', async req => {
  let content = await req.json?.()
  if (content == undefined) {
    return new Response('Please provide a request body.')
  }
  content['id'] = nanoid()
  let subs = await addSubscriptions(content)
  return new Response(JSON.stringify(subs))
})

router.get('/api/subscriptions/:id', async req => {
  let allSubs = await getAllSubscriptions()
  let subID = allSubs.find(a => a['id'] == req.params?.id)
  if (!subID) {
    return new Response('This ID is not matched')
  }
  return new Response(JSON.stringify(subID))
})

router.get('*', () => new Response('Not found', { status: 404 }))

export const handleRequest = request => router.handle(request)
