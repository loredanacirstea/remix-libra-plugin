module.exports = {
  SERVER_CONFIG: {
    host: 'localhost',
    port: 3000,
    cors: {
      origin: '*',
      methods: 'GET,POST',
    },
  },
  COMPILER_PATH: '../../libra/target/debug/compiler',
};
