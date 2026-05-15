import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Fixed Readers — REST + MQTT product.
 */
const sidebars: SidebarsConfig = {
  fixedSidebar: [
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
      href: '/fixed/api-reference',
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
      href: '/fixed/mqtt-reference',
    },
    'troubleshooting',
  ],
};

export default sidebars;
