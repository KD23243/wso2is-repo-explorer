const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
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

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
