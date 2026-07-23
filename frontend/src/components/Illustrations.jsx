import React from 'react'

/**
 * Collection of inline SVG cartoon illustrations for Shoplex.
 * Flat-design characters using the brand accent color palette.
 */

// Cute shopping character carrying bags — used in hero & banners
export const ShoppingCharacter = ({ className = '', size = 120 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="100" cy="170" rx="35" ry="8" fill="#e8e6e3" opacity="0.5"/>
    {/* Legs */}
    <rect x="85" y="140" width="10" height="28" rx="5" fill="#1a1a2e"/>
    <rect x="105" y="140" width="10" height="28" rx="5" fill="#1a1a2e"/>
    {/* Shoes */}
    <ellipse cx="90" cy="168" rx="10" ry="5" fill="#e85d4a"/>
    <ellipse cx="110" cy="168" rx="10" ry="5" fill="#e85d4a"/>
    {/* Body */}
    <rect x="75" y="90" width="50" height="55" rx="12" fill="#1a1a2e"/>
    {/* Neck */}
    <rect x="94" y="78" width="12" height="16" rx="6" fill="#f5c4be"/>
    {/* Head */}
    <circle cx="100" cy="62" r="26" fill="#f5c4be"/>
    {/* Hair */}
    <path d="M74 55 C74 35, 126 35, 126 55 C126 45, 74 45, 74 55Z" fill="#1a1a2e"/>
    <ellipse cx="100" cy="38" rx="22" ry="8" fill="#1a1a2e"/>
    {/* Eyes */}
    <circle cx="90" cy="60" r="3" fill="#1a1a2e"/>
    <circle cx="110" cy="60" r="3" fill="#1a1a2e"/>
    <circle cx="91" cy="59" r="1" fill="white"/>
    <circle cx="111" cy="59" r="1" fill="white"/>
    {/* Mouth */}
    <path d="M95 70 Q100 76, 105 70" stroke="#e85d4a" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Blush */}
    <ellipse cx="84" cy="68" rx="5" ry="3" fill="#f5c4be" opacity="0.8"/>
    <ellipse cx="116" cy="68" rx="5" ry="3" fill="#f5c4be" opacity="0.8"/>
    {/* Left arm holding bag */}
    <path d="M75 100 L55 115" stroke="#f5c4be" strokeWidth="8" strokeLinecap="round"/>
    {/* Right arm holding bag */}
    <path d="M125 100 L145 115" stroke="#f5c4be" strokeWidth="8" strokeLinecap="round"/>
    {/* Shopping bag left */}
    <rect x="38" y="108" width="28" height="32" rx="4" fill="#e85d4a"/>
    <path d="M44 108 Q44 98, 52 98 Q60 98, 60 108" stroke="#d14a38" strokeWidth="2.5" fill="none"/>
    <rect x="48" y="118" width="8" height="2" rx="1" fill="white" opacity="0.5"/>
    {/* Shopping bag right */}
    <rect x="134" y="108" width="28" height="32" rx="4" fill="#c8a96e"/>
    <path d="M140 108 Q140 98, 148 98 Q156 98, 156 108" stroke="#b8964e" strokeWidth="2.5" fill="none"/>
    <rect x="144" y="118" width="8" height="2" rx="1" fill="white" opacity="0.5"/>
    {/* Star accessory */}
    <path d="M128 48 L130 53 L136 53 L131 57 L133 62 L128 58 L123 62 L125 57 L120 53 L126 53Z" fill="#c8a96e"/>
  </svg>
)

