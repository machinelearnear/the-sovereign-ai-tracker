import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderToString } from 'react-dom/server';
import { KilledByLLM } from '../src/killedbyllm';
import React from 'react';

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Killed by LLM</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide-react"></script>
    <link rel="icon" type="image/svg+xml" href="./favicon.svg">
</head>
<body>
    <div id="root">
        <!-- SSR Content -->
    </div>

    <script src="./assets/<!-- Script Name -->"></script>
</body>
</html>
`;

const staticHtml = template.replace(
  '<!-- SSR Content -->',
  renderToString(React.createElement(KilledByLLM))
);

// Setup github asset directory
const assetsDir = path.join(__dirname, '../dist/assets');
const githubAssetsDir = path.join(__dirname, '../dist-github/assets');

if (!fs.existsSync(githubAssetsDir)) {
  fs.mkdirSync(githubAssetsDir, { recursive: true });
}

const jsFile = fs.readdirSync(assetsDir).find(file => file.endsWith('.js'));
const linkedStaticHtml = staticHtml.replace('<!-- Script Name -->', jsFile);

// Write to dist-github directory
fs.writeFileSync(
  path.join(__dirname, '../dist-github/index.html'),
  linkedStaticHtml
);

// Copy the assets
if (fs.existsSync(assetsDir)) {
  if (!fs.existsSync(githubAssetsDir)) {
    fs.mkdirSync(githubAssetsDir, { recursive: true });
  }

  fs.readdirSync(assetsDir).forEach(file => {
    fs.copyFileSync(
      path.join(assetsDir, file),
      path.join(githubAssetsDir, file)
    );
  });
} 