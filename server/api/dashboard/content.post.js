export default eventHandler(async event => {

  const contentType = getHeader(event, 'Content-Type');
  const { slug, content, path, message } = await readBody(event);

  if (contentType === 'application/json') {  
    
    await updateJson({
      path: `${path}/${slug}`,
      content,
      message,
    });
  } else if ( contentType === 'text/plain') {

    await updateMarkdown({
      path: `${path}/${slug}`,
      content,
      message,
    });
  } else if (contentType === 'image/webp') {


    await addMedia({
      path: `${path}/${slug}`,
      content,
      message,
    });
  } else {

    throw new Error('content type missing');
  }
  
  setResponseStatus(event, 201);
  return true;
});