// Character with empty cart — used for empty cart state
export const EmptyCartCharacter = ({ className = '', size = 160 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="100" cy="180" rx="50" ry="8" fill="#e8e6e3" opacity="0.4"/>
    {/* Cart */}
    <path d="M50 90 L60 150 L140 150 L150 90Z" stroke="#d0cdc8" strokeWidth="3" fill="#f5f3f0" strokeLinejoin="round"/>
    <line x1="50" y1="90" x2="40" y2="75" stroke="#d0cdc8" strokeWidth="3" strokeLinecap="round"/>
    {/* Cart wheels */}
    <circle cx="75" cy="158" r="7" fill="#d0cdc8"/>
    <circle cx="75" cy="158" r="3" fill="#f5f3f0"/>
    <circle cx="125" cy="158" r="7" fill="#d0cdc8"/>
    <circle cx="125" cy="158" r="3" fill="#f5f3f0"/>
    {/* Character peeking from behind cart */}
    <circle cx="100" cy="55" r="24" fill="#f5c4be"/>
    {/* Hair */}
    <path d="M76 48 C76 30, 124 30, 124 48 C124 38, 76 38, 76 48Z" fill="#1a1a2e"/>
    <ellipse cx="100" cy="33" rx="20" ry="7" fill="#1a1a2e"/>
    {/* Worried eyes */}
    <circle cx="92" cy="52" r="3.5" fill="#1a1a2e"/>
    <circle cx="108" cy="52" r="3.5" fill="#1a1a2e"/>
    <circle cx="93" cy="51" r="1.2" fill="white"/>
    <circle cx="109" cy="51" r="1.2" fill="white"/>
    {/* Worried eyebrows */}
    <path d="M86 44 L94 47" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round"/>
    <path d="M114 44 L106 47" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round"/>
    {/* Sad mouth */}
    <path d="M94 64 Q100 60, 106 64" stroke="#e85d4a" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Arms on cart edge */}
    <path d="M80 75 L70 90" stroke="#f5c4be" strokeWidth="7" strokeLinecap="round"/>
    <path d="M120 75 L130 90" stroke="#f5c4be" strokeWidth="7" strokeLinecap="round"/>
    {/* Question marks floating */}
    <text x="55" y="65" fontFamily="Sora" fontSize="18" fill="#d0cdc8" fontWeight="700">?</text>
    <text x="140" y="50" fontFamily="Sora" fontSize="14" fill="#e8e6e3" fontWeight="700">?</text>
  </svg>
)

// Character reading mail — used for newsletter section
export const MailCharacter = ({ className = '', size = 100 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="80" cy="148" rx="30" ry="6" fill="#e8e6e3" opacity="0.4"/>
    {/* Body */}
    <rect x="62" y="85" width="36" height="40" rx="10" fill="#1a1a2e"/>
    {/* Legs */}
    <rect x="70" y="120" width="8" height="22" rx="4" fill="#1a1a2e"/>
    <rect x="84" y="120" width="8" height="22" rx="4" fill="#1a1a2e"/>
    {/* Shoes */}
    <ellipse cx="74" cy="142" rx="8" ry="4" fill="#e85d4a"/>
    <ellipse cx="88" cy="142" rx="8" ry="4" fill="#e85d4a"/>
    {/* Neck */}
    <rect x="76" y="74" width="8" height="14" rx="4" fill="#f5c4be"/>
    {/* Head */}
    <circle cx="80" cy="55" r="22" fill="#f5c4be"/>
    {/* Hair */}
    <path d="M58 48 C58 30, 102 30, 102 48 C102 38, 58 38, 58 48Z" fill="#1a1a2e"/>
    <ellipse cx="80" cy="35" rx="18" ry="7" fill="#1a1a2e"/>
    {/* Happy eyes */}
    <path d="M72 52 Q74 48, 76 52" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M84 52 Q86 48, 88 52" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    {/* Smile */}
    <path d="M75 62 Q80 68, 85 62" stroke="#e85d4a" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Arms holding envelope */}
    <path d="M62 95 L42 80" stroke="#f5c4be" strokeWidth="6" strokeLinecap="round"/>
    <path d="M98 95 L118 80" stroke="#f5c4be" strokeWidth="6" strokeLinecap="round"/>
    {/* Envelope */}
    <rect x="30" y="65" width="100" height="30" rx="4" fill="#e85d4a"/>
    <path d="M30 65 L80 85 L130 65" stroke="#d14a38" strokeWidth="2" fill="none"/>
    <rect x="60" y="74" width="40" height="3" rx="1.5" fill="white" opacity="0.3"/>
    {/* Little hearts */}
    <path d="M42 50 C42 46, 48 46, 48 50 C48 54, 45 57, 45 57 C45 57, 42 54, 42 50Z" fill="#e85d4a" opacity="0.6"/>
    <path d="M112 44 C112 41, 116 41, 116 44 C116 47, 114 49, 114 49 C114 49, 112 47, 112 44Z" fill="#c8a96e" opacity="0.6"/>
  </svg>
)

