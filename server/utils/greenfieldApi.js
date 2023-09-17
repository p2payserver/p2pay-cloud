import { readBody, getQuery } from 'h3';
import { ofetch } from 'ofetch';

const {
  public: {
    isDev,
  }
} = useRuntimeConfig();

export const greenfieldApi = async (profile, endpoint, event) => {

  const {
    btcpay: {
      storeid,
      host,
      apikey
    }
  } = await useStorage(`content:settings`).getItem(`${profile}.json`);

  const apiFetch = ofetch.create({
    baseURL: `${host}/api/v1/stores/${storeid}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${apikey}`
    },
    redirect: 'follow',
    async onRequestError({ request, error }) {
      isDev ?  console.log('[fetch request error]', request, error) : null
    },
    async onResponseError({ request, response }) {
      isDev ? console.log('[fetch response error]', request, response.status, response.body) : null
    }
  });

  const method = event.method;

  const query = getQuery(event);


  let body;
  if (method !== 'GET') {

    body = await readBody(event);
  };

  return await apiFetch(endpoint, {
    method,
    query,
    body
  });
};
