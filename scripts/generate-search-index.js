/**
 * generate-search-index.js
 *
 * Crawls the Docusaurus build output and generates a JSON file
 * in the format expected by Microsoft Docfind.
 *
 * Output format:
 * [
 *   {
 *     "title": "Page Title",
 *     "category": "handheld",
 *     "href": "/handheld/quick-start",
 *     "body": "Page text content..."
 *   }
 * ]
 *
 * Usage: node scripts/generate-search-index.js
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const OUTPUT_FILE = path.resolve(__dirname, '..', 'search-documents.json');

function stripHtml(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>(.*?)<\/title>/i);
  if (match) {
    return match[1].replace(/\s*[|–—]\s*.*$/, '').trim();
  }
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (h1Match) {
    return h1Match[1].replace(/<[^>]+>/g, '').trim();
  }
  return 'Untitled';
}

function getCategory(filePath) {
  const relative = path.relative(BUILD_DIR, filePath).replace(/\\/g, '/');
  if (relative.startsWith('handheld/')) return 'handheld';
  if (relative.startsWith('fixed/')) return 'fixed';
  if (relative.startsWith('gen2x-fixed/')) return 'gen2x-fixed';
  if (relative.startsWith('docs/')) return 'docs';
  return 'general';
}

function getHref(filePath) {
  let relative = path.relative(BUILD_DIR, filePath).replace(/\\/g, '/');
  relative = relative.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  return '/' + relative;
}

function crawlDirectory(dir) {
  const documents = [];

  if (!fs.existsSync(dir)) {
    console.warn(`Build directory not found: ${dir}`);
    console.warn('Run "npm run build" first, then run this script.');
    return documents;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip assets, static files, and search directory
      if (['assets', 'img', 'search', '.docusaurus'].includes(entry.name)) {
        continue;
      }
      documents.push(...crawlDirectory(fullPath));
    } else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(fullPath, 'utf-8');
      const title = extractTitle(html);
      const body = stripHtml(html);

      // Skip very short pages (likely redirects or empty)
      if (body.length < 50) continue;

      documents.push({
        title,
        category: getCategory(fullPath),
        href: getHref(fullPath),
        body: body.substring(0, 5000), // Truncate to keep index size reasonable
      });
    }
  }

  return documents;
}

console.log('Generating search index...');
const documents = crawlDirectory(BUILD_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(documents, null, 2));
console.log(`Generated ${documents.length} documents → ${OUTPUT_FILE}`);