// Stylish fashion character — used for seasonal banners
export const FashionCharacter = ({ className = '', size = 140 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="100" cy="185" rx="30" ry="6" fill="#e8e6e3" opacity="0.4"/>
    {/* Legs */}
    <rect x="88" y="148" width="8" height="30" rx="4" fill="#1a1a2e"/>
    <rect x="104" y="148" width="8" height="30" rx="4" fill="#1a1a2e"/>
    {/* Shoes */}
    <path d="M84 175 L96 175 Q100 175, 100 179 L84 179 Q82 179, 82 177Z" fill="#e85d4a"/>
    <path d="M100 175 L112 175 Q116 175, 116 179 L100 179 Q98 179, 100 177Z" fill="#e85d4a"/>
    {/* Body — Dress/Coat */}
    <path d="M78 90 L72 155 L128 155 L122 90Z" fill="#e85d4a"/>
    {/* Belt */}
    <rect x="76" y="115" width="48" height="5" rx="2.5" fill="#c8a96e"/>
    <circle cx="100" cy="117.5" r="3" fill="#b8964e"/>
    {/* Collar */}
    <path d="M88 90 L100 100 L112 90" stroke="#d14a38" strokeWidth="2" fill="none"/>
    {/* Neck */}
    <rect x="95" y="72" width="10" height="20" rx="5" fill="#f5c4be"/>
    {/* Head */}
    <circle cx="100" cy="52" r="26" fill="#f5c4be"/>
    {/* Hair — glamorous */}
    <path d="M74 45 C74 22, 126 22, 126 45" fill="#1a1a2e"/>
    <ellipse cx="100" cy="28" rx="24" ry="10" fill="#1a1a2e"/>
    <path d="M74 45 C70 55, 68 65, 72 70" stroke="#1a1a2e" strokeWidth="6" strokeLinecap="round" fill="none"/>
    <path d="M126 45 C130 55, 132 65, 128 70" stroke="#1a1a2e" strokeWidth="6" strokeLinecap="round" fill="none"/>
    {/* Sunglasses */}
    <rect x="82" y="46" width="14" height="11" rx="5" fill="#1a1a2e"/>
    <rect x="104" y="46" width="14" height="11" rx="5" fill="#1a1a2e"/>
    <line x1="96" y1="52" x2="104" y2="52" stroke="#1a1a2e" strokeWidth="2"/>
    <line x1="82" y1="52" x2="76" y2="48" stroke="#1a1a2e" strokeWidth="2"/>
    <line x1="118" y1="52" x2="124" y2="48" stroke="#1a1a2e" strokeWidth="2"/>
    {/* Smile */}
    <path d="M94 64 Q100 70, 106 64" stroke="#e85d4a" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Left arm — hand on hip */}
    <path d="M78 95 L58 115 L70 125" stroke="#f5c4be" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    {/* Right arm — waving */}
    <path d="M122 95 L142 75" stroke="#f5c4be" strokeWidth="7" strokeLinecap="round"/>
    {/* Hand */}
    <circle cx="145" cy="72" r="5" fill="#f5c4be"/>
    {/* Sparkles */}
    <path d="M148 58 L150 54 L152 58 L156 60 L152 62 L150 66 L148 62 L144 60Z" fill="#c8a96e"/>
    <path d="M60 80 L61 77 L62 80 L65 81 L62 82 L61 85 L60 82 L57 81Z" fill="#e85d4a" opacity="0.6"/>
    {/* Handbag */}
    <rect x="134" y="110" width="18" height="22" rx="3" fill="#c8a96e"/>
    <path d="M138 110 Q138 102, 143 102 Q148 102, 148 110" stroke="#b8964e" strokeWidth="2" fill="none"/>
  </svg>
)

