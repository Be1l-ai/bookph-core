#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function toCamelCase(name) {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.git')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const root = path.resolve(__dirname, '..');
const schemaPath = path.join(root, 'prisma', 'schema.prisma');
const schema = fs.readFileSync(schemaPath, 'utf8');
const modelRegex = /^model\s+([A-Za-z0-9_]+)\s*\{/gm;
const models = [];
let m;
while ((m = modelRegex.exec(schema))) models.push(m[1]);

const files = walk(root).filter(f => /\.(ts|tsx|js|json)$/i.test(f) && !f.includes('prisma/schema.prisma'));

const used = new Set();
const stats = {};

for (const model of models) {
  const camel = toCamelCase(model);
  const rxWord = new RegExp(`\\b${model}\\b`);
  const rxClient = new RegExp(`prisma\\.${camel}\\b`);
  stats[model] = { count: 0 };
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (rxClient.test(content) || rxWord.test(content)) {
      used.add(model);
      stats[model].count++;
      break;
    }
  }
}

const unused = models.filter(m => !used.has(m));
console.log('Models:', models.length);
console.log('Used:', used.size);
console.log('Unused:', unused.length);
console.log('\nUsed models:', Array.from(used).sort().join(', '));
console.log('\nUnused models:', unused.sort().join(', '));
