import { KV_KEY_ID } from '../handler'

export const getAllSubscriptions = async () => {
  let subscriptions = await SUBSCRIPTIONS.get(KV_KEY_ID)
  if (subscriptions === null) {
    return []
  }
  return JSON.parse(subscriptions)
}

export const addSubscriptions = async (sub) => {
  let subscription = await getAllSubscriptions()
  subscription.push(sub)
  await updateSubscriptions(subscription)
  return sub
}

export const updateSubscriptions = async (sub) => {
  await SUBSCRIPTIONS.put(KV_KEY_ID, JSON.stringify(sub))
}
