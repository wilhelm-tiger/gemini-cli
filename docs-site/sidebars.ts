import fs from 'fs';
import path from 'path';
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const docsDir = path.resolve(__dirname, '../docs');
const sidebarJsonPath = path.join(docsDir, 'sidebar.json');
const sidebarData = JSON.parse(fs.readFileSync(sidebarJsonPath, 'utf-8'));

function resolveDocId(slug: string): string {
  let baseId = slug;
  if (baseId.startsWith('docs/')) {
    baseId = baseId.substring(5);
  }
  if (slug === 'docs') {
    baseId = 'index';
  }
  if (baseId.endsWith('/')) {
    baseId = baseId.slice(0, -1);
  }

  if (baseId.toLowerCase() === 'contributing') return 'CONTRIBUTING';

  if (fs.existsSync(path.join(docsDir, `${baseId}.md`)) || fs.existsSync(path.join(docsDir, `${baseId}.mdx`))) {
    return baseId;
  }
  if (fs.existsSync(path.join(docsDir, baseId, 'index.md')) || fs.existsSync(path.join(docsDir, baseId, 'index.mdx'))) {
    return `${baseId}/index`;
  }
  if (fs.existsSync(path.join(docsDir, `${baseId.toUpperCase()}.md`))) {
    return baseId.toUpperCase();
  }
  
  return baseId;
}

function mapItem(item: any): any {
  if (item.slug) {
    if (item.slug.toLowerCase() === 'docs/contributing' || item.slug.toLowerCase() === 'contributing') {
      return {
        type: 'link',
        href: 'https://github.com/google/gemini-cli/blob/main/CONTRIBUTING.md',
        label: item.label,
      };
    }
    let id = resolveDocId(item.slug);
    if (id.toLowerCase() === 'contributing') id = 'CONTRIBUTING';
    return {
      type: 'doc',
      id: id,
      label: item.label,
    };
  }
  if (item.link) {
    return {
      type: 'link',
      href: item.link,
      label: item.label,
    };
  }
  if (item.items) {
    return {
      type: 'category',
      label: item.label,
      collapsed: item.collapsed ?? false,
      items: item.items.map(mapItem).filter(Boolean),
    };
  }
  return null;
}

let allItems: any[] = [];
sidebarData.forEach((tab: any) => {
  if (tab.items) {
    tab.items.forEach((category: any) => {
      const mapped = mapItem(category);
      if (mapped) {
        allItems.push(mapped);
      }
    });
  }
});

const sidebars: SidebarsConfig = {
  tutorialSidebar: allItems,
};

export default sidebars;
