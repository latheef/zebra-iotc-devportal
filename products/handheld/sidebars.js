/**
 * CommonJS sidebar config for Docusaurus (generated from sidebars.ts)
 */

const sidebars = {
  handheldSidebar: [
    {
      type: 'category',
      label: 'Part I: Foundations',
      collapsible: true,
      collapsed: false,
      className: 'sidebar-section-header',
      items: [
        {
          type: 'category',
          label: '1. Introduction',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'foundations/introduction/about-iotc', label: '1.1 About Zebra IoT Connector' },
            { type: 'doc', id: 'foundations/introduction/supported-hardware', label: '1.2 Supported Hardware' },
            { type: 'doc', id: 'foundations/introduction/v1-1-features', label: '1.3 IOTC V1.1 Features' },
            { type: 'doc', id: 'foundations/introduction/documentation-guide', label: '1.4 How This Documentation Is Organized' },
            { type: 'doc', id: 'foundations/introduction/glossary', label: '1.5 Key Terminology & Glossary' },
          ],
        },
        {
          type: 'category',
          label: '2. System Architecture',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'foundations/architecture/end-to-end-system', label: '2.1 About the End-to-End System' },
            { type: 'doc', id: 'foundations/architecture/component-architecture', label: '2.2 About Component Architecture' },
            { type: 'doc', id: 'foundations/architecture/communication-flow', label: '2.3 About Communication Flow' },
            { type: 'doc', id: 'foundations/architecture/interface-model', label: '2.4 About the Interface Model' },
            { type: 'doc', id: 'foundations/architecture/handheld-considerations', label: '2.5 Handheld-Specific Considerations' },
          ],
        },
        {
          type: 'category',
          label: '3. MQTT Core Concepts',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'foundations/mqtt/mqtt-primer', label: '3.1 About MQTT 3.1.1' },
            { type: 'doc', id: 'foundations/mqtt/topic-hierarchy', label: '3.2 About Topic Hierarchy' },
            { type: 'doc', id: 'foundations/mqtt/qos-levels', label: '3.3 About QoS Levels' },
            { type: 'doc', id: 'foundations/mqtt/connection-lifecycle', label: '3.4 About Connection Lifecycle' },
            { type: 'doc', id: 'foundations/mqtt/auth-model', label: '3.5 About Authentication & Authorization' },
          ],
        },
      ],
    },

    {
      type: 'category',
      label: 'Part II: Getting Started',
      collapsible: true,
      collapsed: false,
      className: 'sidebar-section-header',
      items: [
        {
          type: 'category',
          label: '4. Prerequisites & Bootstrap',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'getting-started/prerequisites/requirements', label: '4.1 Hardware & Software Requirements' },
            { type: 'doc', id: 'getting-started/prerequisites/obtain-credentials', label: '4.2 How to Obtain Credentials' },
            { type: 'doc', id: 'getting-started/prerequisites/bootstrap-123rfid', label: '4.3 Reader Bootstrap with 123RFID Desktop' },
            { type: 'doc', id: 'getting-started/prerequisites/verify-firmware', label: '4.4 How to Verify Firmware Version' },
            { type: 'doc', id: 'getting-started/prerequisites/pair-bluetooth', label: '4.5 How to Pair via Bluetooth' },
          ],
        },
        {
          type: 'category',
          label: '5. Quick Start Tutorial',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'getting-started/quick-start/overview', label: '5.1 Quick Start Overview' },
            { type: 'doc', id: 'getting-started/quick-start/connect-broker', label: '5.2 Connect to the MQTT Broker' },
            { type: 'doc', id: 'getting-started/quick-start/discover-reader', label: '5.3 Discover Your Reader' },
            { type: 'doc', id: 'getting-started/quick-start/subscribe-data', label: '5.4 Subscribe to Tag Data Events' },
            { type: 'doc', id: 'getting-started/quick-start/start-operation', label: '5.5 Start an RFID Read Operation' },
            { type: 'doc', id: 'getting-started/quick-start/read-tags', label: '5.6 Read Your First Tags' },
            { type: 'doc', id: 'getting-started/quick-start/stop-operation', label: '5.7 Stop the Operation' },
            { type: 'doc', id: 'getting-started/quick-start/example-python', label: '5.8 Python Example' },
            { type: 'doc', id: 'getting-started/quick-start/example-nodejs', label: '5.9 Node.js Example' },
            { type: 'doc', id: 'getting-started/quick-start/example-csharp', label: '5.10 C# (.NET) Example' },
          ],
        },
      ],
    },

    // (rest of the sidebar omitted for brevity; full structure mirrors sidebars.ts)
  ],
};

module.exports = sidebars;
