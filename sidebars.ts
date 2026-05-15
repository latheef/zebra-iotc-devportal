import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Welcome',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started',
        {
          type: 'category',
          label: 'Information Architecture',
          items: [
            {
              type: 'doc',
              id: 'zebra-handheld-rfid-iotc-information-architecture',
              label: 'Overview',
            },
            {
              type: 'link',
              label: 'Part III: Infrastructure',
              href: '/docs/zebra-handheld-rfid-iotc-information-architecture#part-iii-infrastructure',
            },
            {
              type: 'link',
              label: 'Part IV: RFID Operations',
              href: '/docs/zebra-handheld-rfid-iotc-information-architecture#part-iv-rfid-operations',
            },
            {
              type: 'link',
              label: 'Part V: Observability & Events',
              href: '/docs/zebra-handheld-rfid-iotc-information-architecture#part-v-observability--events',
            },
            {
              type: 'link',
              label: 'Part VI: Fleet Operations',
              href: '/docs/zebra-handheld-rfid-iotc-information-architecture#part-vi-fleet-operations',
            },
            {
              type: 'link',
              label: 'Part VII: Reference & Troubleshooting',
              href: '/docs/zebra-handheld-rfid-iotc-information-architecture#part-vii-reference--troubleshooting',
            },
            {
              type: 'link',
              label: '16. MQTT API Reference',
              href: 'https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/',
            },
          ],
        },
      ],
    },
    'authentication',
    'glossary',
  ],
};

export default sidebars;
