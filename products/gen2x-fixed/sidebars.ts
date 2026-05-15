import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Gen2x Fixed Readers — REST + MQTT product.
 */
const sidebars: SidebarsConfig = {
  gen2xFixedSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Overview',
    },
    'quick-start',
    {
      type: 'category',
      label: 'REST Guides',
      collapsed: true,
      items: ['rest/configuration', 'rest/management'],
    },
    {
      type: 'link',
      label: '🔗 REST API Reference',
      href: '/gen2x-fixed/api-reference',
    },
    {
      type: 'category',
      label: 'MQTT Guides',
      collapsed: true,
      items: ['mqtt/telemetry', 'mqtt/events'],
    },
    {
      type: 'link',
      label: '📡 MQTT API Reference',
      href: '/gen2x-fixed/mqtt-reference',
    },
    'troubleshooting',
  ],
};

export default sidebars;
