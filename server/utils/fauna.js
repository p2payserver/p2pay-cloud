import faunadb from 'faunadb'

const {
  faunaSecret
} = useRuntimeConfig();

export const faunaQ = faunadb.query;

export const faunaClient = new faunadb.Client({
  secret: faunaSecret,
  scheme: 'https',
  domain: 'db.fauna.com',
  port: 443
});