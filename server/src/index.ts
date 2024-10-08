import http from 'http';

import { app } from '@/app';

const BASE_URL = 'http://localhost';
const PORT = 4242;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}:${PORT} ...`);
});
