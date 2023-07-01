import { NuxtAuthHandler } from '#auth';
import EmailProvider from "next-auth/providers/email";
import faunadb from "faunadb";
import { myLoginAdapter } from '../../../assets/js/myLoginAdapter';

const {
  nextAuthSecret, 
  faunaSecret,
  marangaduUser,
  marangaduPassword,
  marangaduHost,
  marangaduPort,
  marangaduFrom,
} = useRuntimeConfig();

const client = new faunadb.Client({
  secret: faunaSecret,
  scheme: "https",
  domain: "db.fauna.com",
  port: 443,
});

export default NuxtAuthHandler({
  pages: {
    signIn: `/auth/login`,
    verifyRequest: `/auth/verify`,
  },
  secret: nextAuthSecret,
  providers: [
    EmailProvider.default({
      id: 'magic-link',
      name: 'send magic link by email',
      type: 'email',
      // sendVerificationRequest	Callback to execute when a verification request is sent	(params) => Promise<undefined>	Yes
      server: {
        host: marangaduHost,
        port: marangaduPort,
        auth: {
          user: marangaduUser,
          pass: marangaduPassword
        }
      },
      from: marangaduFrom,
      maxAge: 60 * 60 // validity of the link in secods, default is 24 hours (24 * 60 * 60)
    })
  ],
  adapter: myLoginAdapter(client)
});
