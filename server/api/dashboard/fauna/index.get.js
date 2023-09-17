
export default eventHandler(async event => {

  const { q, client } = getFauna();

  const { data } = await client.query(
    q.Get(
      q.Match(
        q.Index('user_by_email'), 
        event.session.user.email
      )
    )
  );
  
  return data;
});