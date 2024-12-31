const express = require('express');
const path = require('path');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// WWW Redirect Middleware
app.use((req, res, next) => {
  const host = req.hostname;
  // Check if it's not a www subdomain and not localhost
  if (!host.startsWith('www.') && host !== 'localhost' && host !== '127.0.0.1') {
    return res.redirect(301, `https://www.${host}${req.originalUrl}`);
  }
  next();
});

// Security Headers
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.get('/', (req, res) => {
    res.send('HTTPS server is running!');
});

// HTTPS configuration
const httpsOptions = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
};

const PORT = process.env.PORT || 2003;
const server = https.createServer(httpsOptions, app);

server.listen(PORT, 'localhost', () => {
    console.log(`HTTPS Server running on https://localhost:${PORT}`);
});