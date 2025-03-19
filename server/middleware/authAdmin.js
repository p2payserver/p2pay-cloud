import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {

  const {
    platformAdmins
  } = useRuntimeConfig();

  const targetUrl = event.req.url;
	const securedUrls = '/api/admin/';
  
  if (targetUrl.startsWith(securedUrls)) {

    const session = await getServerSession(event);

    if (!session) {
      throw createError({
        statusMessage: 'Unauthenticated',
        statusCode: 401
      });
    };

    const user = session.user.email;

    if (!platformAdmins.includes(user)) {
      setResponseStatus(event, 403);
      return 'Unauthenticated'
    };

    event.session = session
  }
});