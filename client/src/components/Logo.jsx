import React from 'react';

export default function Logo({ className = "w-10 h-10", idPrefix = "hartov_logo" }) {
  const bgId = `${idPrefix}_bg`;
  const accId = `${idPrefix}_acc`;

  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="11" fill={`url(#${bgId})`} />
      <rect
        x="0.5"
        y="0.5"
        width="39"
        height="39"
        rx="10.5"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
      {/* Left Pillar */}
      <rect x="9.5" y="9.5" width="5.5" height="21" rx="2.5" fill="#ffffff" />
      {/* Crossbar */}
      <rect x="16.8" y="17.25" width="6.4" height="5.5" rx="2.2" fill="#2dd4bf" />
      {/* Right Lower Pillar */}
      <rect x="25" y="17.25" width="5.5" height="13.25" rx="2.5" fill="#ffffff" />
      {/* Right Top Accent Block */}
      <rect
        x="25"
        y="9.5"
        width="5.5"
        height="5.5"
        rx="2.2"
        fill={`url(#${accId})`}
      />
      <defs>
        <linearGradient
          id={bgId}
          x1="0"
          y1="0"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0f766e" />
          <stop offset="1" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient
          id={accId}
          x1="25"
          y1="9.5"
          x2="30.5"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
