import * as dotenv from 'dotenv';

dotenv.config();

const config = {
   dev: process.env.NODE_ENV !== 'production',
   port: process.env.PORT,
   apiUrl: process.env.API_URL,
   apiKeyToken: process.env.API_KEY_TOKEN,
};

export default config;
