import express from 'express';
// --------------------------------------

const app = express();
const port = 5000;

// start server
const startServer = () => {
  app.listen(port, console.log(`server started on port ${port}`));
};

startServer();
