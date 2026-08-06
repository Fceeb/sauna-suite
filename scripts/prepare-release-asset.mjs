import { copyFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const expectedFileName = 'sauna-suite.js';
const distDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const distAsset = fileURLToPath(new URL(`../dist/${expectedFileName}`, import.meta.url));
const releaseAsset = fileURLToPath(new URL(`../${expectedFileName}`, import.meta.url));

function fail(message) {
  console.error(`Release asset verification failed: ${message}`);
  process.exit(1);
}

if (!existsSync(distDirectory)) {
  fail('dist directory is missing. Run npm run build first.');
}

const javascriptFiles = readdirSync(distDirectory).filter((fileName) => fileName.endsWith('.js'));
const unexpectedJavaScriptFiles = javascriptFiles.filter(
  (fileName) => fileName !== expectedFileName,
);

if (!existsSync(distAsset)) {
  fail(`dist/${expectedFileName} is missing.`);
}

if (unexpectedJavaScriptFiles.length > 0) {
  fail(`unexpected JavaScript build output: ${unexpectedJavaScriptFiles.join(', ')}`);
}

if (javascriptFiles.length !== 1) {
  fail(`expected exactly one JavaScript build output, found ${javascriptFiles.length}.`);
}

if (statSync(distAsset).size <= 0) {
  fail(`dist/${expectedFileName} is empty.`);
}

copyFileSync(distAsset, releaseAsset);

if (!existsSync(releaseAsset) || statSync(releaseAsset).size <= 0) {
  fail(`${basename(releaseAsset)} release asset would be empty.`);
}

console.log(`Prepared ${expectedFileName} for release upload.`);
