import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// Use environment variables for sensitive information
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

app.get('/user', (req, res) => {
  const userId = req.query.id;
  
  // Use parameterized query to prevent SQL injection
  const query = 'SELECT * FROM users WHERE id = ?';

  connection.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving user');
      return;
    }
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`App running on
