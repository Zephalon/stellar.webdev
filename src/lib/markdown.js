import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { getFiles } from './content';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

// add headline highlights
// ported verbatim from the CRA version: the closing tag gets an opening span as
// well, which the browser silently balances. Changing it would alter the gradient.
function addHeadlineHighlights(html) {
  let result_string = html;

  ['h1', 'h2', 'h3', 'h4'].forEach(tag => {
    result_string = result_string.replaceAll('<' + tag + '>', '<' + tag + '><span class="highlight">');
    result_string = result_string.replaceAll('</' + tag + '>', '<span class="highlight"></' + tag + '>');
  });

  return result_string;
}

export async function renderMarkdown(folder, file) {
  const markdown = await readFile(path.join(CONTENT_DIR, folder, file + '.md'), 'utf8');
  const result = await remark().use(remarkHtml).process(markdown);

  return addHeadlineHighlights(result.value.toString());
}

// all file contents keyed by id, rendered at build time
export async function getAllContentHtml() {
  const entries = await Promise.all(
    getFiles().map(async ({ folder, file }) => [file, await renderMarkdown(folder, file)])
  );

  return Object.fromEntries(entries);
}
