# Information Architecture: Zebra Handheld RFID Reader — IoT Connector (IOTC) V1.1

## Documentation Blueprint — Aligned with the Diátaxis Framework

**Version:** 1.0  
**Scope:** RFD40 / RFD90 Series Handheld RFID Reader Sleds  
**Protocol:** MQTT 3.1.1 (exclusive)  
**Firmware Baseline:** 3.10.27+  
**Date:** July 2025  
**Framework:** [Diátaxis](https://diataxis.fr/) (Tutorials · How-to guides · Reference · Explanation)

---

## Table of Contents


1. [Design Philosophy](#1-design-philosophy)
2. [Content-Type Taxonomy](#2-content-type-taxonomy)
3. [Audience & Persona Framework](#3-audience--persona-framework)
4. [Structural Principles](#4-structural-principles)
5. [Navigation Model](#5-navigation-model)
6. [Complete Table of Contents](#6-complete-table-of-contents)
    - [Part III: Infrastructure](#part-iii-infrastructure)
    - [Part IV: RFID Operations](#part-iv-rfid-operations)
    - [Part V: Observability & Events](#part-v-observability--events)
    - [Part VI: Fleet Operations](#part-vi-fleet-operations)
    - [Part VII: Reference & Troubleshooting](#part-vii-reference--troubleshooting)
7. [Page-Level Specifications](#7-page-level-specifications)
8. [API Reference Organization](#8-api-reference-organization)
9. [Cross-Referencing Strategy](#9-cross-referencing-strategy)
10. [Content Exclusions (Fixed-Reader-Only)](#10-content-exclusions-fixed-reader-only)
11. [Handheld-Specific Additions](#11-handheld-specific-additions)
12. [Appendix: Endpoint Inventory](#appendix-endpoint-inventory)

---

## 1. Design Philosophy

### 1.1 Core Thesis

This information architecture serves a single product surface — **Zebra's handheld RFID reader sleds (RFD40/RFD90) communicating over MQTT via the IoT Connector platform** — and must take a developer from zero context to production fleet operations through a dependency-chain-ordered, progressively disclosed documentation set.

Unlike fixed RFID readers (FXR90/FX9600), handheld sleds:

- Communicate **exclusively via MQTT 3.1.1** (no REST, WebSocket, or HTTP POST)
- Are **battery-powered** with lifecycle implications for connection management
- Pair to a **host mobile device via Bluetooth** (the sled is an accessory, not a standalone network device)
- Require **123RFID Desktop** (Windows) for initial bootstrap (region, Wi-Fi, MDM endpoint)
- Have a **single internal antenna** (no port selection, cable loss, or directionality settings)
- Support **physical trigger-based** start/stop of RFID operations
- Integrate with **MDM platforms** (SOTI Connect) as a primary provisioning path
- May include **barcode scanning** capability alongside RFID

These constraints shape every structural decision in this IA.

### 1.2 Governing Principles

| # | Principle | Rationale |
|---|-----------|-----------|
| 1 | **Dependency-chain ordering** | Content follows the developer's actual workflow: discover → connect → secure → route → operate → observe → manage → maintain. A reader cannot read tags before it is connected; it cannot be secured before it is discovered. |
| 2 | **Progressive disclosure** | Within every domain, start simple (getter/status check), then advance to configuration (setter), then edge cases. Tier 4 (trivial) endpoints appear first; Tier 1 (complex, multi-field) endpoints appear last within each group. |
| 3 | **Content-type discipline (Diátaxis)** | Every page is exactly **one** of the four Diátaxis content types: Tutorial, How-to guide, Reference, or Explanation. Mixed-type pages blur boundaries and defeat both navigation and search intent. |
| 4 | **MQTT-native framing** | All explanations assume MQTT. There is no "choose your protocol" decision tree. Topic patterns, QoS semantics, and pub/sub mechanics are first-class concepts, not protocol-specific branches. |
| 5 | **Explanation ↔ Reference pairing** | Every domain area (network, security, RFID operations, etc.) has both an Explanation chapter AND a corresponding API Reference section, cross-linked bidirectionally. This reflects Diátaxis's cognition axis: Explanation serves study (understanding *why*); Reference serves work (knowing *what*). |
| 6 | **Handheld-native voice** | Content addresses the handheld form factor directly — battery, Bluetooth, trigger, sled — rather than adapting fixed-reader content with caveats. |

---

## 2. Content-Type Taxonomy (Diátaxis)

This documentation adopts the [Diátaxis framework](https://diataxis.fr/), which identifies exactly four kinds of documentation based on two fundamental axes of craft:

- **Action / Cognition:** Does this content inform what the user *does*, or what the user *knows*?
- **Acquisition / Application:** Does this content serve the user's *study* (learning), or their *work* (doing)?

| | **Acquisition** (study) | **Application** (work) |
|---|---|---|
| **Action** (practical) | Tutorial | How-to guide |
| **Cognition** (theoretical) | Explanation | Reference |

Each page in the documentation MUST be classified as exactly one of these four content types. The type determines the page’s structure, voice, and what it may contain. **Mixing types within a single page is the most common cause of documentation failure** (Diátaxis: “blur”).

### 2.1 Tutorial — Learning-Oriented

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Provide a *learning experience* — the user acquires skills and confidence by doing something meaningful under guidance |
| **Axis** | Action × Acquisition — the user is at *study* |
| **Voice** | Collaborative first-person plural ("We will…", "Let's…"). The tutor is alongside the learner. |
| **Structure** | Goal statement ("In this tutorial, we will…") → Prerequisites → Numbered steps with visible results at every step → Narrative of expected output → Brief admiration of what was accomplished |
| **Contains** | Exact commands, runnable code, expected output at every step, screenshots |
| **Does NOT contain** | Extended explanations (link out), exhaustive option lists, choices or alternatives |
| **Key Di. principles** | Deliver visible results early and often; ruthlessly minimise explanation; focus on the concrete; aspire to perfect reliability; encourage repetition |
| **Language** | "In this tutorial, we will create…" "First, do x. Now, do y." "The output should look something like…" "Notice that…" |
| **Example titles** | "Read Your First Tag over MQTT", "Connect a Handheld Reader to a Cloud Broker" |

### 2.2 How-to Guide — Goal-Oriented

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Help an already-competent user accomplish a specific real-world task or solve a specific problem |
| **Axis** | Action × Application — the user is at *work* |
| **Voice** | Direct, task-oriented, conditional imperative ("To configure…, do X" / "If you need Y, do Z") |
| **Structure** | Problem/goal statement ("This guide shows you how to…") → Logical sequence of steps → Validation |
| **Contains** | Focused instructions, decision forks ("If this, then that"), configuration snippets |
| **Does NOT contain** | Extended explanations (link to Explanation), exhaustive API details (link to Reference), teaching |
| **Key Di. principles** | Address real-world complexity; omit the unnecessary; seek flow; pay attention to naming |
| **Title convention** | Titles MUST begin with "How to…" or clearly state the task as an action. Bad: "Wi-Fi Configuration". Good: "How to Configure Wi-Fi Profiles". |
| **Language** | "This guide shows you how to…" "If you want x, do y." "Refer to the Reference for a full list of options." |
| **Example titles** | "How to Configure TLS Certificates", "How to Set Up Fleet Provisioning with SOTI Connect" |

### 2.3 Reference — Information-Oriented

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Describe the machinery — provide complete, precise, lookup-oriented technical facts the user needs while working |
| **Axis** | Cognition × Application — the user is at *work* |
| **Voice** | Austere, neutral, propositional. No opinion, no instruction. |
| **Structure** | Mirrors the structure of the machinery itself: Interface → Endpoint → Field. Endpoint/field name → Type → Constraints → Default → Example |
| **Contains** | Full request/response schemas, field-by-field tables, enum value lists, error codes, usage examples |
| **Does NOT contain** | Extended explanations (link to Explanation), step-by-step procedures (link to How-to guides), teaching |
| **Key Di. principles** | Describe and only describe; adopt standard patterns; respect the structure of the machinery; provide examples |
| **Language** | State facts. List commands, options, limitations. Provide warnings where appropriate. |
| **Example titles** | "set_operating_mode Command Reference", "dataEVT Payload Schema" |

### 2.4 Explanation — Understanding-Oriented

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Deepen and broaden understanding — provide context, connections, background, and the *why* behind design decisions |
| **Axis** | Cognition × Acquisition — the user is at *study* |
| **Voice** | Discursive, reflective. May admit opinion and weigh alternatives. An implicit "About…" prefixes every title. |
| **Structure** | Context & motivation → Core concept → Why it works this way (design decisions, constraints, history) → Connections to related concepts → Alternatives considered |
| **Contains** | Diagrams, concept maps, analogy-based explanations, design rationale, trade-off discussions |
| **Does NOT contain** | Step-by-step instructions (link to How-to guides or Tutorials), API endpoint details (link to Reference) |
| **Key Di. principles** | Make connections; provide context; talk *about* the subject; admit opinion and perspective; keep explanation closely bounded |
| **Language** | "The reason for x is because historically, y…" "W is better than z, because…" "An x in this system is analogous to a y in…" |
| **Example titles** | "About MQTT Topic Hierarchy", "About the Event-Driven Architecture", "Why Handheld Readers Use MQTT Exclusively" |

### 2.5 The Diátaxis Compass (Content-Type Decision Tool)

When uncertain which type a page should be, apply the compass — two questions yield the answer:

| Question 1 | Question 2 | → Content Type |
|------------|------------|----------------|
| Informs **action** (what the user *does*) | **Acquisition** of skill (study) | → **Tutorial** |
| Informs **action** (what the user *does*) | **Application** of skill (work) | → **How-to guide** |
| Informs **cognition** (what the user *knows*) | **Application** of skill (work) | → **Reference** |
| Informs **cognition** (what the user *knows*) | **Acquisition** of skill (study) | → **Explanation** |

### 2.6 Content-Type Badge Convention

Every page displays a badge in its header indicating its type:

```
📗 TUTORIAL    📙 HOW-TO GUIDE    📕 REFERENCE    📘 EXPLANATION
```

---

## 3. Audience & Persona Framework

### 3.1 Primary Personas

| Persona | Role | Goal | Entry Point | Key Journeys |
|---------|------|------|-------------|--------------|
| **New Integrator** | IoT developer encountering Zebra RFID for the first time | Get a handheld reader connected and reading tags within 1 hour | Part I: Foundations → Part II: Getting Started | Quick Start → First Tag Read → Understanding Events |
| **Solution Builder** | Systems integrator designing a warehouse/retail RFID solution | Architect a multi-reader deployment with cloud data pipeline | Part I → Part III → Part IV → Part V | Architecture → RFID Operations → Cloud Integration → Fleet Management |
| **API Consumer** | Developer writing integration code against the MQTT API | Look up specific endpoint schemas, field constraints, error codes | Part VI: API Reference (direct entry) | Endpoint Reference → Payload Schemas → Error Codes |
| **Fleet Operator** | IT/operations engineer managing deployed reader populations | Provision, monitor, update, and troubleshoot readers at scale | Part V: Fleet Operations → Part VII: Troubleshooting | Fleet Provisioning → Monitoring → Firmware Updates → Diagnostics |

### 3.2 Persona-to-Content Mapping

```
                    Foundations  Getting Started  Infrastructure  RFID Ops  Observability  Fleet Ops  Reference  Troubleshoot
New Integrator      ████████     ████████████     ████            ████      ████           ░░░░       ████       ████
Solution Builder    ████████     ████████         ████████████    ████████  ████████       ████████   ████████   ████████
API Consumer        ████         ░░░░             ████            ████      ████           ████       ████████   ████
Fleet Operator      ████         ░░░░             ████████        ████      ████████████   ████████   ████████   ████████████

████ = Primary    ████ = Secondary    ░░░░ = Rarely needed
```

---

## 4. Structural Principles

### 4.1 Seven-Part Macro Structure

The documentation is organized into seven Parts, each corresponding to a phase of the developer journey:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Part I: FOUNDATIONS                                                │
│  Why does this exist? What is the system? How does MQTT work?      │
│  [Explanation]                                                      │
├─────────────────────────────────────────────────────────────────────┤
│  Part II: GETTING STARTED                                           │
│  What do I need? How do I get my first tag read?                   │
│  [Tutorial]                                                         │
├─────────────────────────────────────────────────────────────────────┤
│  Part III: INFRASTRUCTURE                                           │
│  Network, security, endpoint routing — the plumbing                │
│  [How-to guide + Explanation]                                       │
├─────────────────────────────────────────────────────────────────────┤
│  Part IV: RFID OPERATIONS                                           │
│  Reading tags, configuring RF, working with tag data               │
│  [How-to guide + Explanation]                                       │
├─────────────────────────────────────────────────────────────────────┤
│  Part V: OBSERVABILITY & EVENTS                                     │
│  Events, heartbeats, alerts, exception handling                    │
│  [How-to guide + Explanation]                                       │
├─────────────────────────────────────────────────────────────────────┤
│  Part VI: FLEET OPERATIONS                                          │
│  Provisioning, management, bulk config, cloud integration          │
│  [How-to guide]                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  Part VII: REFERENCE & TROUBLESHOOTING                              │
│  API reference, error codes, FAQ, diagnostics                      │
│  [Reference + How-to guide]                                         │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Dependency Chain

The Parts and chapters follow a strict dependency chain. Content in chapter N never references concepts introduced only in chapter N+1.

```
discover → bootstrap → connect → secure → route → operate → observe → manage → maintain
   │          │           │         │        │         │         │         │         │
  Ch 1-3    Ch 4-5      Ch 6      Ch 7     Ch 8     Ch 9-10   Ch 11    Ch 12-13  Ch 14
```

### 4.3 Within-Chapter Ordering: Getter Before Setter

Within any chapter covering both read and write operations:

1. **Status/discovery** commands first (`get_*`) — developer must see current state before changing it
2. **Configuration** commands second (`set_*`, `config_*`) — developer modifies state
3. **Destructive** commands last (`delete_*`, `reboot`) — developer cleans up or resets

### 4.4 Complexity Tiers (for API Reference ordering)

Each endpoint carries a complexity tier rating that governs its position within its functional group:

| Tier | Description | Appears | Examples |
|------|-------------|---------|----------|
| **T4** | Trivial — no payload or single-field response | First | `get_version`, `reboot`, `get_status` |
| **T3** | Simple — small well-understood payload | Second | `get_wifi`, `delete_wifi_profile`, `control_operation` |
| **T2** | Moderate — multi-field payload requiring domain knowledge | Third | `set_wifi`, `install_certificate`, `set_post_filter`, `config_events` |
| **T1** | Complex — large payload, interdependent fields, system-wide impact | Last | `set_operating_mode`, `set_config` |

---

## 5. Navigation Model

### 5.1 Primary Navigation (Left Sidebar)

The left sidebar presents the seven-part hierarchy. All Parts are always visible (collapsed). Expanding a Part reveals its chapters; expanding a chapter reveals its sections.

```
▸ Part I: Foundations
    ▸ 1. Introduction
    ▸ 2. System Architecture
    ▸ 3. MQTT Core Concepts
▸ Part II: Getting Started
    ▸ 4. Prerequisites & Bootstrap
    ▸ 5. Quick Start Tutorial
▸ Part III: Infrastructure
    ▸ 6. Network Configuration
    ▸ 7. Security & Certificates
    ▸ 8. MQTT Endpoint Routing
▸ Part IV: RFID Operations
    ▸ 9. Operating Modes & RF Configuration
    ▸ 10. Working with Tag Data
▸ Part V: Observability & Events
    ▸ 11. Event Architecture & Configuration
    ▸ 12. Monitoring & Diagnostics
▸ Part VI: Fleet Operations
    ▸ 13. Fleet Provisioning
    ▸ 14. Fleet Management & Bulk Configuration
    ▸ 15. Cloud Integration
▸ Part VII: Reference & Troubleshooting
    ▸ 16. MQTT API Reference
    ▸ 17. Error Codes & Exception Handling
    ▸ 18. Troubleshooting Guide
    ▸ 19. FAQ
    ▸ 20. Appendices
```

### 5.2 Secondary Navigation

| Element | Location | Purpose |
|---------|----------|---------|
| **Breadcrumbs** | Top of every page | Part > Chapter > Section — always visible |
| **On-this-page TOC** | Right sidebar | Section anchors within current page |
| **"Next / Previous"** | Bottom of every page | Sequential reading within a Part |
| **Cross-reference cards** | Inline, contextual | "📘 Learn more: [concept]" / "📕 API Reference: [endpoint]" |
| **Version selector** | Top bar | IOTC API version (V1.0, V1.1) |

### 5.3 Search Facets

Search results should be filterable by:

- **Content type** (Explanation / Tutorial / Reference / How-to guide)
- **Part** (I–VII)
- **Interface** (MGMT / CTRL / DATA / MDM)
- **Endpoint name** (for API Reference pages)

---

## 6. Complete Table of Contents

### Part I: Foundations

#### Chapter 1: Introduction
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 1.1 | About Zebra IoT Connector for Handheld RFID | 📘 Explanation | All |
| 1.2 | About Supported Hardware (RFD40 / RFD90 Series) | 📘 Explanation | New Integrator, Solution Builder |
| 1.3 | About IOTC V1.1 Features | 📘 Explanation | All |
| 1.4 | How This Documentation Is Organized | 📘 Explanation | All |
| 1.5 | Key Terminology & Glossary | 📕 Reference | All |

**1.1 — What is Zebra IoT Connector for Handheld RFID?**  
Positions the IOTC as the MQTT-based management and data plane for Zebra handheld RFID reader sleds. Explains the value proposition: remote configuration, real-time tag data streaming, and fleet management without physical access to devices. Distinguishes from fixed reader IOTC (different protocol surface, different hardware constraints). Introduces the three core interfaces: Management (MGMT), Control (CTRL), and Data (DATA).

**1.2 — Supported Hardware**  
Catalog of supported reader sled models (RFD40 Premium, RFD40 Standard, RFD90). Hardware capability matrix: RFID frequency bands, Bluetooth version, barcode scanning, battery capacity, supported host devices. Minimum firmware version (3.10.27). Physical form factor diagram with antenna location, trigger button, charging contacts.

**1.3 — IOTC V1.1 Feature Overview**  
What's new in V1.1 vs V1.0. Feature matrix showing which endpoints/events were added or modified. Migration notes for V1.0 users.

**1.4 — How This Documentation Is Organized**  
Meta-navigation guide. Explains the seven Parts, content-type badges, and recommended reading paths for each persona. "If you want to [goal], start at [chapter]" quick-reference table.

**1.5 — Key Terminology & Glossary**  
Alphabetical reference of all domain-specific terms used across the documentation: tenant ID, channel, serial number, operating mode, post-filter, endpoint (MQTT sense vs API sense), sled, host device, MDM, tag population, singulation, session, etc.

---

#### Chapter 2: System Architecture
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 2.1 | About the End-to-End System | 📘 Explanation | All |
| 2.2 | About Component Architecture | 📘 Explanation | Solution Builder |
| 2.3 | About Communication Flow: Reader ↔ IOTC ↔ Application | 📘 Explanation | Solution Builder, API Consumer |
| 2.4 | About the Interface Model: MGMT, CTRL, DATA, MDM | 📘 Explanation | All |
| 2.5 | About Handheld-Specific Architecture Considerations | 📘 Explanation | Solution Builder |

**2.1 — End-to-End System Overview**  
High-level architecture diagram showing: RFID Tags ↔ Reader Sled (RFD40/RFD90) ↔ Bluetooth ↔ Host Mobile Device ↔ Wi-Fi/Cellular ↔ MQTT Broker (Zebra Cloud or Customer Broker) ↔ Application Backend. Explains the role of each component. Emphasizes that the reader sled reaches the network *through* the host device — it is not a standalone network endpoint.

**2.2 — Component Architecture**  
Detailed breakdown:
- **Reader Firmware (IOTC Agent):** Runs on the sled, implements MQTT client, manages RFID radio
- **MQTT Broker:** Zebra-hosted or customer-provided, routes messages between reader and application
- **Application Client:** Customer's MQTT subscriber/publisher that sends commands and receives data
- **123RFID Desktop:** Windows utility for initial reader bootstrap (region, Wi-Fi, MDM endpoint)
- **MDM Platform (SOTI Connect):** Optional enterprise management layer for fleet provisioning

**2.3 — Communication Flow**  
Sequence diagrams for the three primary flows:
1. **Command-Response:** Application publishes command → Reader subscribes, processes, publishes response
2. **Event Streaming:** Reader detects condition → Publishes event → Application subscribes and processes
3. **Tag Data Streaming:** Reader reads tags → Publishes tag data events → Application consumes

Topic direction conventions: which topics the application publishes to vs subscribes to. QoS expectations per flow type.

**2.4 — Interface Model**  
Explains the four MQTT interfaces and their distinct responsibilities:

| Interface | Topic Segment | Direction | Purpose |
|-----------|---------------|-----------|---------|
| **MGMT** | `/mgmt/` | Bidirectional | Device lifecycle: identity, network, security, firmware, config |
| **CTRL** | `/ctrl/` | Bidirectional | RFID radio operations: mode, filters, start/stop |
| **DATA** | `/data1event/`, `/data2event/` | Reader → App | Tag data streaming (two channels for load distribution) |
| **MDM** | `/mdm/` | Bidirectional | Enterprise MDM integration (SOTI Connect) |

Each interface's topic pattern: `{tenantId}/{interface}/clients/{channel}/{deviceSerial}`

**2.5 — Handheld-Specific Architecture Considerations**  
Key architectural differences from fixed readers:
- **Bluetooth dependency:** Reader ↔ host device link is Bluetooth, adding latency and connection fragility considerations
- **Battery power:** Persistent MQTT connections drain battery; strategies for connection lifecycle management
- **Single antenna:** No antenna port selection; all RF parameters apply to the single internal antenna
- **Host device as network gateway:** The reader doesn't have its own IP stack visible to the broker — the host device's network is the path to MQTT
- **Trigger integration:** Physical trigger button maps to `control_operation` start/stop commands

---

#### Chapter 3: MQTT Core Concepts
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 3.1 | About MQTT 3.1.1 | 📘 Explanation | New Integrator |
| 3.2 | About Topic Hierarchy & Naming Conventions | 📘 Explanation | All |
| 3.3 | About QoS Levels & Delivery Guarantees | 📘 Explanation | Solution Builder |
| 3.4 | About Connection Lifecycle & Keep-Alive | 📘 Explanation | Solution Builder |
| 3.5 | About the Authentication & Authorization Model | 📘 Explanation | Solution Builder |

**3.1 — MQTT 3.1.1 Primer**  
For developers unfamiliar with MQTT: publish/subscribe model, topics, brokers, clients, retained messages, last will and testament (LWT). Just enough to understand the IOTC API — not an MQTT textbook. Links to official MQTT specification for depth.

**3.2 — Topic Hierarchy & Naming Conventions**  
Complete topic taxonomy for handheld readers:

```
{tenantId}/mgmt/clients/{channel}/{deviceSerial}        ← Management commands
{tenantId}/ctrl/clients/{channel}/{deviceSerial}         ← Control commands
{tenantId}/data1event/clients/{channel}/{deviceSerial}   ← Tag data stream 1
{tenantId}/data2event/clients/{channel}/{deviceSerial}   ← Tag data stream 2
{tenantId}/mdm/clients/{channel}/{deviceSerial}          ← MDM integration
```

Field definitions: tenantId (how to obtain), channel (client identifier), deviceSerial (reader serial number — where to find it physically and programmatically). Wildcard subscription patterns for fleet scenarios.

**3.3 — QoS Levels & Delivery Guarantees**  
QoS 0 (at most once) vs QoS 1 (at least once) behavior in the IOTC context. Which message types use which QoS level. Implications for tag data: potential duplicates at QoS 1, potential loss at QoS 0. Recommendations per use case.

**3.4 — Connection Lifecycle & Keep-Alive**  
MQTT connection establishment, keep-alive negotiation, clean session semantics. How the reader's MQTT client behaves during Bluetooth disconnection from host device. Reconnection behavior. Battery implications of keep-alive interval settings.

**3.5 — Authentication & Authorization Model**  
How the IOTC authenticates MQTT connections: username/password, TLS client certificates, or both. Tenant-scoped access model. How to obtain credentials from the Zebra portal or MDM platform.

---

### Part II: Getting Started

#### Chapter 4: Prerequisites & Bootstrap
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 4.1 | Hardware & Software Requirements | 📕 Reference | New Integrator |
| 4.2 | How to Obtain IOTC Credentials & Tenant ID | 📙 How-to guide | New Integrator |
| 4.3 | Reader Bootstrap with 123RFID Desktop | 📗 Tutorial | New Integrator |
| 4.4 | How to Verify Reader Firmware Version | 📙 How-to guide | New Integrator |
| 4.5 | How to Pair the Reader Sled via Bluetooth | 📙 How-to guide | New Integrator |

**4.1 — Hardware & Software Requirements**  
Checklist of everything needed before starting:
- Reader sled (RFD40 or RFD90) with firmware ≥ 3.10.27
- Host mobile device (Android — supported models list)
- 123RFID Desktop (Windows 10/11) for initial bootstrap
- USB cable for 123RFID Desktop connection
- MQTT client for testing (mosquitto_pub/sub, MQTT Explorer, or custom)
- Wi-Fi network with internet access
- IOTC tenant credentials

**4.2 — How to Obtain Credentials**  
Step-by-step how-to guide for registering on the Zebra developer portal, creating an IOTC tenant, and obtaining the tenant ID, MQTT username, and MQTT password. Screenshots of the portal UI.

**4.3 — Reader Bootstrap with 123RFID Desktop**  
Tutorial: Connect reader via USB → Launch 123RFID Desktop → Set region/country code → Configure Wi-Fi profile → Set MDM endpoint URL → Apply configuration → Disconnect USB. Emphasizes that **region configuration can only be done through 123RFID Desktop, not via MQTT**.

**4.4 — Verifying Firmware Version**  
Two methods: (1) Via 123RFID Desktop during bootstrap, (2) Via MQTT `get_version` command after connection. How to update firmware if below 3.10.27.

**4.5 — How to Pair via Bluetooth**  
How-to guide for pairing the reader sled with a host mobile device. Covers: initial pairing, reconnection behavior, multiple host device scenarios, troubleshooting common pairing failures.

---

#### Chapter 5: Quick Start Tutorial
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 5.1 | Quick Start Overview | 📗 Tutorial | New Integrator |
| 5.2 | Step 1: Connect to the MQTT Broker | 📗 Tutorial | New Integrator |
| 5.3 | Step 2: Discover Your Reader | 📗 Tutorial | New Integrator |
| 5.4 | Step 3: Subscribe to Tag Data Events | 📗 Tutorial | New Integrator |
| 5.5 | Step 4: Start an RFID Read Operation | 📗 Tutorial | New Integrator |
| 5.6 | Step 5: Read Your First Tags | 📗 Tutorial | New Integrator |
| 5.7 | Step 6: Stop the Operation | 📗 Tutorial | New Integrator |
| 5.8 | Quick Start: Python Example | 📗 Tutorial | New Integrator |
| 5.9 | Quick Start: Node.js Example | 📗 Tutorial | New Integrator |
| 5.10 | Quick Start: C# (.NET) Example | 📗 Tutorial | New Integrator |

**5.1 through 5.7** — A linear, zero-to-first-tag-read tutorial that takes the developer through the minimum viable path:

```
Connect to broker
    → Subscribe to mgmt response topic
    → Publish get_version → Verify reader identity
    → Subscribe to data1event topic
    → Publish set_operating_mode (simple inventory)
    → Publish control_operation (start)
    → Observe tag data flowing in
    → Publish control_operation (stop)
```

Each step shows the exact MQTT topic, the exact JSON payload, and the expected response. Uses `mosquitto_pub`/`mosquitto_sub` as the universal baseline tool.

**5.8–5.10** — Complete runnable programs in three languages that implement the Quick Start flow end-to-end. Each is a single-file program with inline comments. Uses the Paho MQTT client library (Python, C#) or mqtt.js (Node.js).

---

### Part III: Infrastructure

#### Chapter 6: Network Configuration
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 6.1 | About Network Architecture for Handheld Readers | 📘 Explanation | Solution Builder |
| 6.2 | How to Configure Wi-Fi Profiles | 📙 How-to guide | Solution Builder, Fleet Operator |
| 6.3 | How to Check Ethernet Status (Cradle-Connected) | 📙 How-to guide | Solution Builder |
| 6.4 | How to Troubleshoot Network Issues | 📙 How-to guide | Fleet Operator |

**6.1 — About Network Architecture**  
Explanation of the handheld reader's network path: Reader → Bluetooth → Host Device → Wi-Fi/Cellular → Internet → MQTT Broker. Explains when the reader uses its own Wi-Fi radio (direct) vs the host device's network (relayed). Network topology diagrams for common deployment scenarios: warehouse with enterprise Wi-Fi, retail store, field operations.

**6.2 — How to Configure Wi-Fi Profiles**  
How-to guide for managing Wi-Fi profiles on the reader via MQTT:
- **View current configuration:** `get_wifi` command — fields, response interpretation
- **Set Wi-Fi profile:** `set_wifi` command — SSID, security type (WPA2-PSK, WPA2-Enterprise, EAP-TLS), credentials, priority
- **Delete a profile:** `delete_wifi_profile` command
- **Multiple profiles:** Priority ordering, fallback behavior

Cross-references: §7.2 for certificate-based Wi-Fi (EAP-TLS), §16 for full endpoint schemas.

**6.3 — How to Check Ethernet Status**  
How-to guide for checking Ethernet configuration via `get_eth` when the reader is docked in a charging cradle with Ethernet. Read-only status inspection (Ethernet config on handheld readers is typically set via cradle infrastructure, not MQTT).

**6.4 — How to Troubleshoot Network Issues**  
Common network issues: Wi-Fi association failures, DHCP problems, DNS resolution, firewall rules for MQTT (port 1883/8883). Diagnostic approach using `get_wifi`, `get_status`, and `heartBeatEVT` analysis.

---

#### Chapter 7: Security & Certificates
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 7.1 | About the Security Model | 📘 Explanation | Solution Builder |
| 7.2 | How to Manage TLS/SSL Certificates | 📙 How-to guide | Solution Builder, Fleet Operator |
| 7.3 | How to Rotate Certificates at Scale | 📙 How-to guide | Fleet Operator |
| 7.4 | How to Secure the MQTT Connection with TLS | 📙 How-to guide | Solution Builder |

**7.1 — About the Security Model**  
Explanation of the layered security model:
1. **Transport layer:** TLS 1.2+ encryption of the MQTT connection
2. **Authentication layer:** MQTT username/password or TLS client certificate
3. **Authorization layer:** Tenant-scoped topic access control
4. **Device identity:** Serial number as device identifier within topic hierarchy

Threat model summary: what the security model protects against (eavesdropping, unauthorized commands, device spoofing) and what it does not (physical device access, Bluetooth interception between reader and host).

**7.2 — How to Manage TLS/SSL Certificates**  
How-to guide for managing certificates on the reader:
- **View installed certificates:** `get_installed_certificate` — certificate types, expiration, subject/issuer
- **Install a certificate:** `install_certificate` — certificate format (PEM, PKCS12), upload mechanism (base64-encoded in payload), certificate types (CA, client)
- **Delete a certificate:** `delete_certificate` — by certificate identifier

Important operational notes: certificate installation requires the reader to have network connectivity; certificates persist across reboots; certificate rotation strategy for fleet.

**7.3 — How to Rotate Certificates at Scale**  
Operational how-to guide for certificate management at scale: monitoring expiration via events, automated rotation patterns, handling certificate installation failures.

**7.4 — How to Secure the MQTT Connection with TLS**  
End-to-end how-to guide: obtaining broker CA certificate → installing on reader → configuring MQTT endpoint for TLS → verifying encrypted connection. Covers both Zebra-hosted broker (pre-configured) and customer-provided broker (manual setup).

---

#### Chapter 8: MQTT Endpoint Routing
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 8.1 | About MQTT Endpoint Configuration | 📘 Explanation | Solution Builder |
| 8.2 | How to View Endpoint Configuration | 📙 How-to guide | All |
| 8.3 | How to Configure MQTT Endpoints | 📙 How-to guide | Solution Builder |
| 8.4 | About Multi-Endpoint Architectures | 📘 Explanation | Solution Builder |

**8.1 — About MQTT Endpoint Configuration**  
What "endpoint" means in the IOTC context: the MQTT broker connection target (host, port, TLS, credentials). Explains the three endpoint types:
- **MDM Endpoint:** For enterprise management platform integration (SOTI Connect)
- **CTRL Endpoint:** For RFID control commands and responses
- **DATA Endpoint:** For tag data event streaming (can be separate broker for data isolation)

Why you might want different endpoints for different interfaces (e.g., management traffic to enterprise broker, tag data to cloud IoT platform).

**8.2 — How to View Endpoint Configuration**  
How-to guide for using `get_endpoint_config` to inspect current MQTT endpoint settings for each interface. Field-by-field explanation of the response.

**8.3 — How to Configure MQTT Endpoints**  
How-to guide for using `config_endpoint` to set broker host, port, TLS settings, and credentials for each endpoint type. Configuration validation, common errors, and rollback behavior.

**8.4 — About Multi-Endpoint Architectures**  
Explanation of patterns for advanced deployments:
- Single broker for all interfaces (simplest)
- Separate data broker (tag data isolation for high-throughput scenarios)
- MDM-managed endpoint (SOTI Connect controls MQTT routing)

---

### Part IV: RFID Operations

#### Chapter 9: Operating Modes & RF Configuration
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 9.1 | About RFID Operating Modes | 📘 Explanation | All |
| 9.2 | How to Configure the Operating Mode | 📙 How-to guide | Solution Builder |
| 9.3a | About Post-Filters (Tag Filtering) | 📘 Explanation | Solution Builder |
| 9.3b | How to Configure Post-Filters | 📙 How-to guide | Solution Builder |
| 9.4 | How to Start and Stop RFID Operations | 📙 How-to guide | All |
| 9.5 | About Trigger-Based Operations | 📘 Explanation | Solution Builder |

**9.1 — About RFID Operating Modes**  
Explanation of operating modes available on handheld readers:
- **Simple Inventory:** Basic tag reading — EPC only, fastest throughput
- **Inventory with RSSI:** Tag reading with signal strength — for proximity/location estimation
- **Inventory with TID:** Tag reading with TID memory bank — for tag authentication/identification
- **Tag Locationing:** Geiger-counter-style mode for finding specific tags

What each mode returns in the tag data event payload. When to use which mode. Relationship between operating mode and battery consumption.

**9.2 — How to Configure the Operating Mode**  
How-to guide for using `set_operating_mode`:
- View current mode: `get_operating_mode` (start here)
- Set mode: `set_operating_mode` with configuration fields
- Field-by-field walkthrough of the payload for each mode type
- Common configurations with example payloads
- Validation rules and error responses

This is a T1 (complex) endpoint — the guide progressively builds from the simplest configuration (simple inventory, minimal fields) to the most complex (full RF parameter customization).

**9.3a — About Post-Filters**  
What are post-filters? RFID tag-level filters that select which tags are reported based on EPC pattern matching. Use cases: reading only tags with a specific company prefix, excluding known infrastructure tags.

**9.3b — How to Configure Post-Filters**  
Using `get_post_filter` to view current filter configuration. Using `set_post_filter` to configure inclusion/exclusion filters by EPC pattern, offset, and length.

**9.4 — How to Start and Stop RFID Operations**  
How-to guide for `control_operation` — the command that starts and stops RFID reads:
- Start inventory operation
- Stop inventory operation
- Operation state transitions
- Error handling (starting when already running, stopping when already stopped)

**9.5 — About Trigger-Based Operations**  
Explanation of how the physical trigger button on the reader sled maps to `control_operation` start/stop. Trigger modes: press-to-start/release-to-stop, toggle, continuous. How trigger events interact with MQTT-initiated operations.

---

#### Chapter 10: Working with Tag Data
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 10.1 | About Tag Data Event Architecture | 📘 Explanation | All |
| 10.2 | Understanding the dataEVT Payload | 📕 Reference | API Consumer |
| 10.3 | How to Interpret Tag Data Fields | 📙 How-to guide | Solution Builder, API Consumer |
| 10.4 | About Dual Data Channels (data1event / data2event) | 📘 Explanation | Solution Builder |
| 10.5 | How to Process Tag Data in Your Application | 📙 How-to guide | Solution Builder |

**10.1 — Tag Data Event Architecture**  
How tag data flows from RF antenna → reader firmware → MQTT broker → application. Event generation rate factors: tag population density, operating mode, RF power, post-filters. Deduplication considerations.

**10.2 — dataEVT Payload**  
Complete reference for the `dataEVT` payload schema:
- Every field: name, type, description, possible values, presence conditions
- Payload variations by operating mode (which fields appear in which mode)
- Example payloads for each operating mode
- Timestamp format and timezone handling

**10.3 — How to Interpret Tag Data Fields**  
How-to guide for interpreting tag data for business logic:
- EPC decoding (hex string → binary → GS1 standard decode)
- RSSI interpretation (signal strength → distance estimation caveats)
- TID memory bank contents
- Phase angle data usage
- Tag seen count and first/last seen timestamps

**10.4 — About Dual Data Channels**  
Explanation of why there are two data event topics (`data1event`, `data2event`). Use cases for channel separation: load balancing across consumers, separating high-priority from bulk tag data. Configuration via `config_events`.

**10.5 — How to Process Tag Data in Your Application**  
How-to guide covering common application-side patterns:
- Deduplication strategies (time-window, count-based)
- Buffering and batching for database writes
- Real-time alerting on specific EPCs
- Integration with inventory management systems

---

### Part V: Observability & Events

#### Chapter 11: Event Architecture & Configuration
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 11.1 | About the Event Model | 📘 Explanation | All |
| 11.2 | Event Types Reference | 📕 Reference | API Consumer |
| 11.3 | How to Configure Event Reporting | 📙 How-to guide | Solution Builder |
| 11.4 | About Heartbeat Events | 📘 Explanation | Solution Builder, Fleet Operator |
| 11.5 | About Alert Events | 📘 Explanation | Fleet Operator |
| 11.6 | About Exception Events | 📘 Explanation | Fleet Operator |
| 11.7 | About MQTT Connection Events | 📘 Explanation | Fleet Operator |

**11.1 — About the Event Model**  
Architecture of the IOTC event system. Six event types, their generation triggers, and their intended consumers:

| Event | Trigger | Primary Consumer |
|-------|---------|-----------------|
| `dataEVT` | Tag read during active operation | Application backend |
| `heartBeatEVT` | Periodic timer (configurable interval) | Fleet monitoring |
| `alerts` | Threshold breach or state change | Operations dashboard |
| `alert_short` | MDM-optimized alert summary | MDM platform (SOTI) |
| `exceptionEVT` | Error condition | Diagnostics / alerting |
| `mqttConnEVT` | MQTT connection state change | Fleet monitoring |

Event lifecycle: generation → queuing → publishing → delivery confirmation (QoS-dependent).

**11.2 — Event Types Reference**  
Complete reference for all six event types: topic pattern, payload schema, field tables, example payloads, QoS level. This is the definitive lookup page for event payloads.

**11.3 — How to Configure Event Reporting**  
How-to guide for using `config_events` to control:
- Which events are enabled/disabled
- Heartbeat interval
- Alert thresholds
- Data event channel assignment (data1event vs data2event)
- Event payload verbosity (full vs compact)

**11.4 — About Heartbeat Events**  
What the heartbeat contains: device status, battery level, connection quality, operating state, temperature. How to use heartbeats for fleet health dashboards. Recommended heartbeat interval for battery conservation vs monitoring granularity trade-off.

**11.5 — About Alert Events**  
Types of alerts: battery low, battery critical, temperature threshold, connection quality degradation, RFID operation failure. Alert vs alert_short: `alerts` is the full payload for application consumption; `alert_short` is the MDM-optimized summary for SOTI Connect. Alert suppression and de-bounce behavior.

**11.6 — About Exception Events**  
Exception event semantics: what constitutes an exception (vs an alert), exception severity levels, common exception codes and their meanings. Guide to building exception-driven alerting.

**11.7 — About MQTT Connection Events**  
The `mqttConnEVT` event fires when the reader's MQTT connection state changes (connected, disconnected, reconnecting). Use cases: detecting reader offline status for fleet dashboards, triggering reconnection workflows.

---

#### Chapter 12: Monitoring & Diagnostics
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 12.1 | How to Check Device Status & Health | 📙 How-to guide | Fleet Operator |
| 12.2 | How to Monitor Battery Lifecycle | 📙 How-to guide | Fleet Operator |
| 12.3 | How to Monitor Connection Quality | 📙 How-to guide | Fleet Operator |
| 12.4 | How to Build a Fleet Health Dashboard | 📙 How-to guide | Solution Builder |

**12.1 — How to Check Device Status & Health**  
How-to guide for using `get_status` for on-demand health checks. Status fields: operating state, connection state, battery level, temperature, firmware version, uptime. Combining `get_status` with `heartBeatEVT` for comprehensive monitoring.

**12.2 — How to Monitor Battery Lifecycle**  
Handheld-specific how-to guide: battery level reporting in heartbeat events, battery low/critical alert thresholds, battery drain patterns by operating mode, operational recommendations for battery-constrained deployments.

**12.3 — How to Monitor Connection Quality**  
Monitoring Wi-Fi signal strength, Bluetooth link quality, MQTT connection stability. Using `heartBeatEVT` and `mqttConnEVT` to build connection quality timelines. Common patterns indicating environment issues (RF interference, AP roaming, Bluetooth range limits).

**12.4 — How to Build a Fleet Health Dashboard**  
Solution-oriented how-to guide: subscribing to heartbeat events with wildcard topics for all readers in a tenant, aggregating status into a dashboard (example with common platforms: Grafana, Azure IoT Central, AWS IoT Core). Key metrics to display: online/offline count, battery levels, active operations, alert counts.

---

### Part VI: Fleet Operations

#### Chapter 13: Fleet Provisioning
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 13.1 | About Provisioning Models | 📘 Explanation | Solution Builder, Fleet Operator |
| 13.2 | How to Set Up Zero-Touch Provisioning with SOTI Connect | 📙 How-to guide | Fleet Operator |
| 13.3 | How to Provision Readers in Bulk with 123RFID Desktop | 📙 How-to guide | Fleet Operator |
| 13.4 | How to Automate Provisioning Workflows | 📙 How-to guide | Solution Builder |

**13.1 — About Provisioning Models**  
Three provisioning approaches for handheld readers:
1. **Manual (123RFID Desktop):** USB connection, one reader at a time — suitable for small deployments
2. **MDM-Managed (SOTI Connect):** Zero-touch provisioning via MDM platform — suitable for enterprise fleet
3. **Hybrid:** 123RFID Desktop for initial bootstrap + MQTT for subsequent configuration

Decision tree: which model for which deployment scale and organizational context.

**13.2 — How to Set Up Zero-Touch Provisioning with SOTI Connect**  
How-to guide for configuring SOTI Connect for reader fleet provisioning: MDM endpoint configuration, device enrollment, configuration profile distribution, firmware update orchestration. Covers the MDM interface topics and `alert_short` event.

**13.3 — How to Provision Readers in Bulk with 123RFID Desktop**  
How-to guide for using 123RFID Desktop for provisioning multiple readers: creating configuration profiles, batch application, exporting/importing profiles.

**13.4 — How to Automate Provisioning Workflows**  
How-to guide for building automated provisioning workflows: detecting new readers via `mqttConnEVT`, applying initial configuration via `set_config`, verifying configuration via `get_config`, promoting to production fleet.

---

#### Chapter 14: Fleet Management & Bulk Configuration
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 14.1 | About Bulk Configuration | 📘 Explanation | Fleet Operator |
| 14.2 | How to Read Full Device Configuration | 📙 How-to guide | Fleet Operator |
| 14.3 | How to Apply Bulk Configuration | 📙 How-to guide | Fleet Operator |
| 14.4 | How to Detect and Remediate Configuration Drift | 📙 How-to guide | Solution Builder |

**14.1 — About Bulk Configuration**  
Explanation of `get_config` and `set_config` — the "bulk" endpoints that read/write the entire device configuration as a single JSON document. When to use bulk config vs individual `set_*` endpoints. Risks of bulk writes (overwriting settings unintentionally). Best practices: always `get_config` → modify → `set_config`.

**14.2 — How to Read Full Device Configuration**  
How-to guide for `get_config`: requesting, receiving, and interpreting the complete configuration document. Configuration sections and their correspondence to individual `get_*` endpoints.

**14.3 — How to Apply Bulk Configuration**  
How-to guide for `set_config` (T1 complexity — the most complex endpoint):
- Building a configuration document
- Partial vs full configuration application
- Validation rules and common errors
- Reboot requirements after certain configuration changes
- Rollback strategy if configuration causes connectivity loss

**14.4 — How to Detect and Remediate Configuration Drift**  
How-to guide for maintaining configuration baselines: storing golden configurations, comparing `get_config` output against baseline, detecting and remediating drift, fleet-wide configuration compliance monitoring.

---

#### Chapter 15: Cloud Integration
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 15.1 | About Integration Architecture Patterns | 📘 Explanation | Solution Builder |
| 15.2 | How to Integrate with AWS IoT Core | 📙 How-to guide | Solution Builder |
| 15.3 | How to Integrate with Azure IoT Hub | 📙 How-to guide | Solution Builder |
| 15.4 | How to Integrate with Google Cloud IoT | 📙 How-to guide | Solution Builder |
| 15.5 | How to Integrate with a Custom MQTT Broker | 📙 How-to guide | Solution Builder |

**15.1 — About Integration Architecture Patterns**  
Common patterns for connecting the IOTC data stream to cloud platforms:
- **Direct integration:** Point reader endpoints directly at cloud MQTT broker (simplest, requires broker to support MQTT 3.1.1)
- **Bridge pattern:** Use an MQTT bridge to translate between Zebra IOTC topics and cloud-native topic structures
- **Gateway pattern:** Application subscribes to IOTC broker, transforms data, and pushes to cloud platform API

Decision framework: when to use which pattern based on scale, latency requirements, and existing infrastructure.

**15.2–15.4 — Cloud Platform How-to Guides**  
Each cloud platform how-to guide covers: broker configuration, authentication setup, topic mapping, data transformation, and end-to-end verification. Includes specific endpoint configuration payloads for `config_endpoint`.

**15.5 — How to Integrate with a Custom MQTT Broker**  
How-to guide for using customer-hosted MQTT brokers (Mosquitto, HiveMQ, EMQX, VerneMQ): broker preparation, TLS configuration, credential management, topic ACLs, and reader endpoint configuration.

---

### Part VII: Reference & Troubleshooting

#### Chapter 16: MQTT API Reference
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 16.1 | API Reference Overview & Conventions | 📕 Reference | API Consumer |
| 16.2 | Management Interface (MGMT) | 📕 Reference | API Consumer |
| 16.3 | Control Interface (CTRL) | 📕 Reference | API Consumer |
| 16.4 | Data Interface (DATA) | 📕 Reference | API Consumer |
| 16.5 | MDM Interface | 📕 Reference | API Consumer |
| 16.6 | Events Reference | 📕 Reference | API Consumer |

This is the **definitive API reference** — every endpoint, every field, every constraint, every error code. Pages are purely Reference-type with no narrative.

**16.1 — API Reference Overview & Conventions**  
How to read the reference pages:
- **Request/response convention:** Command message → Response message structure
- **Topic pattern:** Template with substitution variables
- **Payload format:** JSON, with field tables
- **Field table columns:** Field name | Type | Required | Default | Constraints | Description
- **Error response format:** Standard error envelope with error codes

**16.2 — Management Interface (MGMT) — 17 Endpoints**  
Organized by the 8 functional groups, within each group ordered by complexity tier (T4 → T1):

**Group 1: Device Identity & Status**
| Endpoint | Direction | Tier | Description |
|----------|-----------|------|-------------|
| `get_version` | Req/Res | T4 | Reader model, firmware version, serial number, hardware revision |
| `get_status` | Req/Res | T4 | Operating state, battery, temperature, connection status |
| `get_current_region` | Req/Res | T4 | Regulatory region setting (read-only via MQTT) |

**Group 2: Network Configuration**
| Endpoint | Direction | Tier | Description |
|----------|-----------|------|-------------|
| `get_eth` | Req/Res | T4 | Ethernet adapter status (cradle-connected) |
| `get_wifi` | Req/Res | T3 | Wi-Fi profile configuration and connection status |
| `set_wifi` | Req/Res | T2 | Configure Wi-Fi profiles (SSID, security, credentials) |
| `delete_wifi_profile` | Req/Res | T3 | Remove a stored Wi-Fi profile |

**Group 3: Security & Certificates**
| Endpoint | Direction | Tier | Description |
|----------|-----------|------|-------------|
| `get_installed_certificate` | Req/Res | T4 | List installed certificates with metadata |
| `install_certificate` | Req/Res | T2 | Install CA or client certificate (PEM/PKCS12) |
| `delete_certificate` | Req/Res | T3 | Remove an installed certificate |

**Group 4: MQTT Endpoint Configuration**
| Endpoint | Direction | Tier | Description |
|----------|-----------|------|-------------|
| `get_endpoint_config` | Req/Res | T3 | Current MQTT endpoint settings per interface |
| `config_endpoint` | Req/Res | T2 | Configure MQTT broker connection per interface |

**Group 5: Bulk Configuration & Maintenance**
| Endpoint | Direction | Tier | Description |
|----------|-----------|------|-------------|
| `get_config` | Req/Res | T4 | Full device configuration document |
| `set_config` | Req/Res | T1 | Apply full or partial device configuration |
| `set_os` | Req/Res | T2 | Initiate firmware update |
| `reboot` | Req/Res | T4 | Restart the reader |

Each endpoint entry contains:
- **Topic:** Full topic pattern with variables
- **Direction:** Request → Response or Event (one-way)
- **Request Payload:** Complete JSON schema with field table
- **Response Payload:** Complete JSON schema with field table
- **Error Responses:** Error codes specific to this endpoint
- **Example:** Full request/response JSON pair
- **Notes:** Operational considerations, side effects, timing expectations
- **See Also:** Links to Explanation and How-to guide chapters that cover this endpoint

**16.3 — Control Interface (CTRL) — 5 Endpoints**

**Group 6: RFID Operation Control**
| Endpoint | Direction | Tier | Description |
|----------|-----------|------|-------------|
| `get_operating_mode` | Req/Res | T4 | Current RFID operating mode configuration |
| `get_post_filter` | Req/Res | T3 | Current tag post-filter configuration |
| `control_operation` | Req/Res | T3 | Start/stop RFID read operations |
| `set_post_filter` | Req/Res | T2 | Configure tag post-filters (EPC pattern matching) |
| `set_operating_mode` | Req/Res | T1 | Configure RFID operating mode and RF parameters |

Same entry structure as MGMT endpoints above.

**16.4 — Data Interface (DATA) — 2 Topics**

| Topic | Direction | Description |
|-------|-----------|-------------|
| `data1event` | Reader → App | Primary tag data stream |
| `data2event` | Reader → App | Secondary tag data stream |

Complete `dataEVT` payload schema (shared between both channels). Field-level documentation for every tag data field across all operating modes.

**16.5 — MDM Interface — Topics**

MDM-specific topic patterns and payload schemas for SOTI Connect integration. This section documents the MDM-facing variants of management commands and the `alert_short` event format.

**16.6 — Events Reference**

| Event | Topic Segment | Direction | Description |
|-------|---------------|-----------|-------------|
| `dataEVT` | `data1event` / `data2event` | Reader → App | Tag data (cross-ref to §16.4) |
| `heartBeatEVT` | `mgmt` | Reader → App | Periodic health/status beacon |
| `alerts` | `mgmt` | Reader → App | Threshold-based alerts (full payload) |
| `alert_short` | `mdm` | Reader → MDM | MDM-optimized alert summary |
| `exceptionEVT` | `mgmt` | Reader → App | Error condition notifications |
| `mqttConnEVT` | `mgmt` | Reader → App | MQTT connection state changes |

Each event entry contains: topic pattern, trigger condition, payload schema with field table, example payload, generation frequency/conditions.

---

#### Chapter 17: Error Codes & Exception Handling
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 17.1 | Error Response Format | 📕 Reference | API Consumer |
| 17.2 | Error Code Reference | 📕 Reference | API Consumer |
| 17.3 | Exception Event Codes | 📕 Reference | API Consumer, Fleet Operator |
| 17.4 | How to Handle Errors in Application Code | 📙 How-to guide | Solution Builder |

**17.1** — Standard error envelope structure that all command responses use when an error occurs. Fields: error code, error message, command that failed, timestamp.

**17.2** — Complete alphabetical/numerical table of all error codes returned in command responses. For each code: numeric value, symbolic name, description, common causes, resolution steps.

**17.3** — Complete table of exception event codes (those appearing in `exceptionEVT` payloads). Distinguished from command error codes.

**17.4** — How-to guide for building robust error handling: retry strategies, timeout handling, distinguishing transient vs permanent errors, circuit-breaker patterns for fleet operations.

---

#### Chapter 18: Troubleshooting Guide
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 18.1 | How to Approach Troubleshooting Systematically | 📙 How-to guide | All |
| 18.2 | How to Troubleshoot Connection Issues | 📙 How-to guide | All |
| 18.3 | How to Troubleshoot RFID Operation Issues | 📙 How-to guide | All |
| 18.4 | How to Troubleshoot Tag Data Issues | 📙 How-to guide | All |
| 18.5 | How to Troubleshoot Bluetooth & Host Device Issues | 📙 How-to guide | All |
| 18.6 | How to Troubleshoot Battery & Power Issues | 📙 How-to guide | Fleet Operator |

**18.1 — How to Approach Troubleshooting Systematically**  
Systematic diagnostic approach: (1) Identify the layer (network, MQTT, RFID, application), (2) Gather data (`get_status`, event history, broker logs), (3) Isolate the variable, (4) Test the hypothesis, (5) Verify the fix.

**18.2 — How to Troubleshoot Connection Issues**  
Symptom-based troubleshooting:
- Reader not appearing on MQTT broker
- Reader connects then immediately disconnects
- Intermittent disconnections
- TLS handshake failures
- Authentication failures
- Firewall/proxy blocking

**18.3 — RFID Operation Issues**  
- Operation start command succeeds but no tags read
- Very low read rate / poor performance
- Unexpected tags in results (filter not working)
- Operation stops unexpectedly

**18.4 — Tag Data Issues**  
- No tag data events received (subscribed to wrong topic?)
- Tag data events but empty/partial payloads
- Duplicate tag reads
- Timestamp drift

**18.5 — Bluetooth & Host Device Issues**  
Handheld-specific troubleshooting:
- Reader sled not pairing with host device
- Bluetooth disconnections during operation
- Multiple host device conflicts
- Host application not forwarding MQTT traffic

**18.6 — Battery & Power Issues**  
- Rapid battery drain during RFID operations
- Reader shutting down unexpectedly
- Battery health degradation over time
- Optimal power management configuration

---

#### Chapter 19: Frequently Asked Questions
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 19.1 | General Questions | 📕 Reference | All |
| 19.2 | Connectivity & Network FAQs | 📕 Reference | All |
| 19.3 | RFID Operations FAQs | 📕 Reference | All |
| 19.4 | Fleet Management FAQs | 📕 Reference | Fleet Operator |
| 19.5 | Migration & Compatibility FAQs | 📕 Reference | All |

Each FAQ entry follows a strict format:
- **Q:** Single-sentence question
- **A:** Concise answer (1–3 sentences)
- **Details:** Link to the relevant chapter/section for full context

---

#### Chapter 20: Appendices
| § | Title | Content Type | Persona Focus |
|---|-------|-------------|---------------|
| 20.1 | Complete Configuration Document Schema | 📕 Reference | API Consumer |
| 20.2 | MQTT Topic Quick Reference | 📕 Reference | All |
| 20.3 | Firmware Version History & Changelog | 📕 Reference | All |
| 20.4 | Supported RFID Tag Types & Standards | 📕 Reference | Solution Builder |
| 20.5 | Regulatory & Regional Information | 📕 Reference | Fleet Operator |
| 20.6 | Third-Party MQTT Client Libraries | 📕 Reference | New Integrator |

**20.1 — Complete Configuration Document Schema**  
The full JSON schema for the configuration document used by `get_config` / `set_config`. Every field, every nested object, every enumeration value. This is the "schema of everything."

**20.2 — MQTT Topic Quick Reference**  
One-page cheat sheet: all topics, their directions, and their purposes. Printable/bookmarkable.

**20.3 — Firmware Version History**  
Table of firmware versions with release dates, new features, bug fixes, and breaking changes. Maps firmware versions to supported IOTC API versions.

**20.4 — Supported RFID Standards**  
EPC Gen2 / ISO 18000-63 support details, supported tag memory banks, tag populations, read/write capabilities.

**20.5 — Regulatory & Regional Information**  
Region codes, supported countries, frequency bands per region, regulatory compliance certifications.

**20.6 — Third-Party MQTT Client Libraries**  
Curated list of recommended MQTT client libraries by language (Python, Node.js, C#, Java, Go, C/C++) with version compatibility notes and links to examples.

---

## 7. Page-Level Specifications

### 7.1 Standard Page Anatomy

Every documentation page follows this structure:

```
┌─────────────────────────────────────────────────┐
│ [Breadcrumb: Part > Chapter > Section]          │
│                                                  │
│ # Page Title                                     │
│ 📘 EXPLANATION  |  Estimated reading: 8 min      │
│                                                  │
│ ## Overview                                      │
│ [2-3 sentence summary of what this page covers] │
│                                                  │
│ ## [Content sections — structure per type]       │
│ ...                                              │
│                                                  │
│ ┌───────────────────────────────────────────┐    │
│ │ 📎 Related                                │    │
│ │ • 📘 [Explanation link]                    │    │
│ │ • 📕 [Reference link]                     │    │
│ │ • 📙 [How-to guide link]                  │    │
│ └───────────────────────────────────────────┘    │
│                                                  │
│ [← Previous: ...]       [Next: ... →]           │
└─────────────────────────────────────────────────┘
```

### 7.2 API Reference Entry Anatomy

Each endpoint in Chapter 16 follows this structure:

```
┌─────────────────────────────────────────────────┐
│ # {endpoint_name}                                │
│ 📕 REFERENCE  |  Interface: {MGMT|CTRL|DATA}    │
│ Complexity: {T1|T2|T3|T4}                        │
│                                                  │
│ ## Summary                                       │
│ [One-sentence description]                       │
│                                                  │
│ ## Topic                                         │
│ `{tenantId}/{interface}/clients/{ch}/{serial}`   │
│ Direction: Request → Response                    │
│ QoS: {0|1}                                       │
│                                                  │
│ ## Request Payload                               │
│ ```json                                          │
│ { ... example ... }                              │
│ ```                                              │
│ | Field | Type | Req | Default | Description |   │
│ |-------|------|-----|---------|-------------|   │
│ | ...   | ...  | ... | ...     | ...         |   │
│                                                  │
│ ## Response Payload                              │
│ ```json                                          │
│ { ... example ... }                              │
│ ```                                              │
│ | Field | Type | Description |                   │
│ |-------|------|-------------|                   │
│ | ...   | ...  | ...         |                   │
│                                                  │
│ ## Error Responses                               │
│ | Code | Name | Description | Resolution |       │
│ |------|------|-------------|------------|       │
│                                                  │
│ ## Notes                                         │
│ [Operational considerations, side effects]       │
│                                                  │
│ ## See Also                                      │
│ • 📘 [Explanation chapter]                  │
│ • 📙 [How-to guide]                              │
└─────────────────────────────────────────────────┘
```

---

## 8. API Reference Organization

### 8.1 Eight Functional Groups

The API Reference (Chapter 16) organizes all 28 endpoints into eight functional groups. The groups follow the dependency chain — a developer working through them sequentially will configure a reader from discovery to production.

```
┌──────────────────────────────────────────────────────────────────┐
│                     DEPENDENCY CHAIN                              │
│                                                                    │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐          │
│  │ Group 1 │──▶│ Group 2 │──▶│ Group 3 │──▶│ Group 4 │          │
│  │ Identity│   │ Network │   │Security │   │Endpoints│          │
│  │ & Status│   │  Config │   │ & Certs │   │ Routing │          │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘          │
│       │                                          │                │
│       │              ┌───────────────────────────┘                │
│       │              ▼                                            │
│       │        ┌─────────┐   ┌─────────┐                         │
│       │        │ Group 5 │──▶│ Group 6 │                         │
│       │        │  RFID   │   │ Events &│                         │
│       │        │ Control │   │  Data   │                         │
│       │        └─────────┘   └─────────┘                         │
│       │                                                           │
│       │  ┌─────────┐   ┌─────────┐                               │
│       └─▶│ Group 7 │──▶│ Group 8 │                               │
│          │  Bulk   │   │  Maint. │                               │
│          │ Config  │   │         │                               │
│          └─────────┘   └─────────┘                               │
└──────────────────────────────────────────────────────────────────┘
```

### 8.2 Group Rationale

| Group | Why This Position | Dependency |
|-------|-------------------|------------|
| **1. Device Identity & Status** | Must discover what the reader is before configuring it | None (entry point) |
| **2. Network Configuration** | Must have network before configuring MQTT endpoints | Group 1 (need device to be identified) |
| **3. Security & Certificates** | Certificates required for TLS-secured MQTT connections | Group 2 (need network for cert operations) |
| **4. Endpoint Routing** | MQTT endpoint config requires network + security in place | Groups 2, 3 |
| **5. RFID Control** | Can only control RFID once MQTT command path is established | Group 4 (need working endpoint) |
| **6. Events & Data** | Events are produced by RFID operations and system state | Group 5 (events follow producers) |
| **7. Bulk Configuration** | "Power user" endpoint — reads/writes everything above in one shot | Groups 1–6 (meta-config) |
| **8. Maintenance** | Firmware update and reboot — last resort / maintenance window | All (potentially destructive) |

### 8.3 Within-Group Ordering (T4 → T1)

Within each functional group, endpoints are ordered from simplest to most complex:

```
Group 1: get_version (T4) → get_status (T4) → get_current_region (T4)
Group 2: get_eth (T4) → get_wifi (T3) → delete_wifi_profile (T3) → set_wifi (T2)
Group 3: get_installed_certificate (T4) → delete_certificate (T3) → install_certificate (T2)
Group 4: get_endpoint_config (T3) → config_endpoint (T2)
Group 5: get_operating_mode (T4) → get_post_filter (T3) → control_operation (T3) → set_post_filter (T2) → set_operating_mode (T1)
Group 6: config_events (T2) → [dataEVT, heartBeatEVT, alerts, alert_short, exceptionEVT, mqttConnEVT]
Group 7: get_config (T4) → set_config (T1)
Group 8: reboot (T4) → set_os (T2)
```

---

## 9. Cross-Referencing Strategy

### 9.1 Bidirectional Links

Every piece of content maintains bidirectional links between its complementary content types:

```
📘 Explanation page  ←──→ 📕 Reference page
        ↕                       ↕
📗 Tutorial page   ←──→ 📙 How-to guide page
```

**Rules:**
1. An Explanation page about Wi-Fi configuration MUST link to the `get_wifi` / `set_wifi` reference entries
2. A Reference entry for `set_wifi` MUST link back to the Explanation Wi-Fi chapter and the Wi-Fi configuration how-to guide
3. A Tutorial that uses `set_wifi` MUST link to both the Explanation and the Reference entry
4. A How-to guide on Wi-Fi troubleshooting MUST link to the Explanation Wi-Fi architecture and relevant Reference entries

### 9.2 Cross-Reference Format

Inline cross-references use the content-type badge:

```markdown
For complete field documentation, see 📕 [set_wifi Command Reference](ch16.md#set_wifi).
To understand Wi-Fi architecture on handheld readers, see 📘 [About Network Architecture](ch6.md#network-architecture).
```

### 9.3 "See Also" Boxes

Every page ends with a "Related" box containing 3–5 cross-references organized by content type:

```
📎 Related
├── 📘 About Network Architecture for Handheld Readers (§6.1)
├── 📕 set_wifi Command Reference (§16.2)
├── 📙 How to Troubleshoot Network Issues (§18.2)
└── 📗 Quick Start: Connect Your Reader (§5.2)
```

### 9.4 Prerequisite Links

Chapters that have prerequisites display a "Before You Begin" box:

```
⚠️ Before You Begin
This chapter assumes you have completed:
• � Reader Bootstrap with 123RFID Desktop (§4.3)
• 📙 How to Pair the Reader Sled via Bluetooth (§4.5)
• 📗 Quick Start Tutorial (§5)
```

---

## 10. Content Exclusions (Fixed-Reader-Only)

The following concepts from the fixed reader (FXR90/FX9600) IOTC documentation are **explicitly excluded** from the handheld IA, as they are not applicable to RFD40/RFD90 series readers:

| Excluded Concept | Reason |
|-----------------|--------|
| **REST API** | Handheld readers communicate exclusively via MQTT |
| **WebSocket protocol** | Not supported on handheld hardware |
| **HTTP POST protocol** | Not supported on handheld hardware |
| **DA Apps (pyziotc, Node.js)** | Device Application framework is fixed-reader-only |
| **GPIO / GPI / GPO** | Handheld readers have no general-purpose I/O pins |
| **Portal Mode** | GPI-triggered fixed-reader operating mode |
| **Conveyor Mode** | Fixed-reader operating mode for conveyor belt scanning |
| **Reader Web UI** | Fixed readers have a browser-accessible configuration UI; handheld readers do not |
| **Ethernet as primary network** | Handheld readers use Wi-Fi/Bluetooth; Ethernet is cradle-only and read-only |
| **Cellular / WAN / 5G** | FXR90-specific connectivity option |
| **Wi-Fi Hotspot mode** | Fixed-reader networking feature |
| **Pre-Selection (rxSawFilter)** | Fixed-reader RF front-end configuration |
| **Cable Loss Compensation** | Fixed readers have external antenna cables; handheld readers have internal antenna |
| **Application LED Control** | Fixed-reader LED management via API |
| **Directionality Settings** | Fixed-reader multi-antenna directionality configuration |
| **Batching / Retention (150K events)** | Fixed-reader edge buffering capability |
| **Multiple antenna ports** | Handheld readers have a single internal antenna |
| **GPS tag data enrichment** | FXR90-specific GPS module integration |
| **Firmware revert (revertbackOS)** | Fixed-reader firmware rollback command |
| **User Applications management** | DA App lifecycle management (fixed-reader-only) |
| **FX9600 Migration Guide** | Legacy fixed-reader migration content |

---

## 11. Handheld-Specific Additions

The following concepts are **unique to or especially important for** handheld readers and must receive dedicated coverage:

| Addition | Where Covered | Rationale |
|----------|---------------|-----------|
| **Bluetooth pairing (sled ↔ host device)** | §4.5, §18.5 | The Bluetooth link is the foundation of the handheld architecture — it's the analog of Ethernet for fixed readers |
| **Battery lifecycle management** | §11.4, §11.5, §12.2, §18.6 | Battery is the primary operational constraint for handheld deployments |
| **123RFID Desktop bootstrap** | §4.3, §13.3 | Required for initial setup; region configuration is ONLY possible through this tool |
| **Region configuration (123RFID Desktop only)** | §4.3, §20.5 | Critical: `get_current_region` is read-only via MQTT; setting requires 123RFID Desktop |
| **Physical trigger integration** | §9.5 | Unique UX: hardware trigger button maps to RFID start/stop |
| **Single internal antenna** | §2.5, §9.1 | Simplifies RF configuration but limits range/directionality |
| **Host device as network gateway** | §2.1, §2.5, §6.1 | Architectural implication: reader's network path goes through another device |
| **MDM / SOTI Connect integration** | §8.1, §13.2, §16.5 | Primary enterprise provisioning path for handheld fleet |
| **alert_short event** | §11.5, §16.6 | MDM-optimized alert format unique to handheld IOTC |
| **Barcode scanning** | §1.2 | Some models have barcode capability alongside RFID |
| **Host terminal connection status** | §11.7, §12.3 | Monitoring the Bluetooth link to the host device |

---

## 12. Appendix: Endpoint Inventory

### Complete Endpoint Matrix

| # | Endpoint | Interface | Type | Group | Tier | Chapter |
|---|----------|-----------|------|-------|------|---------|
| 1 | `get_version` | MGMT | Req/Res | 1: Identity | T4 | §16.2 |
| 2 | `get_status` | MGMT | Req/Res | 1: Identity | T4 | §16.2 |
| 3 | `get_current_region` | MGMT | Req/Res | 1: Identity | T4 | §16.2 |
| 4 | `get_eth` | MGMT | Req/Res | 2: Network | T4 | §16.2 |
| 5 | `get_wifi` | MGMT | Req/Res | 2: Network | T3 | §16.2 |
| 6 | `set_wifi` | MGMT | Req/Res | 2: Network | T2 | §16.2 |
| 7 | `delete_wifi_profile` | MGMT | Req/Res | 2: Network | T3 | §16.2 |
| 8 | `get_installed_certificate` | MGMT | Req/Res | 3: Security | T4 | §16.2 |
| 9 | `install_certificate` | MGMT | Req/Res | 3: Security | T2 | §16.2 |
| 10 | `delete_certificate` | MGMT | Req/Res | 3: Security | T3 | §16.2 |
| 11 | `get_endpoint_config` | MGMT | Req/Res | 4: Endpoints | T3 | §16.2 |
| 12 | `config_endpoint` | MGMT | Req/Res | 4: Endpoints | T2 | §16.2 |
| 13 | `get_config` | MGMT | Req/Res | 7: Bulk | T4 | §16.2 |
| 14 | `set_config` | MGMT | Req/Res | 7: Bulk | T1 | §16.2 |
| 15 | `set_os` | MGMT | Req/Res | 8: Maint. | T2 | §16.2 |
| 16 | `reboot` | MGMT | Req/Res | 8: Maint. | T4 | §16.2 |
| 17 | `config_events` | MGMT | Req/Res | 6: Events | T2 | §16.2 |
| 18 | `set_operating_mode` | CTRL | Req/Res | 5: RFID | T1 | §16.3 |
| 19 | `get_operating_mode` | CTRL | Req/Res | 5: RFID | T4 | §16.3 |
| 20 | `set_post_filter` | CTRL | Req/Res | 5: RFID | T2 | §16.3 |
| 21 | `get_post_filter` | CTRL | Req/Res | 5: RFID | T3 | §16.3 |
| 22 | `control_operation` | CTRL | Req/Res | 5: RFID | T3 | §16.3 |
| 23 | `dataEVT` (data1event) | DATA | Event | 6: Events | — | §16.4 |
| 24 | `dataEVT` (data2event) | DATA | Event | 6: Events | — | §16.4 |
| 25 | `heartBeatEVT` | MGMT | Event | 6: Events | — | §16.6 |
| 26 | `alerts` | MGMT | Event | 6: Events | — | §16.6 |
| 27 | `alert_short` | MDM | Event | 6: Events | — | §16.6 |
| 28 | `exceptionEVT` | MGMT | Event | 6: Events | — | §16.6 |
| 29 | `mqttConnEVT` | MGMT | Event | 6: Events | — | §16.6 |

### Endpoint-to-Chapter Cross-Reference

| Endpoint | How-to guide Coverage | Explanation Coverage | Reference |
|----------|---------------|--------------------:|-----------|
| `get_version` | §4.4, §5.3 | §2.2 | §16.2 |
| `get_status` | §12.1 | §2.5 | §16.2 |
| `get_current_region` | §4.3 | §20.5 | §16.2 |
| `get_wifi` / `set_wifi` / `delete_wifi_profile` | §6.2, §6.4 | §6.1 | §16.2 |
| `get_eth` | §6.3 | §6.1 | §16.2 |
| `get_installed_certificate` / `install_certificate` / `delete_certificate` | §7.2, §7.3 | §7.1 | §16.2 |
| `get_endpoint_config` / `config_endpoint` | §8.2, §8.3 | §8.1 | §16.2 |
| `set_operating_mode` / `get_operating_mode` | §9.2 | §9.1 | §16.3 |
| `set_post_filter` / `get_post_filter` | §9.3b | §9.3a | §16.3 |
| `control_operation` | §9.4 | §9.5 | §16.3 |
| `dataEVT` | §10.3, §10.5 | §10.1, §10.4 | §16.4 |
| `config_events` | §11.3 | §11.1 | §16.2 |
| `heartBeatEVT` | §12.1, §12.4 | §11.4 | §16.6 |
| `alerts` / `alert_short` | §12.2 | §11.5 | §16.6 |
| `exceptionEVT` | §17.4 | §11.6 | §16.6 |
| `mqttConnEVT` | §12.3, §13.4 | §11.7 | §16.6 |
| `get_config` / `set_config` | §14.2, §14.3, §14.4 | §14.1 | §16.2 |
| `set_os` | §13.2 | §14.1 | §16.2 |
| `reboot` | §18.2 | — | §16.2 |

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| **Parts** | 7 |
| **Chapters** | 20 |
| **Sections** | ~96 (§9.3 split into 9.3a + 9.3b for content-type discipline) |
| **MQTT Endpoints (commands)** | 22 |
| **MQTT Events** | 7 (including dual data channels) |
| **Functional Groups** | 8 |
| **Content Types** | 4 (Explanation, Tutorial, Reference, How-to guide) — per Diátaxis framework |
| **Target Personas** | 4 |
| **Excluded Fixed-Reader Concepts** | 21 |
| **Handheld-Specific Additions** | 11 |

---

*This information architecture is designed to be implemented in any documentation platform (Docusaurus, GitBook, MkDocs, ReadTheDocs, custom) with the structural constraints above serving as the specification for content authors, information architects, and platform engineers. Content-type taxonomy and quality principles are grounded in the [Diátaxis framework](https://diataxis.fr/) by Daniele Procida.*
