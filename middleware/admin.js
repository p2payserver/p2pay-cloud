const notUser = () => {

  const error = new Error();
  error.code = 401;
  error.message = 'Unauthorized'
  return error;
}

const notAdmin = () => {

  const error = new Error();
  error.code = 403;
  error.message = 'Unauthenticated'
  return error;
}

export default defineNuxtRouteMiddleware(async (to, from) => {

  const { status } = useAuth();

  if (status.value === 'authenticated') {

    const { error, pending} = await useIsFieldTouched('/api/admin/user');

    if (error || !pending) return abortNavigation(notAdmin());

    return
  }

  return abortNavigation(notUser())
})