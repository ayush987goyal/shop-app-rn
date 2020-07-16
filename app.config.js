import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiKey: process.env.API_KEY,
    },
  };
};
