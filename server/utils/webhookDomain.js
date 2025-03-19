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

    if (apiUrl) {

      const api = ngrok.getApi();
      const tunnels = await api.listTunnels();

      domain = tunnels.tunnels[0].public_url;
    }
    else {
      const ngrokUrl = await ngrok.connect({
        addr: 3000, 
        region: 'eu'
      });

      domain = ngrokUrl;
    }
  };

  return domain;

};