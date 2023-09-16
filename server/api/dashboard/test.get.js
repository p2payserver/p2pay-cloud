export default eventHandler(async event => {

  const { path, slug } = getQuery(event);

  return  { slug, path }
});