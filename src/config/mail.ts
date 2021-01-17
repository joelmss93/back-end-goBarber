interface IMailConfig {
  driver: 'etherial' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'etherial',

  defaults: {
    from: {
      email: 'joelmss93@gmail.com',
      name: 'Joel',
    },
  },
} as IMailConfig;
