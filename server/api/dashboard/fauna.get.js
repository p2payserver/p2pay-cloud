export default eventHandler(async event => {

  const { data } = await faunaClient.query(
    faunaQ.Get(
      faunaQ.Match(
        faunaQ.Index('user_by_email'), 
        event.session.user.email
      )
    )
  );
  
  return data;
});