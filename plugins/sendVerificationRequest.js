import nodemailer from 'nodemailer';
import { locales, defaultLocale } from '~/assets/js/locales';
import find from 'lodash.find';

export default defineNuxtPlugin(async nuxtApp => {

  const getEmail = (url) => {

    const searchParams = new URLSearchParams(url.split('?')[1]);
    const callbackUrl = searchParams.get("callbackUrl");
    const locale = (callbackUrl && find(locales, { code: callbackUrl.split('/')[3] })) ? callbackUrl.split('/')[3] : defaultLocale;
    const { $importString } = useNuxtApp();
    const { emailSubject, emailContent } = $importString(locale);
    return { emailSubject, emailContent };
  }

  return {
    provide: {
      sendVerificationRequest: async ({
        identifier: email,
        url,
        provider: { server, from },
      }) => {
        const { emailSubject, emailContent } = getEmail(url);
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
    }
  };
})