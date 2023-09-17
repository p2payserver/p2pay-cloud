import { ofetch } from 'ofetch';

export default eventHandler(async event => {

  const {
    blockcypherToken,
  } = useRuntimeConfig();

  const {
    profile,
    invoiceId, 
    walletAddress 
  } = await readBody(event);

  const webhookDomain = await getWebhookDomain();
  console.log('webhookDomain', webhookDomain)

  return await ofetch(`https://api.blockcypher.com/v1/btc/main/hooks`, {
    method: 'POST',
    query: {
      token: blockcypherToken
    },
    body: {
      event: 'unconfirmed-tx',
      address: walletAddress,
      url: `${webhookDomain}/api/blockcypher/webhook/${profile}/${invoiceId}`
    }
  })
});