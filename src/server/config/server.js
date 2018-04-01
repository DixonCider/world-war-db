const { env } = process;

export default {
  mongodbUri: env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fongmun',
  host: env.HOST || '192.168.2.227',
  port: env.PORT || '8000',
};
