import { NuxtAuthHandler } from '#auth';
import EmailProvider from "next-auth/providers/email";
import faunadb from "faunadb";
import { customFaunadbAdapter } from '~/assets/js/customFaunadbAdapter';

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

const { $sendVerificationRequest } = useNuxtApp();

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
      server: {
        host: marangaduHost,
        port: marangaduPort,
        auth: {
          user: marangaduUser,
          pass: marangaduPassword
        }
      },
      from: marangaduFrom,
      maxAge: 60 * 60,
      sendVerificationRequest: $sendVerificationRequest
    })
  ],
  adapter: customFaunadbAdapter(client)
});
