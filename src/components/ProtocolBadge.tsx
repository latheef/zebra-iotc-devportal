import React from 'react';

type ProtocolBadgeProps = {
  type: 'rest' | 'mqtt';
};

export default function ProtocolBadge({ type }: ProtocolBadgeProps): React.JSX.Element {
  const label = type === 'rest' ? 'REST' : 'MQTT';
  return (
    <span className={`protocol-badge protocol-badge--${type}`}>
      {label}
    </span>
  );
}
