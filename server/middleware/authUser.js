import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {

  const targetUrl = event.req.url;
	const securedUrls = '/api/dashboard/';
  
  if (targetUrl.startsWith(securedUrls)) {

    const session = await getServerSession(event);

    if (!session) {
      setResponseStatus(event, 403);
      return 'Unauthenticated'
    };

    event.session = session;
    // event.session.user.email
  }
});