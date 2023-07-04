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
        statusCode: 403
      });
    };

    const user = session.user.email;

    if (!platformAdmins.includes(user)) {
      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: 401
      });
    };

    event.session = session
  }
});