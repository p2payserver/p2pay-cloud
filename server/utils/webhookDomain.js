import ngrok from 'ngrok';

const {
  public: {
    isDeployed,
    deploymentDomain
  }
} = useRuntimeConfig();

export const getWebhookDomain = async () => {

  let domain;

  if (isDeployed) {

    domain = deploymentDomain
  }
  else {

    const apiUrl = ngrok.getUrl();
    console.log('apiUrl', apiUrl)

    if (apiUrl) {

      const api = ngrok.getApi();
      console.log('api', api)
      const tunnels = await api.listTunnels();
      console.log('tunnels', tunnels)

      domain = tunnels.tunnels[0].public_url;
      console.log('domain', domain)
    }
    else {
      const ngrokUrl = await ngrok.connect({
        addr: 3000, 
        region: 'eu'
      });

      console.log('ngrokUrl', ngrokUrl)
      domain = ngrokUrl;
    }
  };

  return domain;

};