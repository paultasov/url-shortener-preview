require('dotenv').config();
const server = require('./app');

const PORT = process.env.PORT ?? 5000;

server
  .listen(PORT)
  .on('listening', () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
  });
