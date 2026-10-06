const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded form bodies
app.use(express.urlencoded({ extended: true }));

// In-memory data store for submissions
let items = [
  { id: 1, name: 'John Doe', email: 'john@example.com', date: new Date().toLocaleString() },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: new Date().toLocaleString() }
];

// GET: Render form and data table
app.get('/', (req, res) => {
  res.render('index', { items });
});

// POST: Handle form submission and add item to list
app.post('/add', (req, res) => {
  const { name, email } = req.body;
  if (name && email) {
    const newItem = {
      id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
      name: name.trim(),
      email: email.trim(),
      date: new Date().toLocaleString()
    };
    items.push(newItem);
  }
  res.redirect('/');
});

// POST: Handle item deletion
app.post('/delete/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(item => item.id !== itemId);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
