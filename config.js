const nconf = require('nconf');
const path = require('path');

nconf
  .argv()
  .env([
    'GCLOUD_PROJECT',
    'MONGO_URL',
    'MONGO_COLLECTION',
    'NODE_ENV',
    'GCLOUD_CLIENT_ID',
    'GCLOUD_CLIENT_SECRET',
    'GCLOUD_CALLBACK',
    'PORT',
    'SECRET',
    'AUTHY_API_KEY',
    'TWILIO_CLIENT_ID',
    'TWILIO_AUTH_TOKEN',
    'TWILIO_NUM',
    'PLAID_CLIENT_ID',
    'PLAID_PUBLIC_KEY',
    'PLAID_SECRET',
    'APP_TOKEN',
    'MASTER_TOKEN',
    'ENV_URL'
  ])
  .file({ file: path.join(__dirname, 'config.json') })
  .defaults({

    GCLOUD_PROJECT: 'testchat-177217',

    MONGO_URL: 'mongodb://root:1qaz!QAZ@ds147454.mlab.com:47454/charge',
//    MONGO_COLLECTION: 'users',

//    NODE_ENV': ,

    GCLOUD_CLIENT_ID: '263854726195-v4e5o3nlqdn9pe7mepfvm8a10i9bm6a3.apps.googleusercontent.com',
    GCLOUD_CLIENT_SECRET: '6ZOVmcYdYbFYsfBokqEABSk9',
    GCLOUD_CALLBACK: 'http://localhost:8080/auth/google/callback',

    PORT: 8080,

    SECRET: '1qaz2wsx3edc4rfv_',

  //Twilio API Configurations
    AUTHY_API_KEY: 'yw3cCc6q5F6RO6QgONdzOidV8Y6yw3Zx',
    TWILIO_CLIENT_ID: 'AC077d30069cdcbc0e66d942a950ac914d',
    TWILIO_AUTH_TOKEN: '078fc8d65afbe5bfc95941c2a98fc9ad',
    TWILIO_NUM: '+18582953849 ',

  //Plaid API configurations
    PLAID_CLIENT_ID: '59d42448bdc6a47fd24ddcf5',
    PLAID_SECRET: 'd78bccea98b8f505424e425221fd0e',
    PUBLIC_KEY: 'ed15ba50dbc8a2ebba7dafe9ec6dfa',

  //Marqeta API Configuration
    APP_TOKEN: 'user19521505873420',
    MASTER_TOKEN: 'b882c8b5-4ce7-4006-80ec-38569feebbd5',
    ENV_URL: 'https://shared-sandbox-api.marqeta.com/v3/'
  });

  module.exports = nconf;