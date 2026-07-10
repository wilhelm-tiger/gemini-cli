/**
 * NOTICE: This file has been modified for compliance with Open Source Web Clone Compliance (OSWCC) procedures.
 */
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Study Agent | Gemini CLI',
  tagline: 'Terminal-first, extensible, and powerful tool for developers.',
  favicon: 'img/favicon.ico',

  url: 'https://gemini.chiori.io',
  baseUrl: '/',
  organizationName: 'wilhelm-tiger',
  projectName: 'gemini-cli',

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    announcementBar: {
      id: 'compliance_banner',
      content:
        '⚠️ This is an unofficial clone of <a href="https://geminicli.com/docs/">geminicli.com/docs</a> published strictly for personal study and educational purposes. It is not affiliated with or endorsed by the original creators or project trademark owners.',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: false,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Gemini CLI',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/wilhelm-tiger/gemini-cli',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Original Content Copyright © ${new Date().getFullYear()} Gemini CLI. This study instance is hosted independently by wilhelm-tiger under Apache 2.0.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
