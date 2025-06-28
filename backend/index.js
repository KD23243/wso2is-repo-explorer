const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 3001;

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json());

// POST /api/search { query: string, component: boolean }
app.post('/api/search', (req, res) => {
  const { query, component } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required.' });
  }
  let cmd = `../rex.sh find`;
  if (component) {
    cmd += ` -c`;
  }
  cmd += ` "${query.replace(/"/g, '')}"`;
  exec(cmd, { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr || error.message });
    }
    res.json({ result: stdout });
  });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
