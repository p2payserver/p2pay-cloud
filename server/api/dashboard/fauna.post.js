export default eventHandler(async event => {

  const { profile } = getQuery(event);

  const { 
    ref: { 
      value: { 
        id 
      }
    }
  } = await faunaClient.query(
    faunaQ.Get(
      faunaQ.Match(
        faunaQ.Index('user_by_email'), 
        event.session.user.email
      )
    )
  );

  await faunaClient.query(
    faunaQ.Update(
      faunaQ.Ref(
        faunaQ.Collection('users'), 
        id
      ),
      {
        data: {
          bookingProfile: profile
        }
      },
    )
  )
  
  return data;
});