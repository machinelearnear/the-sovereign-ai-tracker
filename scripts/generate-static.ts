import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { KilledByLLM } from '../src/killedbyllm';

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Killed by LLM</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide-react"></script>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
<body>
    <div id="app">
        <!-- SSR Content -->
    </div>
    <script>
        // Hydration script
        const searchInput = document.querySelector('input[type="search"]');
        const categorySelect = document.querySelector('select');
        
        function updateDisplay() {
            const searchTerm = searchInput?.value.toLowerCase() || '';
            const selectedCategory = categorySelect?.value || 'All';
            
            const benchmarkCards = document.querySelectorAll('.benchmark-card');
            benchmarkCards.forEach(card => {
                const name = card.querySelector('.benchmark-name')?.textContent?.toLowerCase() || '';
                const description = card.querySelector('.benchmark-description')?.textContent?.toLowerCase() || '';
                const creators = card.querySelector('.benchmark-creators')?.textContent?.toLowerCase() || '';
                const organization = card.querySelector('.benchmark-organization')?.textContent?.toLowerCase() || '';
                const category = card.querySelector('.benchmark-category')?.textContent || '';
                
                const matchesSearch = 
                    name.includes(searchTerm) ||
                    description.includes(searchTerm) ||
                    creators.includes(searchTerm) ||
                    organization.includes(searchTerm);
                    
                const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
                
                card.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
            });
        }

        searchInput?.addEventListener('input', updateDisplay);
        categorySelect?.addEventListener('change', updateDisplay);
    </script>
</body>
</html>
`;

const staticHtml = template.replace(
  '<!-- SSR Content -->',
  renderToString(<KilledByLLM />)
);

// Ensure dist directory exists
if (!fs.existsSync(path.join(__dirname, '../dist'))) {
  fs.mkdirSync(path.join(__dirname, '../dist'), { recursive: true });
}

fs.writeFileSync(
  path.join(__dirname, '../dist/index.html'),
  staticHtml
); 