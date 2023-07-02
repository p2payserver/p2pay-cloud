import { NuxtAuthHandler } from '#auth';
import EmailProvider from "next-auth/providers/email";
import faunadb from "faunadb";
import { customFaunadbAdapter } from '~/assets/js/customFaunadbAdapter';
import nodemailer from 'nodemailer';
import { locales, defaultLocale } from '~/assets/js/locales';
import find from 'lodash.find';

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
      sendVerificationRequest: async ({
        identifier: email,
        url,
        provider: { server, from },
      }) => {
        const searchParams = new URLSearchParams(url.split('?')[1]);
        const callbackUrl = searchParams.get("callbackUrl");
        const locale = (callbackUrl && find(locales, { code: callbackUrl.split('/')[3] })) ? callbackUrl.split('/')[3] : defaultLocale;
        const { $importAuthString } = useNuxtApp();
        const { emailSubject, emailContent } = $importAuthString(locale);
        const { host } = new URL(url)
        const transport = nodemailer.createTransport(server)
        await transport.sendMail({
          to: email,
          from,
          subject: emailSubject.replace('{host}', host), // `Sign in to ${host}`,
          text: emailContent.replace('{host}', host).replace('{url}', url)
          // html:
        })
      },
    })
  ],
  adapter: customFaunadbAdapter(client)
});
