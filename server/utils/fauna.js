import faunadb from 'faunadb'

const {
  faunaSecret
} = useRuntimeConfig();

const q = faunadb.query;

const client = new faunadb.Client({
  secret: faunaSecret,
  scheme: 'https',
  domain: 'db.fauna.com',
  port: 443
});

export const getFauna = () => {
  return {
    q,
    client
  }
}