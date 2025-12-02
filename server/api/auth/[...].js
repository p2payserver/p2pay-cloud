import { NuxtAuthHandler } from '#auth';
import { NuxtHubD1Adapter } from '../../utils/nuxtHubD1Adapter'
import EmailProvider from "next-auth/providers/email";
import nodemailer from 'nodemailer';
import { locales, defaultLocale } from '~/assets/js/locales';
import find from 'lodash.find';

const {
  // isDeployed,
  nextAuthSecret, 
  marangaduUser,
  marangaduPassword,
  marangaduHost,
  marangaduPort,
  marangaduFrom,
} = useRuntimeConfig();


export default NuxtAuthHandler({
  // debug: (isDeployed) ? false : true,
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
        
        // this uses fs on dev and github in production
        const {
          auth: {
            loginEmail,
            emailSubject,
            emailContent
          }
        } = await useStorage('lang').getItem(`${locale}.json`);

        const { host } = new URL(url);

        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: emailSubject.replace('{host}', host),
          text: emailContent.replace('{host}', host).replace('{url}', url),
          html: `
          <body style="background: #ffffff;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: #000000;">
                  <strong>${host.replace(/\./g, "&#8203;.")}</strong>
                </td>
              </tr>
            </table>
            <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: #ffffff; max-width: 600px; margin: auto; border-radius: 10px;">
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center" style="border-radius: 5px;" bgcolor="#F7931A"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid #F7931A; display: inline-block; font-weight: bold;">${loginEmail}</a></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: #000000;">${emailContent.split('\n\n{url}\n\n')[1]}</td>
              </tr>
            </table>
          </body>
          `
        });
      },
    })
  ],
  adapter: NuxtHubD1Adapter(),
  session: {
    strategy: 'database'
  },
});
