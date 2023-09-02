const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors'); // Import the cors package

const app = express();

// Enable CORS for all routes
app.use(cors());

// Define a proxy route for your GraphQL API
app.use(
  '/graphql', // Your proxy endpoint
  createProxyMiddleware({
    target: 'https://api.ouedkniss.com',
    changeOrigin: true,
    // You can add more options as needed
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
