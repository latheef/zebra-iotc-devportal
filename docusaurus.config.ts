import type { Config } from '@docusaurus/types';
import type { Options as ClassicPresetOptions, ThemeConfig } from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Zebra IoT Connector — Handheld RFID',
  tagline: 'MQTT API Documentation for RFD40 / RFD90 Series Handheld RFID Readers',
  favicon: 'img/zebra-favicon.ico',

  url: 'https://latheef.github.io',
  baseUrl: '/zebra-iotc/',

  organizationName: 'latheef',
  projectName: 'zebra-iotc',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./products/handheld/sidebars.js'),
          path: 'products/handheld',
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/latheef/zebra-iotc/tree/main/',
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies ClassicPresetOptions,
    ],
    // ——— AsyncAPI interactive docs (mtso/docusaurus-asyncapi) ———
    [
      'docusaurus-asyncapi',
      {
        specs: [
          {
            spec: './specs/handheld/asyncapi.yml',
            route: '/docs/reference/mqtt-api-interactive',
          },
        ],
        config: {
          show: {
            sidebar: true,
          },
        },
      },
    ],
  ],

  plugins: [],

  themeConfig: {
    image: 'img/zebra-social-card.png',
    metadata: [
      { name: 'og:site_name', content: 'Zebra IoT Connector — Handheld RFID Documentation' },
      { name: 'og:title', content: 'Zebra IoT Connector | Handheld RFID Developer Documentation' },
      { name: 'og:description', content: 'MQTT API documentation for Zebra RFD40/RFD90 handheld RFID reader sleds. Guides, API reference, and fleet management resources.' },
      { name: 'og:locale', content: 'en_US' },
      { name: 'twitter:title', content: 'Zebra IoT Connector — Handheld RFID Documentation' },
      { name: 'twitter:description', content: 'MQTT API documentation for Zebra handheld RFID readers.' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@ZebraTechnology' },
    ],
    navbar: {
      title: 'IoT Connector Docs',
      logo: {
        alt: 'Zebra Technologies Logo',
        src: 'img/zebra-logo-light.svg',
        srcDark: 'img/zebra-logo-dark.svg',
        href: '/',
        width: 'auto',
        height: '32px',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'handheldSidebar',
          label: 'Documentation',
          position: 'left',
        },
        {
          to: '/docs/reference/api-overview',
          label: 'API Reference',
          position: 'left',
        },
        {
          href: 'https://www.zebra.com/us/en/support-downloads.html',
          label: 'Support',
          position: 'right',
          target: '_blank',
        },
        {
          href: 'https://developer.zebra.com/community',
          label: 'Community',
          position: 'right',
          target: '_blank',
        },
        {
          href: 'https://developer.zebra.com',
          label: 'Developer Portal',
          position: 'right',
          target: '_blank',
          className: 'navbar-btn-filled',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Getting Started', to: '/docs/foundations/introduction/about-iotc' },
            { label: 'MQTT API Reference', href: 'https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/' },
            { label: 'Troubleshooting', to: '/docs/reference/troubleshooting' },
          ],
        },
        {
          title: 'Zebra Resources',
          items: [
            { label: 'Developer Portal', href: 'https://developer.zebra.com' },
            { label: 'Support', href: 'https://www.zebra.com/us/en/support-downloads.html' },
            { label: 'zebra.com', href: 'https://www.zebra.com' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: 'https://github.com/latheef/zebra-iotc' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/company/zebra-technologies' },
            { label: 'YouTube', href: 'https://www.youtube.com/@ZebraTechnologies' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Zebra Technologies Corporation and/or its affiliates. All rights reserved.`,
    },
    algolia: {
      appId: 'K938TH8OJ2',
      apiKey: '937ceb2bb24819a130272f1604412f35',
      indexName: 'Zebra Tech Docs',
      contextualSearch: true,
      searchParameters: {},
    },
    prism: {
      additionalLanguages: ['bash', 'json', 'yaml'],
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'forest' },
    },
  } satisfies ThemeConfig,
};

export default config;
