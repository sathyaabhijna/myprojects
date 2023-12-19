const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Replace these values with your PostgreSQL connection details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Abhi62511!',
  port: 5432,
});

app.use(express.json());

app.post('/submit-form', async (req, res) => {
  try {
    const { name, age, email, phoneNumber, gender, isPaymentSelected, selectedBatches } = req.body;

    // Replace 'your_table' with your actual table name
    const query = `
      INSERT INTO yogaform (name, age, email, phone_number, gender, is_payment_selected, selected_batches)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [name, age, email, phoneNumber, gender, isPaymentSelected, selectedBatches];

    const result = await pool.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
