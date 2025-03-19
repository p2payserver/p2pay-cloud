export default eventHandler(async event => {

  authenticateEmail(event);

  const contentType = getHeader(event, 'Content-Type');
  const { slug, path } = getQuery(event)
  const { content } = await readBody(event);

  if (contentType === 'application/json') {  
    
    await updateJson({
      path: `${path}/${slug}`,
      content,
      message: `update file ${path}/${slug}`
    });
  } else if ( contentType === 'text/plain') {

    await updateMarkdown({
      path: `${path}/${slug}`,
      content,
      message: `update file ${path}/${slug}`    
    });
  } else if (contentType === 'image/webp') {


    await addMedia({
      path: `${path}/${slug}`,
      content,
      message: `update file ${path}/${slug}`    
    });
  } else {

    throw new Error('content type missing');
  }
  
  setResponseStatus(event, 201);
  return true;
});