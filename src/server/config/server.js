const { env } = process;

export default {
  mongodbUri: env.MONGODB_URI || 'mongodb://192.168.2.222:27017/fongmun',
  host: env.HOST || '0.0.0.0',
  port: env.PORT || '8000',
};
