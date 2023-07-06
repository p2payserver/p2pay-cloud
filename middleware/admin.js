export default defineNuxtRouteMiddleware(async (to, from) => {

  const { status } = useAuth();

  if (status.value === 'authenticated') {

    const { error } = await useFetch('/api/admin/user');

    if (error.value) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized'
      });
    };

    return;
  }

  // We don't handle the 401 Unauthenticated case
  // because it get redirected to the login page
})