// Character with magnifying glass — used for no search results
export const SearchCharacter = ({ className = '', size = 140 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="90" cy="165" rx="28" ry="6" fill="#e8e6e3" opacity="0.4"/>
    {/* Body */}
    <rect x="72" y="95" width="36" height="42" rx="10" fill="#1a1a2e"/>
    {/* Legs */}
    <rect x="78" y="132" width="8" height="26" rx="4" fill="#1a1a2e"/>
    <rect x="94" y="132" width="8" height="26" rx="4" fill="#1a1a2e"/>
    {/* Shoes */}
    <ellipse cx="82" cy="158" rx="8" ry="4" fill="#e85d4a"/>
    <ellipse cx="98" cy="158" rx="8" ry="4" fill="#e85d4a"/>
    {/* Neck */}
    <rect x="84" y="82" width="12" height="16" rx="6" fill="#f5c4be"/>
    {/* Head */}
    <circle cx="90" cy="60" r="24" fill="#f5c4be"/>
    {/* Hair */}
    <path d="M66 52 C66 32, 114 32, 114 52 C114 42, 66 42, 66 52Z" fill="#1a1a2e"/>
    <ellipse cx="90" cy="38" rx="20" ry="7" fill="#1a1a2e"/>
    {/* Curious eyes — looking right */}
    <circle cx="85" cy="57" r="3" fill="#1a1a2e"/>
    <circle cx="100" cy="57" r="3" fill="#1a1a2e"/>
    <circle cx="86.5" cy="56" r="1" fill="white"/>
    <circle cx="101.5" cy="56" r="1" fill="white"/>
    {/* Raised eyebrow */}
    <path d="M96 48 Q101 44, 106 48" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* Mouth — curious "o" */}
    <circle cx="92" cy="68" r="3" stroke="#e85d4a" strokeWidth="1.5" fill="#f5c4be"/>
    {/* Right arm holding magnifying glass */}
    <path d="M108 100 L130 75" stroke="#f5c4be" strokeWidth="7" strokeLinecap="round"/>
    {/* Magnifying glass */}
    <circle cx="140" cy="62" r="16" stroke="#c8a96e" strokeWidth="4" fill="none"/>
    <circle cx="140" cy="62" r="12" fill="rgba(200, 169, 110, 0.1)"/>
    <line x1="130" y1="74" x2="124" y2="80" stroke="#c8a96e" strokeWidth="4" strokeLinecap="round"/>
    {/* Left arm */}
    <path d="M72 100 L55 115" stroke="#f5c4be" strokeWidth="7" strokeLinecap="round"/>
    {/* Little dots/sparkles in magnifying glass */}
    <circle cx="135" cy="58" r="2" fill="#e85d4a" opacity="0.4"/>
    <circle cx="143" cy="65" r="1.5" fill="#c8a96e" opacity="0.5"/>
  </svg>
)

// Star burst decoration — for section dividers
export const StarBurst = ({ className = '', size = 24, color = '#c8a96e' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 L13.5 9 L20 6 L15 11 L22 12 L15 13 L20 18 L13.5 15 L12 22 L10.5 15 L4 18 L9 13 L2 12 L9 11 L4 6 L10.5 9Z" fill={color}/>
  </svg>
)

export default {
  ShoppingCharacter,
  EmptyCartCharacter,
  MailCharacter,
  FashionCharacter,
  SearchCharacter,
  StarBurst
}
