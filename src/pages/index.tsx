import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type FeatureCardProps = {
  title: string;
  badge: string;
  description: string;
  link: string;
  linkText: string;
};

function FeatureCard({ title, badge, description, link, linkText }: FeatureCardProps) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.productCard}>
        <h3>{title}</h3>
        <p className={styles.protocols}>{badge}</p>
        <p>{description}</p>
        <Link className="button button--primary button--md" to={link}>
          {linkText} →
        </Link>
      </div>
    </div>
  );
}

function HomepageHero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Zebra IoT Connector</h1>
        <p className="hero__subtitle">MQTT API Documentation for RFD40 / RFD90 Handheld RFID Readers</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/quick-start/overview"
          >
            Quick Start Tutorial
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/reference/api-overview"
            style={{ marginLeft: '1rem' }}
          >
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Zebra IoT Connector: Handheld RFID Documentation"
      description="MQTT API documentation for Zebra RFD40/RFD90 handheld RFID reader sleds."
    >
      <HomepageHero />
      <main>
        <section className={styles.products}>
          <div className="container">
            <div className="row">
              <FeatureCard
                title="Quick Start"
                badge="📗 Tutorial"
                description="Get from zero to your first RFID tag read in 15 minutes. Step-by-step with code examples in Python, Node.js, and C#."
                link="/docs/getting-started/quick-start/overview"
                linkText="Start Tutorial"
              />
              <FeatureCard
                title="API Reference"
                badge="📕 Reference"
                description="Complete MQTT API reference: 22 commands and 7 event types across Management, Control, and Data interfaces."
                link="/docs/reference/api-overview"
                linkText="View Reference"
              />
              <FeatureCard
                title="Architecture"
                badge="📘 Explanation"
                description="Understand the system architecture, MQTT topic hierarchy, interface model, and handheld-specific design considerations."
                link="/docs/foundations/architecture/end-to-end-system"
                linkText="Learn More"
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
