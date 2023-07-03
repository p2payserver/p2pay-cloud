export default {
  menu: {
    dashboard: 'Panel de control',
    invoices: 'Facturación',
    booking: 'Reservas',
    shop: 'Tienda',
    settings: 'Configuración',
    pending: 'Pendientes',
    paid: 'Pagadas'
  },
  dashboard: {
    invoice: {
      settings: 'Configuración de facturación',
      pending: 'Facturas pendientes',
      paid: 'Facturas pagadas'
    },
    booking: {
      settings: 'Configuración de reservas',
      pending: 'Reservas pendientes',
      paid: 'Reservas pagadas'
    },
    shop: {
      settings: 'Configuración de tienda',
      pending: 'Copras pendientes',
      paid: 'Compras pagadas'
    }
  },
  welcome: 'Bienvenido',
  logout: 'Salir',
  // error.vue
  pageNotFound: 'Esta página no se pudo encontrar',
  unauthorized: 'No autorizado',
  somethingWentWrong: 'Algo salió mal',
  backToTheHomePage: 'Volver a la página de inicio',
  auth: {
    loginEmail: 'Iniciar sesión',
    magicLink: 'Enviar enlache magico por correo',
    magicLinkInstructions: 'No se requiere contraseña.\n\nLe enviaremos un enlace mágico para iniciar sesión por correo electrónico.\n\nSi usa Slack, Notion o Wallet of Satoshi, es posible que esté familiarizado con este método de inicio de sesión.\n\nPara mantener su cuenta segura, habilite 2FA en su cuenta de correo electrónico.',
    emailSent: 'Correo enviado',
    checkEmail: 'Haga clic en el enlace enviado por correo electrónico para iniciar sesión en su cuenta',
    emailSubject: 'Iniciar sesión en {host}',
    emailContent: 'Inicie sesión en su cuenta en {host} haciendo clic en el enlace:\n\n{url}\n\nSi no ha solicitado este correo electrónico, puede ignorarlo de forma segura.'
  },
  customRules: {
    loginRequired: 'El correo es requerido',
    loginEmail: 'Proporcione un correo electronico valido'
  }
}