export const authenticateEmail = (event) => {
  const { path, slug } = getQuery(event);
  const emailRegex = /[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+/
  const pathEmails = path.match(emailRegex) || [];
  const slugEmails = slug.match(emailRegex) || []
  const pathSlugEmails = [...pathEmails, ...slugEmails]

  pathSlugEmails.forEach(str => {
    const match = str.match(emailRegex);
    if (match !== event.session.user.email) {
      throw createError({
        statusMessage: 'Unauthenticated',
        statusCode: 403
      });
    }
  });
}