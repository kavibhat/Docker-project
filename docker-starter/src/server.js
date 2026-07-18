// src/server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const quotes = [
  "Luxury is not a necessity to me, but beautiful things are.",
  "Travel is the only thing you buy that makes you richer.",
  "The world is a book. Those who do not travel read only one page.",
  "Welcome to Grand Residency — where every stay is a memory.",
  "Home is where the hotel is."
];

// Root route
app.get('/', (req, res) => {
  res.json({
    service: 'Grand Residency Quote API',
    version: '1.0.0',
    endpoints: ['/quote', '/health', '/info']
  });
});

// Random quote
app.get('/quote', (req, res) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({
    quote,
    timestamp: new Date().toISOString()
  });
});

// Health check — Kubernetes and Docker use this
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage().rss,
    timestamp: new Date().toISOString()
  });
});

// App info
app.get('/info', (req, res) => {
  res.json({
    node: process.version,
    env: process.env.NODE_ENV || 'development',
    port: PORT,
    hostname: require('os').hostname()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Quote API running globally inside container on port ${PORT}`);
  console.log(`Health Check Endpoint: http://localhost:${PORT}/health`);
});

module.exports = app;
