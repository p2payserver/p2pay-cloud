export default eventHandler(async event => {

  const { path, slug } = getQuery(event);

  return  await useStorage(`content:${path.replaceAll('/', ':')}`).getItem(`${slug}`);
});