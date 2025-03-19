export default defineNuxtRouteMiddleware(async (to, from) => {

  const { status } = useAuth();

  if (status.value === 'authenticated') {

    const { error } = await useFetch('/api/admin/user');

    if (error.value) {
      setResponseStatus(event, 403);
      return 'Unauthenticated'
    };

    return;
  }

  // We don't handle the 401 Unauthenticated case
  // because it get redirected to the login page
})