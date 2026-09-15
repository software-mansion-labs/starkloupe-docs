import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Load environment variables from .env file
require('dotenv').config();

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const siteUrl = process.env.SITE_URL || 'https://docs.starkloupe.co/';
const config: Config = {
  title: 'Starkloupe docs',
  tagline: 'Starkloupe Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: siteUrl,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: 'Starkloupe is a transaction debugger and simulator for Starknet and custom networks. Step through transactions at the source level, verify smart contracts, and simulate execution.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:description',
        content: 'Starkloupe is a transaction debugger and simulator for Starknet and custom networks. Step through transactions at the source level, verify smart contracts, and simulate execution.',
      },
    },
  ],
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'software-mansion-labs', // Usually your GitHub org/user name.
  // projectName: 'starkloupe-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid', 'docusaurus-theme-openapi-docs'],
  plugins: [
    require.resolve('docusaurus-lunr-search'),
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'api-docs',
        routeBasePath: 'api',
        docItemComponent: '@theme/ApiItem',
        sidebarPath: './sidebarsApi.ts',
      },
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'API',
        docsPluginId: 'api',
        config: {
          starkloupeStarknet: {
            specPath: 'openapi/starkloupe-starknet-simulation.json',
            outputDir: 'api-docs/reference/starknet-simulation',
          },
        },
      },
    ],
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          docItemComponent: '@theme/ApiItem',
        },
        blog: false,

        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    headTags: [
      {
        tagName: 'meta',
        attributes: {
          name: 'description',
          content: 'Starkloupe is a transaction debugger and simulator for Starknet. Step through transactions at the source level, verify smart contracts, and simulate execution.',
        },
      },
      {
        tagName: 'meta',
        attributes: {
          property: 'og:description',
          content: 'Starkloupe is a transaction debugger and simulator for Starknet. Step through transactions at the source level, verify smart contracts, and simulate execution.',
        },
      },
      {
        tagName: 'meta',
        attributes: {
          property: 'og:image',
          content: `${siteUrl}img/metadata-preview.png`,
        },
      },
    ],
    metadata: [
      {
        name: 'type',
        content: 'website',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'image',
        content: 'img/metadata-preview.png',
      },
      {
        property: 'og:image',
        content: `${siteUrl}img/metadata-preview.png`,
      },
      {
        property: 'og:image:alt',
        content: 'Starkloupe logo',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '309',
      },
    ],
    navbar: {
      logo: {
        alt: 'Starkloupe logo',
        src: 'img/logos/starkloupe.svg',
        srcDark: 'img/logos/starkloupe_white.svg',
      },
      items: [
        {
          to: '/',
          label: 'Documentation',
          position: 'left',
          className: 'navbar-button',
          activeBaseRegex: '^(?!/api).*$',
        },
        {
          to: '/api/category/api-reference',
          label: 'API Reference',
          position: 'left',
          className: 'navbar-button',
          activeBasePath: '/api',
        },
        {
          href: 'https://github.com/software-mansion-labs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          html: `
          <div class='footer-wrapper'>
            <div class='footer-content'>
              <div class='footer-love'>
                Built with <span class='heart'>❤️</span> by
                <a href='https://walnut.dev/' target='_blank' rel="noopener noreferrer">Walnut</a>
              </div>
              <div class='footer-socials'>
                <a href="https://github.com/software-mansion-labs"
                   target='_blank'
                   rel="noopener noreferrer"
                   aria-label="GitHub"
                   class='social-link'>
                  <img class="social-icon" src="/img/github-logo.svg" alt="GitHub"/>
                </a>
                <a href="https://t.me/starkloupe"
                   target='_blank'
                   rel="noopener noreferrer"
                   aria-label="Telegram"
                   class='social-link'>
                  <img class="social-icon" src="/img/telegram-logo.svg" alt="Telegram"/>
                </a>
                <a href="https://x.com/swmansionxyz"
                   target='_blank'
                   rel="noopener noreferrer"
                   aria-label="Twitter"
                   class='social-link'>
                  <img class="social-icon" src="/img/twitter-logo.svg" alt="Twitter"/>
                </a>
              </div>
            </div>
          </div>`,
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      respectPrefersColorScheme: true, // Enables system preference
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
