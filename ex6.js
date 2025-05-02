const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Dummy users
const users = [
  { username: 'admin', password: '1234' },
  { username: 'Madhan', password: 'Kama@123' },
  { username: 'Tharun', password: '12345678' },
  { username: 'Yuvaraj', password: 'Yuva@2024' },
  { username: 'Ravi', password: 'Ravi@2025' },
  { username: 'Siva', password: 'Siva@2026' }
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Root redirect to login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'wtex6.html'));
});

// Serve index page (after successful login)
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'exp2.html'));
});

// Handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Redirect to index.html on success
    res.redirect('/index');
  } else {
    // Redirect back to login with error
    res.send(`
      <h2 style="text-align:center; color: red;">Invalid credentials. Please try again.</h2>
      <div style="text-align:center; margin-top:20px;">
        <a href="/login" style="color: blue; text-decoration: underline;">Back to Login</a>
      </div>
    `);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
