export default eventHandler(async event => {

  const { profile } = getQuery(event);

  const { q, client } = getFauna();

  const { 
    ref: { 
      value: { 
        id 
      }
    }
  } = await client.query(
    q.Get(
      q.Match(
        q.Index('user_by_email'), 
        event.session.user.email
      )
    )
  );

  await client.query(
    q.Update(
      q.Ref(
        q.Collection('users'), 
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