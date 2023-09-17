import nodemailer from 'nodemailer';

const {
  marangaduUser,
  marangaduPassword,
  marangaduHost,
  marangaduPort,
  marangaduFrom
} = useRuntimeConfig();

const transporter = nodemailer.createTransport({
  host: marangaduHost,
  port: marangaduPort,
  secure: true,
  auth: {
    user: marangaduUser,
    pass: marangaduPassword,
  }
}, {
  from: marangaduFrom,
});

  const getNodemailer = () => {
    return { 
      transporter 
    };
  }