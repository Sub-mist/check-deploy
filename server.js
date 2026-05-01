import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CheckDeploy Scan Server is running. Use the main app at http://localhost:5173');
});

// Helper to scan directory structure
function getDirectoryTree(dirPath, depth = 0) {
  if (depth > 3) return null; // Limit depth for safety/performance
  
  try {
    const stats = fs.statSync(dirPath);
    if (!stats.isDirectory()) return null;

    const files = fs.readdirSync(dirPath);
    const structure = {};

    files.forEach(file => {
      // Ignore heavy or hidden folders
      if (['node_modules', '.git', 'dist', '.vscode', '.next', '.astro'].includes(file)) {
        structure[file] = '[DIRECTORY]';
        return;
      }

      const fullPath = path.join(dirPath, file);
      const fileStats = fs.statSync(fullPath);

      if (fileStats.isDirectory()) {
        structure[file] = getDirectoryTree(fullPath, depth + 1);
      } else {
        structure[file] = '[FILE]';
      }
    });

    return structure;
  } catch (err) {
    return { error: 'Access denied or path not found' };
  }
}

app.post('/api/scan', (req, res) => {
  let { projectPath } = req.body;
  if (!projectPath) {
    return res.status(400).json({ error: 'projectPath is required' });
  }

  // Normalize path (handle Windows backslashes and trailing slashes)
  projectPath = path.resolve(projectPath.trim().replace(/['"]/g, ''));

  if (!fs.existsSync(projectPath)) {
    return res.status(404).json({ error: 'Path does not exist: ' + projectPath });
  }

  console.log(`Scanning: ${projectPath}`);
  const structure = getDirectoryTree(projectPath);
  res.json({ structure, scannedPath: projectPath });
});

app.listen(port, () => {
  console.log(`Scan server running at http://localhost:${port}`);
});
