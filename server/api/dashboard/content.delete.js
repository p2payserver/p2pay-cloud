
export default eventHandler(async event => {

  const { path, slug } = getQuery(event);

  await deleteFile({
    path: `${path}/${slug}`,
    message: `delete file ${slug}`
  });
  
  setResponseStatus(event, 204);
  return true;
});