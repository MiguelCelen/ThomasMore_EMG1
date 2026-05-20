import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.59/build/runtime.js';
import * as THREE from 'https://unpkg.com/three@0.159.0/build/three.module.js';

const { ZONES, ZONE_ORDER, MACHINES, USERS } = window.WERKPLAATS_DATA;
const MACHINE_TYPE = {
  'slijp-boren': 'slijp',
  'slijp-frezen': 'slijp',
  'frees-1': 'frees', 'frees-2': 'frees', 'frees-3': 'frees', 'frees-4': 'frees',
  'radiaalboor': 'radiaal',
  'draaibank-1': 'draai',
  'slijpmachine': 'slijp',
  'montagetafel-1': 'montage', 'montagetafel-2': 'montage',
  'montagetafel-3': 'montage', 'montagetafel-4': 'montage',
  'meetbank': 'meet',
  'lasrobot': 'las-robot',
  'lastafel': 'las-tafel',
  'cnc-frees': 'cnc-frees',
  'cnc-draai': 'cnc-draai',
  'rekken-links': 'rek',
  'metaalrek': 'rek',
  'pc-post': 'pc',
};

const MACHINE_SVG = {
  frees: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="84" width="22" height="14" fill="#E8E8EA"/>
    <rect x="92" y="84" width="22" height="14" fill="#E8E8EA"/>
    <rect x="6" y="76" width="108" height="10" fill="#D8DCE0"/>
    <rect x="14" y="14" width="28" height="66" fill="#1F2940"/>
    <rect x="14" y="14" width="28" height="3" fill="#2D3849"/>
    <rect x="10" y="8" width="36" height="8" fill="#E8DFC9"/>
    <rect x="10" y="8" width="36" height="2" fill="#D8CFB5"/>
    <rect x="17" y="20" width="22" height="6" fill="#2D3849"/>
    <polygon points="20,22.5 22,21 24,22.5 23,24.5 21,24.5" fill="#E84545"/>
    <polygon points="25,22.5 27,21 29,22.5 28,24.5 26,24.5" fill="#F5C518"/>
    <polygon points="30,22.5 32,21 34,22.5 33,24.5 31,24.5" fill="#22C55E"/>
    <polygon points="35,22.5 37,21 39,22.5 38,24.5 36,24.5" fill="#3B82F6"/>
    <rect x="42" y="20" width="60" height="18" fill="#1F2940"/>
    <rect x="42" y="20" width="60" height="2" fill="#2D3849"/>
    <rect x="68" y="38" width="12" height="22" fill="#9CA3AF"/>
    <rect x="64" y="58" width="20" height="4" fill="#B5BAC2"/>
    <rect x="20" y="34" width="16" height="3" fill="#9CA3AF"/>
    <circle cx="22" cy="48" r="3" fill="#E8E8EA"/>
    <circle cx="22" cy="48" r="1" fill="#9CA3AF"/>
    <circle cx="32" cy="48" r="3" fill="#E8E8EA"/>
    <circle cx="32" cy="48" r="1" fill="#9CA3AF"/>
    <rect x="20" y="58" width="3" height="14" fill="#E8E8EA"/>
    <rect x="32" y="58" width="3" height="14" fill="#E8E8EA"/>
    <rect x="42" y="66" width="60" height="10" fill="#E8DFC9"/>
    <rect x="42" y="66" width="60" height="2" fill="#D8CFB5"/>
    <rect x="62" y="62" width="22" height="6" fill="#1F2940"/>
  </svg>`,

  draai: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="84" width="22" height="14" fill="#E8E8EA"/>
    <rect x="92" y="84" width="22" height="14" fill="#E8E8EA"/>
    <rect x="6" y="76" width="108" height="10" fill="#D8DCE0"/>
    <rect x="12" y="36" width="98" height="46" fill="#1F2940"/>
    <rect x="12" y="36" width="98" height="3" fill="#2D3849"/>
    <rect x="12" y="28" width="34" height="40" fill="#9CA3AF"/>
    <rect x="12" y="28" width="34" height="2" fill="#B5BAC2"/>
    <rect x="14" y="30" width="30" height="5" fill="#2D3849"/>
    <polygon points="18,32 20.5,30.5 22,32.5 21,34 19,34" fill="#E84545"/>
    <polygon points="23.5,32 26,30.5 27.5,32.5 26.5,34 24.5,34" fill="#F5C518"/>
    <polygon points="29,32 31.5,30.5 33,32.5 32,34 30,34" fill="#22C55E"/>
    <polygon points="34.5,32 37,30.5 38.5,32.5 37.5,34 35.5,34" fill="#3B82F6"/>
    <circle cx="22" cy="42" r="2" fill="#E8E8EA"/>
    <circle cx="32" cy="42" r="2" fill="#E8E8EA"/>
    <rect x="20" y="48" width="14" height="2" fill="#E8E8EA"/>
    <rect x="20" y="54" width="3" height="6" fill="#E8E8EA"/>
    <rect x="26" y="54" width="3" height="6" fill="#E8E8EA"/>
    <rect x="32" y="54" width="3" height="6" fill="#E8E8EA"/>
    <rect x="46" y="20" width="28" height="18" fill="#E8DFC9"/>
    <rect x="46" y="20" width="28" height="3" fill="#D8CFB5"/>
    <rect x="44" y="48" width="56" height="6" fill="#0F1525"/>
    <rect x="70" y="32" width="36" height="44" fill="#1A1F2E"/>
    <circle cx="82" cy="46" r="6" fill="#E8E8EA"/>
    <circle cx="82" cy="46" r="2" fill="#9CA3AF"/>
    <circle cx="92" cy="54" r="5" fill="#E8E8EA"/>
    <circle cx="92" cy="54" r="1.5" fill="#9CA3AF"/>
    <circle cx="82" cy="60" r="3.5" fill="#E8E8EA"/>
    <rect x="100" y="40" width="14" height="3" fill="#9CA3AF"/>
    <circle cx="114" cy="41.5" r="3" fill="#E8E8EA"/>
    <rect x="58" y="68" width="3" height="14" fill="#9CA3AF"/>
    <polygon points="56,68 63,68 61,72 58,72" fill="#B5BAC2"/>
    <rect x="68" y="62" width="22" height="3" fill="#9CA3AF"/>
  </svg>`,

  slijp: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="84" width="22" height="14" fill="#E8E8EA"/>
    <rect x="84" y="84" width="22" height="14" fill="#E8E8EA"/>
    <rect x="10" y="76" width="100" height="10" fill="#D8DCE0"/>
    <rect x="30" y="32" width="60" height="46" fill="#1F2940"/>
    <rect x="30" y="32" width="60" height="3" fill="#2D3849"/>
    <rect x="26" y="22" width="68" height="12" fill="#E8DFC9"/>
    <rect x="26" y="22" width="68" height="3" fill="#D8CFB5"/>
    <rect x="34" y="40" width="52" height="6" fill="#2D3849"/>
    <polygon points="40,43 42,41.5 44,43 43,45 41,45" fill="#E84545"/>
    <polygon points="48,43 50,41.5 52,43 51,45 49,45" fill="#F5C518"/>
    <polygon points="56,43 58,41.5 60,43 59,45 57,45" fill="#22C55E"/>
    <polygon points="64,43 66,41.5 68,43 67,45 65,45" fill="#3B82F6"/>
    <circle cx="18" cy="52" r="14" fill="#1A1F2E"/>
    <circle cx="18" cy="52" r="11" fill="#9CA3AF"/>
    <circle cx="18" cy="52" r="3" fill="#1F2940"/>
    <circle cx="18" cy="52" r="1" fill="#E8E8EA"/>
    <circle cx="102" cy="52" r="14" fill="#1A1F2E"/>
    <circle cx="102" cy="52" r="11" fill="#9CA3AF"/>
    <circle cx="102" cy="52" r="3" fill="#1F2940"/>
    <circle cx="102" cy="52" r="1" fill="#E8E8EA"/>
    <rect x="38" y="58" width="44" height="14" fill="#1A1F2E"/>
    <rect x="42" y="62" width="36" height="6" fill="#9CA3AF"/>
    <circle cx="50" cy="65" r="1.4" fill="#22C55E"/>
    <circle cx="58" cy="65" r="1.4" fill="#E84545"/>
  </svg>`,

  radiaal: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="86" width="34" height="12" fill="#E8E8EA"/>
    <rect x="8" y="76" width="34" height="10" fill="#D8DCE0"/>
    <rect x="16" y="6" width="22" height="78" fill="#1F2940"/>
    <rect x="16" y="6" width="22" height="3" fill="#2D3849"/>
    <rect x="38" y="14" width="62" height="10" fill="#1F2940"/>
    <rect x="38" y="14" width="62" height="2" fill="#2D3849"/>
    <rect x="78" y="24" width="20" height="22" fill="#1A1F2E"/>
    <rect x="80" y="26" width="16" height="3" fill="#9CA3AF"/>
    <rect x="84" y="46" width="8" height="14" fill="#9CA3AF"/>
    <rect x="82" y="58" width="12" height="3" fill="#B5BAC2"/>
    <rect x="60" y="76" width="40" height="10" fill="#E8DFC9"/>
    <rect x="60" y="76" width="40" height="2" fill="#D8CFB5"/>
    <rect x="72" y="68" width="16" height="8" fill="#1F2940"/>
    <rect x="20" y="14" width="14" height="6" fill="#2D3849"/>
    <circle cx="23" cy="17" r="1.3" fill="#E84545"/>
    <circle cx="27" cy="17" r="1.3" fill="#F5C518"/>
    <circle cx="31" cy="17" r="1.3" fill="#22C55E"/>
    <rect x="22" y="30" width="10" height="2" fill="#9CA3AF"/>
    <rect x="22" y="36" width="6" height="2" fill="#9CA3AF"/>
    <circle cx="27" cy="50" r="3" fill="#E8E8EA"/>
    <circle cx="27" cy="50" r="1" fill="#9CA3AF"/>
    <rect x="38" y="68" width="22" height="4" fill="#1F2940"/>
  </svg>`,

  montage: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="86" width="6" height="12" fill="#9CA3AF"/>
    <rect x="104" y="86" width="6" height="12" fill="#9CA3AF"/>
    <rect x="6" y="34" width="108" height="8" fill="#E8DFC9"/>
    <rect x="6" y="34" width="108" height="2" fill="#D8CFB5"/>
    <rect x="6" y="42" width="108" height="3" fill="#D8CFB5"/>
    <rect x="14" y="45" width="92" height="42" fill="#1F2940"/>
    <rect x="14" y="45" width="92" height="3" fill="#2D3849"/>
    <rect x="18" y="50" width="84" height="9" fill="#9CA3AF"/>
    <rect x="18" y="62" width="84" height="9" fill="#9CA3AF"/>
    <rect x="18" y="74" width="84" height="9" fill="#9CA3AF"/>
    <rect x="55" y="53" width="10" height="3" fill="#E8E8EA"/>
    <rect x="55" y="65" width="10" height="3" fill="#E8E8EA"/>
    <rect x="55" y="77" width="10" height="3" fill="#E8E8EA"/>
    <rect x="24" y="22" width="20" height="12" fill="#9CA3AF"/>
    <rect x="26" y="20" width="16" height="3" fill="#B5BAC2"/>
    <rect x="50" y="26" width="3" height="8" fill="#9CA3AF"/>
    <polygon points="48,18 55,18 58,26 45,26" fill="#E8E8EA"/>
    <rect x="68" y="20" width="22" height="14" fill="#E8DFC9"/>
    <rect x="68" y="20" width="22" height="3" fill="#D8CFB5"/>
    <circle cx="96" cy="28" r="3" fill="#E84545"/>
    <rect x="93" y="22" width="3" height="6" fill="#E8E8EA"/>
  </svg>`,

  'las-robot': `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="84" width="40" height="14" fill="#E8E8EA"/>
    <rect x="20" y="76" width="40" height="10" fill="#D8DCE0"/>
    <rect x="28" y="60" width="24" height="18" fill="#1F2940"/>
    <rect x="28" y="60" width="24" height="3" fill="#2D3849"/>
    <circle cx="40" cy="60" r="8" fill="#1F2940"/>
    <circle cx="40" cy="60" r="5" fill="#9CA3AF"/>
    <rect x="36" y="30" width="10" height="32" fill="#1F2940" transform="rotate(-10 40 46)"/>
    <circle cx="36" cy="32" r="6" fill="#1F2940"/>
    <circle cx="36" cy="32" r="3" fill="#9CA3AF"/>
    <rect x="36" y="28" width="42" height="9" fill="#1F2940" transform="rotate(28 36 32)"/>
    <circle cx="76" cy="44" r="5" fill="#1F2940"/>
    <circle cx="76" cy="44" r="2.5" fill="#9CA3AF"/>
    <rect x="76" y="44" width="6" height="20" fill="#1F2940" transform="rotate(-10 79 54)"/>
    <rect x="76" y="62" width="8" height="3" fill="#9CA3AF" transform="rotate(-10 80 63)"/>
    <circle cx="79" cy="68" r="3" fill="#FBBF24"/>
    <circle cx="79" cy="68" r="5" fill="#FBBF24" opacity="0.4"/>
    <circle cx="84" cy="74" r="1.4" fill="#F5C518"/>
    <circle cx="74" cy="73" r="1.2" fill="#F5C518"/>
    <rect x="32" y="68" width="14" height="3" fill="#2D3849"/>
    <circle cx="36" cy="69.5" r="1" fill="#E84545"/>
    <circle cx="42" cy="69.5" r="1" fill="#22C55E"/>
  </svg>`,

  'las-tafel': `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="86" width="6" height="12" fill="#9CA3AF"/>
    <rect x="104" y="86" width="6" height="12" fill="#9CA3AF"/>
    <rect x="6" y="44" width="108" height="42" fill="#1F2940"/>
    <rect x="6" y="44" width="108" height="3" fill="#2D3849"/>
    <rect x="6" y="40" width="108" height="6" fill="#9CA3AF"/>
    <circle cx="18" cy="43" r="1.6" fill="#1A1F2E"/>
    <circle cx="30" cy="43" r="1.6" fill="#1A1F2E"/>
    <circle cx="42" cy="43" r="1.6" fill="#1A1F2E"/>
    <circle cx="54" cy="43" r="1.6" fill="#1A1F2E"/>
    <circle cx="66" cy="43" r="1.6" fill="#1A1F2E"/>
    <circle cx="78" cy="43" r="1.6" fill="#1A1F2E"/>
    <circle cx="90" cy="43" r="1.6" fill="#1A1F2E"/>
    <circle cx="102" cy="43" r="1.6" fill="#1A1F2E"/>
    <rect x="6" y="84" width="108" height="3" fill="#1A1F2E"/>
    <rect x="44" y="26" width="32" height="14" fill="#E8DFC9"/>
    <rect x="44" y="26" width="32" height="3" fill="#D8CFB5"/>
    <path d="M 108 40 Q 116 28 116 16" stroke="#1A1F2E" stroke-width="2.5" fill="none"/>
    <circle cx="116" cy="16" r="4" fill="#9CA3AF"/>
    <circle cx="116" cy="16" r="1.6" fill="#1F2940"/>
    <rect x="86" y="18" width="3" height="22" fill="#1F2940"/>
    <circle cx="87.5" cy="22" r="2" fill="#FBBF24"/>
    <rect x="78" y="34" width="3" height="8" fill="#9CA3AF"/>
    <rect x="20" y="56" width="14" height="8" fill="#E8DFC9"/>
    <rect x="38" y="58" width="22" height="4" fill="#E8DFC9"/>
  </svg>`,

  'cnc-frees': `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="86" width="22" height="12" fill="#E8E8EA"/>
    <rect x="62" y="86" width="22" height="12" fill="#E8E8EA"/>
    <rect x="6" y="78" width="80" height="10" fill="#D8DCE0"/>
    <rect x="10" y="14" width="76" height="68" fill="#F5C518"/>
    <rect x="10" y="14" width="76" height="3" fill="#FFD84A"/>
    <rect x="14" y="22" width="68" height="42" fill="#1A1F2E"/>
    <rect x="14" y="22" width="68" height="3" fill="#2D3849"/>
    <rect x="38" y="28" width="20" height="22" fill="#9CA3AF"/>
    <rect x="36" y="50" width="24" height="4" fill="#B5BAC2"/>
    <rect x="42" y="42" width="12" height="6" fill="#FBBF24" opacity="0.9"/>
    <rect x="20" y="56" width="56" height="6" fill="#E8DFC9"/>
    <rect x="42" y="52" width="12" height="6" fill="#1F2940"/>
    <rect x="90" y="22" width="22" height="58" fill="#F5C518"/>
    <rect x="90" y="22" width="22" height="3" fill="#FFD84A"/>
    <rect x="94" y="28" width="14" height="14" fill="#1A1F2E"/>
    <rect x="96" y="30" width="10" height="2" fill="#22C55E"/>
    <rect x="96" y="34" width="6" height="1.5" fill="#9CA3AF"/>
    <rect x="96" y="37" width="8" height="1.5" fill="#9CA3AF"/>
    <circle cx="97" cy="50" r="2" fill="#22C55E"/>
    <circle cx="103" cy="50" r="2" fill="#E84545"/>
    <circle cx="97" cy="58" r="2" fill="#F5C518"/>
    <circle cx="103" cy="58" r="2" fill="#3B82F6"/>
    <rect x="94" y="66" width="14" height="3" fill="#2D3849"/>
    <rect x="94" y="72" width="14" height="3" fill="#2D3849"/>
    <rect x="20" y="68" width="56" height="10" fill="#1F2940"/>
    <text x="48" y="76" font-size="7" fill="#F5C518" text-anchor="middle" font-weight="800">CNC</text>
  </svg>`,

  'cnc-draai': `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="86" width="22" height="12" fill="#E8E8EA"/>
    <rect x="64" y="86" width="22" height="12" fill="#E8E8EA"/>
    <rect x="8" y="78" width="84" height="10" fill="#D8DCE0"/>
    <rect x="6" y="26" width="86" height="56" fill="#F5C518"/>
    <rect x="6" y="26" width="86" height="3" fill="#FFD84A"/>
    <rect x="10" y="32" width="78" height="32" fill="#1A1F2E"/>
    <rect x="10" y="32" width="78" height="3" fill="#2D3849"/>
    <circle cx="22" cy="48" r="7" fill="#9CA3AF"/>
    <circle cx="22" cy="48" r="3" fill="#1F2940"/>
    <circle cx="22" cy="48" r="1" fill="#E8E8EA"/>
    <rect x="22" y="46" width="48" height="4" fill="#9CA3AF"/>
    <rect x="55" y="42" width="6" height="12" fill="#FBBF24"/>
    <rect x="14" y="68" width="70" height="10" fill="#1F2940"/>
    <text x="49" y="76" font-size="7" fill="#F5C518" text-anchor="middle" font-weight="800">CNC</text>
    <rect x="96" y="32" width="16" height="46" fill="#F5C518"/>
    <rect x="96" y="32" width="16" height="3" fill="#FFD84A"/>
    <rect x="100" y="38" width="8" height="10" fill="#1A1F2E"/>
    <rect x="101" y="40" width="6" height="1.5" fill="#22C55E"/>
    <rect x="101" y="43" width="4" height="1.5" fill="#9CA3AF"/>
    <circle cx="101" cy="55" r="1.8" fill="#22C55E"/>
    <circle cx="107" cy="55" r="1.8" fill="#E84545"/>
    <circle cx="101" cy="62" r="1.8" fill="#F5C518"/>
    <circle cx="107" cy="62" r="1.8" fill="#3B82F6"/>
    <rect x="100" y="70" width="8" height="3" fill="#2D3849"/>
  </svg>`,

  rek: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="6" width="6" height="86" fill="#1F2940"/>
    <rect x="106" y="6" width="6" height="86" fill="#1F2940"/>
    <rect x="14" y="6" width="92" height="6" fill="#1F2940"/>
    <rect x="14" y="6" width="92" height="2" fill="#2D3849"/>
    <rect x="14" y="28" width="92" height="3" fill="#2D3849"/>
    <rect x="14" y="50" width="92" height="3" fill="#2D3849"/>
    <rect x="14" y="72" width="92" height="3" fill="#2D3849"/>
    <rect x="14" y="86" width="92" height="6" fill="#1F2940"/>
    <rect x="18" y="14" width="20" height="14" fill="#E84545"/>
    <rect x="18" y="14" width="20" height="3" fill="#FF6B5B"/>
    <rect x="42" y="16" width="14" height="12" fill="#E84545"/>
    <rect x="60" y="14" width="24" height="14" fill="#E84545"/>
    <rect x="60" y="14" width="24" height="3" fill="#FF6B5B"/>
    <rect x="86" y="18" width="16" height="10" fill="#E84545"/>
    <rect x="18" y="36" width="34" height="14" fill="#E84545"/>
    <rect x="18" y="36" width="34" height="3" fill="#FF6B5B"/>
    <rect x="56" y="38" width="22" height="12" fill="#E84545"/>
    <rect x="82" y="36" width="20" height="14" fill="#E84545"/>
    <rect x="82" y="36" width="20" height="3" fill="#FF6B5B"/>
    <rect x="18" y="58" width="16" height="14" fill="#E84545"/>
    <rect x="18" y="58" width="16" height="3" fill="#FF6B5B"/>
    <rect x="38" y="60" width="40" height="12" fill="#E84545"/>
    <rect x="82" y="58" width="20" height="14" fill="#E84545"/>
    <rect x="82" y="58" width="20" height="3" fill="#FF6B5B"/>
    <rect x="18" y="78" width="84" height="8" fill="#E84545"/>
    <rect x="18" y="78" width="84" height="2" fill="#FF6B5B"/>
  </svg>`,

  pc: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="86" width="6" height="12" fill="#9CA3AF"/>
    <rect x="110" y="86" width="6" height="12" fill="#9CA3AF"/>
    <rect x="6" y="68" width="108" height="20" fill="#E8DFC9"/>
    <rect x="6" y="68" width="108" height="3" fill="#D8CFB5"/>
    <rect x="30" y="18" width="60" height="44" fill="#1F2940"/>
    <rect x="30" y="18" width="60" height="3" fill="#2D3849"/>
    <rect x="34" y="22" width="52" height="34" fill="#1A1F2E"/>
    <rect x="38" y="26" width="24" height="3" fill="#3B82F6"/>
    <rect x="38" y="32" width="36" height="2" fill="#9CA3AF"/>
    <rect x="38" y="36" width="30" height="2" fill="#9CA3AF"/>
    <rect x="38" y="40" width="34" height="2" fill="#9CA3AF"/>
    <rect x="38" y="44" width="28" height="2" fill="#9CA3AF"/>
    <rect x="38" y="48" width="32" height="2" fill="#9CA3AF" opacity="0.7"/>
    <rect x="56" y="62" width="8" height="8" fill="#1F2940"/>
    <rect x="44" y="72" width="32" height="6" fill="#1F2940"/>
    <rect x="48" y="74" width="2" height="2" fill="#9CA3AF"/>
    <rect x="52" y="74" width="2" height="2" fill="#9CA3AF"/>
    <rect x="56" y="74" width="2" height="2" fill="#9CA3AF"/>
    <rect x="60" y="74" width="2" height="2" fill="#9CA3AF"/>
    <rect x="64" y="74" width="2" height="2" fill="#9CA3AF"/>
    <rect x="68" y="74" width="2" height="2" fill="#9CA3AF"/>
    <rect x="86" y="76" width="14" height="3" fill="#1F2940"/>
  </svg>`,

  meet: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="86" width="6" height="12" fill="#9CA3AF"/>
    <rect x="104" y="86" width="6" height="12" fill="#9CA3AF"/>
    <rect x="14" y="50" width="92" height="6" fill="#374151"/>
    <rect x="14" y="50" width="92" height="2" fill="#4B5563"/>
    <circle cx="22" cy="53" r="0.8" fill="#9CA3AF"/>
    <circle cx="32" cy="54" r="0.8" fill="#9CA3AF"/>
    <circle cx="42" cy="53" r="0.8" fill="#9CA3AF"/>
    <circle cx="52" cy="54" r="0.8" fill="#9CA3AF"/>
    <circle cx="62" cy="53" r="0.8" fill="#9CA3AF"/>
    <circle cx="72" cy="54" r="0.8" fill="#9CA3AF"/>
    <circle cx="82" cy="53" r="0.8" fill="#9CA3AF"/>
    <circle cx="92" cy="54" r="0.8" fill="#9CA3AF"/>
    <rect x="14" y="56" width="92" height="30" fill="#1F2940"/>
    <rect x="14" y="56" width="92" height="3" fill="#2D3849"/>
    <rect x="48" y="22" width="24" height="28" fill="#E8DFC9"/>
    <rect x="48" y="22" width="24" height="3" fill="#D8CFB5"/>
    <circle cx="60" cy="36" r="6" fill="#1F2940"/>
    <circle cx="60" cy="36" r="2" fill="#22C55E"/>
    <rect x="56" y="14" width="8" height="10" fill="#9CA3AF"/>
    <rect x="20" y="44" width="18" height="6" fill="#9CA3AF"/>
    <rect x="76" y="46" width="14" height="4" fill="#1F2940"/>
  </svg>`,

  generic: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="84" width="22" height="14" fill="#E8E8EA"/>
    <rect x="92" y="84" width="22" height="14" fill="#E8E8EA"/>
    <rect x="6" y="76" width="108" height="10" fill="#D8DCE0"/>
    <rect x="14" y="34" width="92" height="46" fill="#1F2940"/>
    <rect x="14" y="34" width="92" height="3" fill="#2D3849"/>
    <rect x="10" y="22" width="40" height="14" fill="#E8DFC9"/>
    <rect x="10" y="22" width="40" height="3" fill="#D8CFB5"/>
    <rect x="22" y="42" width="20" height="6" fill="#2D3849"/>
    <polygon points="26,44.5 28,43 30,44.5 29,46.5 27,46.5" fill="#E84545"/>
    <polygon points="32,44.5 34,43 36,44.5 35,46.5 33,46.5" fill="#F5C518"/>
    <polygon points="38,44.5 40,43 42,44.5 41,46.5 39,46.5" fill="#22C55E"/>
    <circle cx="64" cy="56" r="6" fill="#9CA3AF"/>
    <circle cx="64" cy="56" r="2" fill="#1F2940"/>
    <rect x="80" y="50" width="16" height="20" fill="#1A1F2E"/>
  </svg>`,
};

function getMachineSvg(machineId) {
  const type = MACHINE_TYPE[machineId] || 'generic';
  return MACHINE_SVG[type] || MACHINE_SVG.generic;
}
const state = {
  zoneIndex: 0,
  currentUser: null,
  selectedMachine: null,
  selectedManipulator: null,
  activeInfoTab: 'veiligheid',
  activeEditTab: 'basis',
  editMode: false,
  machines: JSON.parse(JSON.stringify(MACHINES)),
  placements: {},
};

const KNOWN_MACHINE_NAMES = new Set();
function buildKnownNamesIndex() {
  KNOWN_MACHINE_NAMES.clear();
  state.machines.forEach(m => {
    KNOWN_MACHINE_NAMES.add(m.id);
    KNOWN_MACHINE_NAMES.add(m.name);
    KNOWN_MACHINE_NAMES.add(m.id.replace(/-/g, ' '));
    KNOWN_MACHINE_NAMES.add(m.id.replace(/-/g, '_'));
  });
}
function machineFromSplineName(name) {
  if (!name) return null;
  return state.machines.find(m =>
    m.id === name || m.name === name ||
    m.id.replace(/-/g, ' ') === name ||
    m.id.replace(/-/g, '_') === name ||
    (m.name && m.name.toLowerCase() === name.toLowerCase())
  );
}

const ZONE_VIEWPORTS = {
  algemeen: { scale: 1.0,  x: 0,   y: 0   },
  blauw:    { scale: 1.7,  x: 6,   y: 6   },
  groen:    { scale: 1.8,  x: -4,  y: 5   },
  rood:     { scale: 1.9,  x: -20, y: 3   },
  geel:     { scale: 1.8,  x: 6,   y: -8  },
  oranje:   { scale: 1.9,  x: -22, y: -10 },
};
function applyZoneZoom(zoneKey) {
  const vp = ZONE_VIEWPORTS[zoneKey] || ZONE_VIEWPORTS.algemeen;
  const wrap = $('#scene-wrap');
  if (wrap) {
    wrap.style.transform = `scale(${vp.scale}) translate(${vp.x}%, ${vp.y}%)`;
  }
}

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const STORAGE_KEY = 'werkplaats-placements-v1';
const STORAGE_KEY_EDITS = 'werkplaats-edits-v1';
let splineReady = false;

function _hasLocalStorage() {
  try {
    return typeof localStorage !== 'undefined' && localStorage !== null;
  } catch (e) { return false; }
}
function _hasWindowStorage() {
  return typeof window !== 'undefined' && typeof window.storage !== 'undefined';
}

const SharedStore = {
  available() { return _hasWindowStorage() || _hasLocalStorage(); },

  async load(key) {
    if (_hasWindowStorage()) {
      try {
        const r = await window.storage.get(key, true);
        if (r?.value) return JSON.parse(r.value);
      } catch (e) {}
    }
    if (_hasLocalStorage()) {
      try {
        const v = localStorage.getItem(key);
        if (v) return JSON.parse(v);
      } catch (e) {}
    }
    return null;
  },

  async save(key, data) {
    let ok = false;
    if (_hasWindowStorage()) {
      try {
        await window.storage.set(key, JSON.stringify(data), true);
        ok = true;
      } catch (e) { console.warn('window.storage save failed:', e); }
    }
    if (_hasLocalStorage()) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        ok = true;
      } catch (e) { console.warn('localStorage save failed:', e); }
    }
    return ok;
  },
};

async function loadPlacementsFromStorage() {
  const data = await SharedStore.load(STORAGE_KEY);
  if (data && typeof data === 'object') {
    state.placements = data;
    const count = Object.keys(state.placements).length;
    if (count > 0) {
      console.log(`✓ ${count} machine-plaatsing(en) geladen uit gedeelde opslag`);
      if (splineReady) applyAllPlacementsToScene();
      renderPlacementMarkers();
    }
  }
}

async function savePlacementsToStorage() {
  const ok = await SharedStore.save(STORAGE_KEY, state.placements);
  if (ok) updateSyncIndicator(true);
}

async function loadEditsFromStorage() {
  const edits = await SharedStore.load(STORAGE_KEY_EDITS);
  if (edits && typeof edits === 'object') {
    let applied = 0;
    let deleted = 0;
    Object.entries(edits).forEach(([id, overrides]) => {
      if (overrides && overrides._deleted) {
        state.machines = state.machines.filter(x => x.id !== id);
        deleted++;
        return;
      }
      const m = state.machines.find(x => x.id === id);
      if (m) { Object.assign(m, overrides); applied++; }
    });
    if (applied > 0) console.log(`✓ ${applied} machine-bewerking(en) geladen`);
    if (deleted > 0) console.log(`✓ ${deleted} machine(s) gewist (uit gedeelde opslag)`);
    if (applied + deleted > 0) renderMachineList();
  }
}

async function saveMachineEditToStorage(machine) {
  if (!SharedStore.available()) return;
  try {
    const edits = (await SharedStore.load(STORAGE_KEY_EDITS)) || {};
    edits[machine.id] = {
      name: machine.name,
      description: machine.description,
      zone: machine.zone,
      veiligheid: machine.veiligheid,
      handleiding: machine.handleiding,
      controle: machine.controle,
      smering: machine.smering,
    };
    await SharedStore.save(STORAGE_KEY_EDITS, edits);
    updateSyncIndicator(true);
  } catch (e) {
    console.warn('Bewerking opslaan mislukt:', e);
  }
}

async function saveDeletedMachineToStorage(machineId) {
  if (!SharedStore.available()) return;
  try {
    const edits = (await SharedStore.load(STORAGE_KEY_EDITS)) || {};
    edits[machineId] = { _deleted: true, deletedAt: Date.now() };
    await SharedStore.save(STORAGE_KEY_EDITS, edits);
    updateSyncIndicator(true);
  } catch (e) {
    console.warn('Verwijdering opslaan mislukt:', e);
  }
}

function applyAllPlacementsToScene() {
  if (!window._spline) return;
  let applied = 0;
  Object.entries(state.placements).forEach(([id, p]) => {
    const m = state.machines.find(x => x.id === id);
    if (!m) return;
    const obj = findSplineObject(m);
    if (!obj) return;
    try {
      if (p.sceneX !== undefined && obj.position) obj.position.x = p.sceneX;
      if (p.sceneZ !== undefined && obj.position) obj.position.z = p.sceneZ;
      if (p.rotation !== undefined && obj.rotation) {
        obj.rotation.y = (p.rotation * Math.PI) / 180;
      }
      if (obj.visible !== undefined) obj.visible = true;
      applied++;
    } catch (e) {}
  });
  if (applied > 0) console.log(`✓ ${applied} object(en) gepositioneerd in Spline-scene`);
}

let syncIndicatorTimer;
function updateSyncIndicator(synced) {
  const el = $('#sync-indicator');
  if (!el) return;
  if (synced) {
    el.classList.remove('hidden');
    el.classList.add('synced');
    clearTimeout(syncIndicatorTimer);
    syncIndicatorTimer = setTimeout(() => el.classList.add('hidden'), 1800);
  }
}

function updateDateTime() {
  const now = new Date();
  const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
  const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  $('#date-text').textContent = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}`;
  $('#time-text').textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}
updateDateTime();
setInterval(updateDateTime, 30000);

const splineApp = new Application(document.getElementById('canvas3d'));
const SCENE_URL = 'https://prod.spline.design/4hTcjYfXB7qqpJnw/scene.splinecode';

splineApp.load(SCENE_URL)
  .then(() => {
    setTimeout(() => $('#scene-loader').classList.add('fade'), 200);
    window._spline = splineApp;
    splineReady = true;
    buildKnownNamesIndex();
    applyAllPlacementsToScene();
    applyZoneZoom(ZONE_ORDER[state.zoneIndex]);
    setupSplineClickHandling();
    setupCanvasRaycastClick();
    setTimeout(() => {
      try {
        const objs = splineApp.getAllObjects ? splineApp.getAllObjects() : [];
        if (objs.length) {
          console.log('Spline objects:', objs.map(o => o.name).filter(Boolean));
        }
      } catch (e) {}
    }, 500);
  })
  .catch((err) => {
    console.warn('Spline scene kon niet laden:', err);
    $('#scene-loader').innerHTML = `
      <div style="text-align:center; max-width:340px;">
        <p style="font-weight:600; color:#1A1A1A; margin-bottom:8px;">3D-scene niet bereikbaar</p>
        <p style="font-size:0.88rem; color:#888;">Spline kon niet laden (offline of CORS). De interface werkt verder normaal.</p>
      </div>`;
  });
const customMappings = {};
const STORAGE_KEY_MAPPINGS = 'werkplaats-mappings-v1';

async function loadMappingsFromStorage() {
  const data = await SharedStore.load(STORAGE_KEY_MAPPINGS);
  if (data && typeof data === 'object') {
    Object.assign(customMappings, data);
    Object.keys(customMappings).forEach(name => KNOWN_MACHINE_NAMES.add(name));
    const count = Object.keys(customMappings).length;
    if (count > 0) console.log(`✓ ${count} object-koppelingen geladen uit storage`);
  }
}

async function saveMappingsToStorage() {
  await SharedStore.save(STORAGE_KEY_MAPPINGS, customMappings);
  updateSyncIndicator(true);
}
let lastClickHandled = 0;
function handleObjectClick(splineName, source) {
  const now = Date.now();
  if (now - lastClickHandled < 400) return;
  lastClickHandled = now;

  console.log(`\n━━━ KLIK GEDETECTEERD ━━━`);
  console.log(`Source: ${source}  |  Object: "${splineName}"`);

  const mapped = customMappings[splineName];
  if (mapped === '__none__') {
    console.log('  → gemarkeerd als geen-machine, klik genegeerd');
    return;
  }
  if (mapped) {
    const m = state.machines.find(x => x.id === mapped);
    if (m) {
      console.log(`  → custom mapping → ${m.name}`);
      openMachineForRole(m);
      return;
    }
  }

  const machine = machineFromSplineName(splineName);
  if (machine) {
    console.log(`  → auto-match → ${machine.name}`);
    openMachineForRole(machine);
    return;
  }

  console.log(`  → onbekend object`);
  if (state.currentUser) {
    console.log(`  → admin: koppel-modal opent`);
    showObjectMapperModal(splineName);
  } else {
    console.log(`  → student: niet gekoppeld — geen actie`);
  }
}

function openMachineForRole(machine) {
  if (state.editMode && state.currentUser) {
    openManipulator(machine.id);
  } else {
    openInfo(machine.id);
  }
}

function setupSplineClickHandling() {
  if (!splineApp?.addEventListener) {
    console.warn('⚠ Spline addEventListener niet beschikbaar');
    return;
  }
  splineApp.addEventListener('mouseDown', (e) => {
    const name = e?.target?.name || '';
    console.log('🖱️  [Spline mouseDown]', { name, targetType: e?.target?.constructor?.name });
    if (name) {
      handleObjectClick(name, 'spline-event');
    } else {
      console.log('  ↳ Object heeft geen naam in Spline. Klik wordt niet doorgestuurd.');
    }
  });
  console.log('✓ Spline mouseDown listener geactiveerd');

  setTimeout(() => {
    try {
      const objs = splineApp.getAllObjects ? splineApp.getAllObjects() : [];
      const named = objs.filter(o => o.name && o.name.trim() !== '');
      console.log(`📋 Spline-scene heeft ${objs.length} objecten (${named.length} met naam):`);
      named.slice(0, 50).forEach(o => console.log(`   • "${o.name}"`));
      if (named.length > 50) console.log(`   ... + ${named.length - 50} meer`);
      if (named.length === 0) {
        console.warn('⚠ GEEN OBJECTEN MET NAMEN! In Spline editor: selecteer elk object → geef het een naam → save scene.');
      }
    } catch (e) {
      console.warn('getAllObjects faalde:', e);
    }
  }, 800);
}

const raycaster = new THREE.Raycaster();
const mouseNDC = new THREE.Vector2();
let _splineSceneCam = null;

function findSplineSceneAndCamera() {
  if (_splineSceneCam) return _splineSceneCam;
  if (!splineApp) return null;

  const visited = new WeakSet();
  let scene = null;
  let camera = null;
  const candidateCameras = [];
  const candidateScenes = [];

  function search(obj, depth) {
    if (depth > 10 || !obj || typeof obj !== 'object') return;
    try {
      if (visited.has(obj)) return;
      visited.add(obj);
    } catch (e) { return; }

    if (obj.isScene === true) candidateScenes.push(obj);
    if (obj.isCamera === true ||
        (obj.projectionMatrix && obj.matrixWorld && typeof obj.fov === 'number')) {
      candidateCameras.push(obj);
    }

    let keys;
    try { keys = Object.keys(obj); } catch (e) { return; }
    for (const key of keys) {
      if (key.startsWith('__') || key === 'parent' || key === 'children') continue;
      try { search(obj[key], depth + 1); } catch (e) {}
    }
  }

  search(splineApp, 0);

  if (candidateScenes.length) {
    scene = candidateScenes.reduce((a, b) =>
      (a.children?.length || 0) >= (b.children?.length || 0) ? a : b);
  }
  
  if (candidateCameras.length) {
    camera = candidateCameras[0];
  }

  console.log(`🔍 Brute-force search: ${candidateScenes.length} scene(s), ${candidateCameras.length} camera(s) gevonden`);
  if (scene && camera) {
    console.log(`✓ Gebruik scene met ${scene.children?.length || 0} children + camera (fov=${camera.fov || '?'})`);
    _splineSceneCam = { scene, camera };
    return _splineSceneCam;
  }
  console.warn('⚠ Kon Spline scene/camera NIET vinden — raycasting onmogelijk');
  return null;
}

function setupCanvasRaycastClick() {
  const canvas = $('#canvas3d');
  if (!canvas) {
    console.warn('⚠ Canvas #canvas3d niet gevonden voor raycast setup');
    return;
  }

  canvas.addEventListener('click', (e) => {
    if (!splineReady) {
      console.log('🖱️  [Canvas click] Spline nog niet klaar — wacht even');
      return;
    }
    console.log('🖱️  [Canvas click] op', e.clientX, e.clientY);

    const sc = findSplineSceneAndCamera();
    if (!sc) {
      console.warn('  ↳ Geen scene/camera bereikbaar via raycasting');
      return;
    }

    const rect = canvas.getBoundingClientRect();
    mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    console.log(`  ↳ NDC: (${mouseNDC.x.toFixed(2)}, ${mouseNDC.y.toFixed(2)})`);

    raycaster.setFromCamera(mouseNDC, sc.camera);
    const hits = raycaster.intersectObjects(sc.scene.children, true);
    if (hits.length === 0) {
      console.log('  ↳ Geen 3D-object op deze positie (klik op lege ruimte?)');
      return;
    }
    console.log(`  ↳ ${hits.length} raycast hits`);

    let obj = hits[0].object;
    let depth = 0;
    while (obj && depth < 15) {
      if (obj.name && obj.name.trim() !== '') {
        console.log(`  ↳ Naam gevonden op depth ${depth}: "${obj.name}"`);
        handleObjectClick(obj.name, 'raycast');
        return;
      }
      obj = obj.parent;
      depth++;
    }
    console.log('  ↳ Hit gevonden maar geen genaamde ancestor — geef object een naam in Spline');
  });
  console.log('✓ Canvas click listener actief (raycasting)');
}

function showObjectMapperModal(splineName) {
  document.querySelectorAll('.object-mapper-overlay').forEach(el => el.remove());

  const overlay = document.createElement('div');
  overlay.className = 'modal object-mapper-overlay';
  overlay.innerHTML = `
    <div class="modal-panel" style="max-width:540px;display:flex;flex-direction:column;">
      <button class="modal-close" data-close-mapper aria-label="Sluiten">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <h2 style="font-family:var(--font-display);color:var(--orange);font-size:1.5rem;font-weight:800;margin-bottom:6px;padding-right:32px;">3D-object koppelen</h2>
      <p style="color:var(--muted);font-size:0.92rem;margin-bottom:14px;">
        Klik op een machine in de lijst om dit Spline-object te koppelen. Eenmalig instellen — daarna opent het info-paneel automatisch voor iedereen.
      </p>
      <div style="background:#F4F4F5;padding:10px 14px;border-radius:8px;font-family:monospace;font-size:0.85rem;margin-bottom:18px;word-break:break-all;color:var(--ink);">
        Spline-object: <strong>${escapeHtml(splineName)}</strong>
      </div>
      <div class="mapper-list" style="overflow-y:auto;max-height:42vh;padding-right:4px;margin:0 -4px;"></div>
      <div style="display:flex;gap:8px;margin-top:16px;align-items:center;border-top:1px solid var(--line);padding-top:14px;">
        <button class="btn-ghost" data-close-mapper style="width:auto;padding:10px 18px;">Annuleren</button>
        <button class="btn-ghost" data-mark-none style="width:auto;padding:10px 18px;color:#888;margin-left:auto;">Geen machine →  negeren</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const list = overlay.querySelector('.mapper-list');
  state.machines.forEach(m => {
    const row = document.createElement('div');
    row.className = 'machine-row';
    row.style.cssText = 'cursor:pointer;margin:2px 4px;';
    row.innerHTML = `
      <div class="machine-icon zone-${m.zone}">${getMachineSvg(m.id)}</div>
      <div class="machine-info">
        <h3>${escapeHtml(m.name)}</h3>
        <p>${escapeHtml(ZONES[m.zone].label)}</p>
      </div>
    `;
    row.addEventListener('click', () => {
      customMappings[splineName] = m.id;
      KNOWN_MACHINE_NAMES.add(splineName);
      saveMappingsToStorage();
      overlay.remove();
      showToast(`✓ "${splineName}" gekoppeld aan ${m.name} — voor iedereen`);
      openInfo(m.id);
    });
    list.appendChild(row);
  });

  overlay.querySelectorAll('[data-close-mapper]').forEach(btn => {
    btn.addEventListener('click', () => overlay.remove());
  });
  overlay.querySelector('[data-mark-none]').addEventListener('click', () => {
    customMappings[splineName] = '__none__';
    saveMappingsToStorage();
    overlay.remove();
    showToast(`"${splineName}" gemarkeerd als geen-machine — wordt voortaan genegeerd`);
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

function findSplineObject(machine) {
  if (!window._spline) return null;
  const tries = [
    machine.id,
    machine.name,
    machine.name.charAt(0).toUpperCase() + machine.name.slice(1),
    machine.id.replace(/-/g, ' '),
    machine.id.replace(/-/g, '_'),
  ];
  for (const name of tries) {
    try {
      const obj = window._spline.findObjectByName(name);
      if (obj) return obj;
    } catch (e) {}
  }
  return null;
}

function renderZone() {
  const zoneKey = ZONE_ORDER[state.zoneIndex];
  const zone = ZONES[zoneKey];
  $('#zone-text').textContent = zone.label;
  $('#zone-pin').classList.toggle('hidden', !zone.showPin);
  $$('.legend-item').forEach(el => el.classList.toggle('active', el.dataset.zone === zoneKey));
  $('#list-zone-text').textContent = zone.label;
  $('#list-zone-pin').classList.toggle('hidden', !zone.showPin);
  renderMachineList();
  applyZoneZoom(zoneKey);
  triggerSplineZoom(zoneKey);
}

function triggerSplineZoom(zoneKey) {
  if (!window._spline) return;
  try {
    const obj = window._spline.findObjectByName(zoneKey) || window._spline.findObjectByName(ZONES[zoneKey].label);
    if (obj) window._spline.emitEvent('mouseDown', obj.name);
  } catch (e) {}
}

$('#zone-prev').addEventListener('click', () => { state.zoneIndex = (state.zoneIndex - 1 + ZONE_ORDER.length) % ZONE_ORDER.length; renderZone(); });
$('#zone-next').addEventListener('click', () => { state.zoneIndex = (state.zoneIndex + 1) % ZONE_ORDER.length; renderZone(); });
$('#list-prev').addEventListener('click', () => { state.zoneIndex = (state.zoneIndex - 1 + ZONE_ORDER.length) % ZONE_ORDER.length; renderZone(); });
$('#list-next').addEventListener('click', () => { state.zoneIndex = (state.zoneIndex + 1) % ZONE_ORDER.length; renderZone(); });

$$('.legend-item').forEach(el => {
  el.addEventListener('click', () => {
    const idx = ZONE_ORDER.indexOf(el.dataset.zone);
    if (idx >= 0) { state.zoneIndex = idx; renderZone(); }
  });
});

function renderMachineList() {
  const zoneKey = ZONE_ORDER[state.zoneIndex];
  const list = $('#machine-list');
  list.innerHTML = '';

  const filtered = zoneKey === 'algemeen'
    ? state.machines
    : state.machines.filter(m => m.zone === zoneKey);

  if (filtered.length === 0) {
    list.innerHTML = '<p style="text-align:center; color:#888; padding:30px;">Geen machines in deze zone.</p>';
    return;
  }

  filtered.forEach(m => {
    const zone = ZONES[m.zone];
    const row = document.createElement('div');
    row.className = 'machine-row';
    if (state.selectedMachine === m.id) row.classList.add('selected');

    const adminButtons = state.currentUser ? `
      <div class="machine-actions">
        ${state.editMode ? `
        <button class="machine-action" data-manip="${m.id}" title="Verplaatsen/Roteren in 3D">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>
        </button>` : ''}
        <button class="machine-action" data-edit="${m.id}" title="Inhoud bewerken">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="machine-action delete" data-delete="${m.id}" title="Machine wissen">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg>
        </button>
      </div>
    ` : '';

    row.innerHTML = `
      <div class="machine-icon zone-${m.zone}">${getMachineSvg(m.id)}</div>
      <div class="machine-info">
        <h3>${escapeHtml(m.name)}</h3>
        <p>${escapeHtml(zone.label)}</p>
      </div>
      ${adminButtons}
    `;
    row.addEventListener('click', (e) => {
      if (e.target.closest('[data-manip]'))       openManipulator(m.id);
      else if (e.target.closest('[data-edit]'))   openEditModal(m.id);
      else if (e.target.closest('[data-delete]')) deleteMachine(m.id);
      else                                         openInfo(m.id);
    });
    list.appendChild(row);
  });
}

let infoSpline = null;
let infoSplineLoadPromise = null;

async function getOrInitInfoSpline() {
  if (infoSpline) return infoSpline;
  if (infoSplineLoadPromise) return infoSplineLoadPromise;
  infoSplineLoadPromise = (async () => {
    const canvas = $('#info-canvas-3d');
    if (!canvas) return null;
    try {
      const app = new Application(canvas);
      await app.load(SCENE_URL);
      infoSpline = app;
      console.log('✓ Info-Spline geladen');
      return app;
    } catch (e) {
      console.warn('Info-Spline kon niet laden:', e);
      return null;
    } finally {
      infoSplineLoadPromise = null;
    }
  })();
  return infoSplineLoadPromise;
}

async function focusInfoOn(machine) {
  const loader = $('#info-3d-loader');
  const fallback = $('#info-3d-fallback');
  const canvas = $('#info-canvas-3d');
  loader?.classList.remove('hidden');
  fallback?.classList.add('hidden');
  canvas?.classList.remove('hidden');

  try {
    const app = await getOrInitInfoSpline();
    if (!app) throw new Error('Spline niet beschikbaar');

    if (KNOWN_MACHINE_NAMES.size === 0) buildKnownNamesIndex();
    const myNames = new Set([
      machine.id, machine.name,
      machine.id.replace(/-/g, ' '),
      machine.id.replace(/-/g, '_'),
    ]);

    const allObjs = app.getAllObjects ? app.getAllObjects() : [];
    let foundInScene = false;
    for (const obj of allObjs) {
      if (!obj?.name || obj.visible === undefined) continue;
      if (KNOWN_MACHINE_NAMES.has(obj.name)) {
        const isThis = myNames.has(obj.name);
        try {
          obj.visible = isThis;
          if (isThis) foundInScene = true;
        } catch (e) {}
      }
    }

    try { app.emitEvent('lookAt', machine.id); } catch (e) {}
    try { app.emitEvent('mouseHover', machine.id); } catch (e) {}

    if (!foundInScene) {
      canvas?.classList.add('hidden');
      if (fallback) {
        fallback.innerHTML = getMachineSvg(machine.id);
        fallback.classList.remove('hidden');
      }
    }
  } catch (e) {
    canvas?.classList.add('hidden');
    if (fallback) {
      fallback.innerHTML = getMachineSvg(machine.id);
      fallback.classList.remove('hidden');
    }
  } finally {
    setTimeout(() => loader?.classList.add('hidden'), 200);
  }
}

function openInfo(machineId) {
  const m = state.machines.find(x => x.id === machineId);
  if (!m) return;
  state.selectedMachine = machineId;
  state.activeInfoTab = 'veiligheid';

  const zone = ZONES[m.zone];
  $('#info-title').textContent = m.name;
  $('#info-zone-tag').textContent = zone.label;
  $('#info-zone-tag').style.background = zone.color;

  $$('.info-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'veiligheid'));
  renderInfoBody(m);
  closeAllModals();
  $('#info-modal').classList.remove('hidden');

  focusInfoOn(m);

  renderMachineList();
}

function renderInfoBody(m) {
  const body = $('#info-body');
  const tab = state.activeInfoTab;
  if (tab === 'veiligheid' && m.veiligheid) {
    body.innerHTML = `
      <p>${escapeHtml(m.description || '')}</p>
      <h4>Verplichte PBM</h4>
      <ul>${(m.veiligheid.pbm || []).map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>
      <h4>Veiligheidsregels</h4>
      <ul>${(m.veiligheid.regels || []).map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>
      <div class="warning-band">⚠️ Bij twijfel of incident: machine direct stoppen via noodstop en docent verwittigen.</div>
    `;
  } else if (tab === 'handleiding' && m.handleiding) {
    body.innerHTML = `
      <h4>Werkstappen</h4>
      <ol style="padding-left:22px;">${(m.handleiding.stappen || []).map(s => `<li style="margin:8px 0; color:var(--ink-2); font-size:0.92rem;">${escapeHtml(s)}</li>`).join('')}</ol>
    `;
  } else if (tab === 'controle' && m.controle) {
    body.innerHTML = `<h4>Onderhoudsschema</h4><ul>${m.controle.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>`;
  } else if (tab === 'smering' && m.smering) {
    body.innerHTML = `<h4>Smeerpunten</h4><ul>${m.smering.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>`;
  } else {
    body.innerHTML = `<p style="color:#888;">Geen gegevens beschikbaar voor dit tabblad.</p>`;
  }
}

$$('.info-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    state.activeInfoTab = tab.dataset.tab;
    $$('.info-tab').forEach(t => t.classList.toggle('active', t === tab));
    const m = state.machines.find(x => x.id === state.selectedMachine);
    if (m) renderInfoBody(m);
  });
});

$('#auth-btn').addEventListener('click', () => {
  if (state.currentUser) {
    state.currentUser = null;
    state.editMode = false;
    state.selectedManipulator = null;
    $('#user-name').classList.add('hidden');
    $('#edit-mode-btn').classList.add('hidden');
    $('#admin-drawer').classList.add('hidden');
    $('#manipulator-panel').classList.add('hidden');
    $('#auth-btn').innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>`;
    renderMachineList();
    showToast('Afgemeld');
  } else {
    closeAllModals();
    $('#login-modal').classList.remove('hidden');
    $('#login-user').focus();
  }
});

$('#login-submit').addEventListener('click', tryLogin);
$('#login-pass').addEventListener('keydown', (e) => { if (e.key === 'Enter') tryLogin(); });

function tryLogin() {
  const user = $('#login-user').value.trim().toLowerCase();
  const pass = $('#login-pass').value;
  const match = USERS[user];
  if (match && match.password === pass) {
    state.currentUser = match;
    $('#user-name').textContent = match.name;
    $('#user-name').classList.remove('hidden');
    $('#edit-mode-btn').classList.remove('hidden');
    $('#login-modal').classList.add('hidden');
    $('#login-error').classList.add('hidden');
    $('#login-user').value = '';
    $('#login-pass').value = '';
    $('#auth-btn').innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`;
    renderMachineList();
    showToast(`Welkom, ${match.name} — bewerk & wis-knoppen actief in de lijst`);
  } else {
    $('#login-error').classList.remove('hidden');
    $('#login-pass').value = '';
  }
}

$('#edit-mode-btn').addEventListener('click', () => {
  state.editMode = !state.editMode;
  $('#edit-mode-btn').classList.toggle('active', state.editMode);
  $('#admin-drawer').classList.toggle('hidden', !state.editMode);
  if (!state.editMode) {
    $('#manipulator-panel').classList.add('hidden');
    state.selectedManipulator = null;
  }
  if (state.editMode) {
    renderDrawer();
    showToast('Bewerkmodus actief — klik op een machine om te verplaatsen/roteren');
  } else {
    showToast('Bewerkmodus uit');
  }
  renderMachineList();
});

$('#drawer-back').addEventListener('click', () => {
  state.editMode = false;
  state.selectedManipulator = null;
  $('#edit-mode-btn').classList.remove('active');
  $('#admin-drawer').classList.add('hidden');
  $('#manipulator-panel').classList.add('hidden');
  renderMachineList();
});

$('#drawer-toggle').addEventListener('click', () => {
  $('#admin-drawer').classList.toggle('collapsed');
});

function renderDrawer() {
  const list = $('#drawer-machines');
  list.innerHTML = '';
  state.machines.forEach(m => {
    const card = document.createElement('div');
    card.className = 'drawer-card';
    card.draggable = true;
    card.dataset.id = m.id;
    card.innerHTML = `
      <span class="drawer-card-badge">3D</span>
      <div class="drawer-card-icon zone-${m.zone}">${getMachineSvg(m.id)}</div>
      <div class="drawer-card-name">${escapeHtml(m.name)}</div>
    `;
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', m.id);
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
    addTouchDrag(card, m.id);
    list.appendChild(card);
  });
}

document.body.addEventListener('dragover', (e) => { if (state.editMode) e.preventDefault(); });
document.body.addEventListener('drop', (e) => {
  if (!state.editMode) return;
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  if (id) placeOnMap(id, e.clientX, e.clientY);
});

function addTouchDrag(card, id) {
  let ghost = $('#drag-ghost');
  card.addEventListener('touchstart', (e) => {
    ghost.classList.remove('hidden');
    const t = e.touches[0];
    ghost.style.left = (t.clientX - 32) + 'px';
    ghost.style.top = (t.clientY - 24) + 'px';
  }, { passive: true });
  card.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    ghost.style.left = (t.clientX - 32) + 'px';
    ghost.style.top = (t.clientY - 24) + 'px';
  }, { passive: true });
  card.addEventListener('touchend', (e) => {
    ghost.classList.add('hidden');
    const t = e.changedTouches[0];
    if (t.clientY < window.innerHeight - 280) placeOnMap(id, t.clientX, t.clientY);
  });
}

function placeOnMap(id, screenX, screenY) {
  const m = state.machines.find(x => x.id === id);
  if (!m) return;

  const sceneX = (screenX - window.innerWidth / 2) * 0.3;
  const sceneZ = (screenY - window.innerHeight / 2) * 0.3;

  const obj = findSplineObject(m);
  let splineFound = false;
  if (obj) {
    try {
      if (obj.position) {
        obj.position.x = sceneX;
        obj.position.z = sceneZ;
      }
      if (obj.visible !== undefined) obj.visible = true;
      splineFound = true;
    } catch (e) {}
  }

  const existing = state.placements[id] || {};
  state.placements[id] = {
    screenX, screenY,
    sceneX, sceneZ,
    rotation: existing.rotation || 0,
    splineFound,
    placedBy: state.currentUser?.name || 'admin',
    placedAt: Date.now(),
  };
  renderPlacementMarkers();
  savePlacementsToStorage();
  openManipulator(id);

  if (splineFound) {
    showToast(`✓ "${m.name}" geplaatst — zichtbaar voor iedereen`);
  } else {
    showToast(`📍 "${m.name}" gemarkeerd — niet in Spline-scene`);
  }
}

function renderPlacementMarkers() {
  const layer = $('#placement-markers');
  layer.innerHTML = '';
  if (!state.editMode) return;

  Object.entries(state.placements).forEach(([id, p]) => {
    const m = state.machines.find(x => x.id === id);
    if (!m) return;
    const marker = document.createElement('div');
    marker.className = 'placement-marker';
    if (state.selectedManipulator === id) marker.classList.add('selected');
    marker.style.left = (p.screenX ?? p.x ?? 0) + 'px';
    marker.style.top = (p.screenY ?? p.y ?? 0) + 'px';
    marker.innerHTML = `
      <div class="marker-card">
        <div class="marker-card-icon zone-${m.zone}">${getMachineSvg(m.id)}</div>
        <span class="marker-card-name">${escapeHtml(m.name)}</span>
      </div>
      <div class="marker-tail"></div>
    `;
    marker.addEventListener('click', () => openManipulator(id));
    layer.appendChild(marker);
  });
}

function openManipulator(machineId) {
  const m = state.machines.find(x => x.id === machineId);
  if (!m) return;
  state.selectedManipulator = machineId;

  $('#manip-machine-name').textContent = m.name;
  $('#manip-machine-icon').innerHTML = getMachineSvg(m.id);
  $('#manip-machine-icon').className = `manip-icon-svg zone-${m.zone}`;

  const obj = findSplineObject(m);
  const statusDot = $('.manipulator-header .status-dot');
  const statusText = $('#manip-status-text');
  if (obj) {
    statusDot.className = 'status-dot status-ok';
    statusText.textContent = 'Gevonden in 3D-scene — wijzigingen werken direct';
  } else {
    statusDot.className = 'status-dot status-warn';
    statusText.textContent = 'Object niet in Spline-scene — alleen markering';
  }

  const rot = state.placements[machineId]?.rotation || 0;
  $('#manip-rotation').textContent = `${rot}°`;

  $('#manipulator-panel').classList.remove('hidden');
  renderPlacementMarkers();
}

$('#manip-close').addEventListener('click', () => {
  $('#manipulator-panel').classList.add('hidden');
  state.selectedManipulator = null;
  renderPlacementMarkers();
});

$('#manip-delete').addEventListener('click', () => {
  if (!state.selectedManipulator) return;
  const m = state.machines.find(x => x.id === state.selectedManipulator);
  if (!m) return;
  if (!confirm(`"${m.name}" verwijderen van de kaart?\n\nDe machine blijft in de catalogus staan — alleen de plaatsing op de 3D-kaart wordt gewist. Deze actie is voor alle gebruikers zichtbaar.`)) return;

  delete state.placements[m.id];
  const obj = findSplineObject(m);
  if (obj && obj.visible !== undefined) {
    try { obj.visible = false; } catch (e) {}
  }
  $('#manipulator-panel').classList.add('hidden');
  state.selectedManipulator = null;
  renderPlacementMarkers();
  savePlacementsToStorage();
  showToast(`🗑️ "${m.name}" verwijderd — synchroniseerd voor iedereen`);
});

$$('.dpad-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!state.selectedManipulator) return;
    const dir = btn.dataset.move;
    const m = state.machines.find(x => x.id === state.selectedManipulator);
    const obj = findSplineObject(m);
    const PX_STEP = 50;
    const SCENE_STEP = 15;

    const p = state.placements[m.id] || {
      screenX: window.innerWidth / 2,
      screenY: window.innerHeight / 2,
      sceneX: 0, sceneZ: 0, rotation: 0, splineFound: !!obj,
    };

    if (dir === 'left')  { p.screenX -= PX_STEP; p.sceneX = (p.sceneX || 0) - SCENE_STEP; }
    if (dir === 'right') { p.screenX += PX_STEP; p.sceneX = (p.sceneX || 0) + SCENE_STEP; }
    if (dir === 'up')    { p.screenY -= PX_STEP; p.sceneZ = (p.sceneZ || 0) - SCENE_STEP; }
    if (dir === 'down')  { p.screenY += PX_STEP; p.sceneZ = (p.sceneZ || 0) + SCENE_STEP; }
    state.placements[m.id] = p;
    renderPlacementMarkers();

    if (obj && obj.position) {
      try {
        obj.position.x = p.sceneX;
        obj.position.z = p.sceneZ;
      } catch (e) {}
    }
    savePlacementsToStorage();
  });
});

$$('.rot-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!state.selectedManipulator) return;
    const action = btn.dataset.rotate;
    const m = state.machines.find(x => x.id === state.selectedManipulator);
    const obj = findSplineObject(m);
    const p = state.placements[m.id] = state.placements[m.id] || {
      screenX: window.innerWidth / 2,
      screenY: window.innerHeight / 2,
      sceneX: 0, sceneZ: 0, rotation: 0, splineFound: !!obj,
    };

    if (action === 'snap') {
      p.rotation = 0;
    } else {
      p.rotation = (p.rotation + parseInt(action, 10)) % 360;
      if (p.rotation < 0) p.rotation += 360;
    }
    $('#manip-rotation').textContent = `${p.rotation}°`;

    if (obj && obj.rotation) {
      try {
        obj.rotation.y = (p.rotation * Math.PI) / 180;
      } catch (e) {}
    }
    savePlacementsToStorage();
  });
});

function openEditModal(machineId) {
  const m = state.machines.find(x => x.id === machineId);
  if (!m) return;
  state.selectedMachine = machineId;
  state.activeEditTab = 'basis';
  $('#edit-machine-name').textContent = m.name;
  $('#edit-zone-name').textContent = ZONES[m.zone].label;
  $('#edit-zone-dot').style.background = ZONES[m.zone].color;
  $$('.edit-tab').forEach(t => t.classList.toggle('active', t.dataset.editTab === 'basis'));
  renderEditBody(m);
  closeAllModals();
  $('#edit-modal').classList.remove('hidden');
}

function renderEditBody(m) {
  const body = $('#edit-body');
  const tab = state.activeEditTab;
  if (tab === 'basis') {
    body.innerHTML = `
      <label class="form-label">Naam <input id="f-name" type="text" value="${escapeHtml(m.name)}" /></label>
      <label class="form-label">Subtitel <input id="f-sub" type="text" placeholder="Optioneel — korte omschrijving" /></label>
      <label class="form-label">Beschrijving / Notities
        <textarea id="f-desc" rows="4">${escapeHtml(m.description || '')}</textarea>
      </label>
      <label class="form-label">Zone
        <select id="f-zone">
          ${ZONE_ORDER.filter(z => z !== 'algemeen').map(z => `
            <option value="${z}" ${z === m.zone ? 'selected' : ''}>Zone ${zoneNumber(z)} ${ZONES[z].label}</option>
          `).join('')}
        </select>
      </label>
      <label class="form-label">3D Model op de kaart (GLB/GLTF)
        <input id="f-model" type="text" value="/assets/models/${m.id}.gltf" />
      </label>
      <p class="path-confirm">✓ 3D model ingesteld — zichtbaar op de werkplaatskaart na opslaan</p>
    `;
  } else if (tab === 'veiligheid') {
    body.innerHTML = `
      <label class="form-label">Verplichte PBM (1 per regel)
        <textarea id="f-pbm" rows="4">${escapeHtml((m.veiligheid?.pbm || []).join('\n'))}</textarea>
      </label>
      <label class="form-label">Veiligheidsregels (1 per regel)
        <textarea id="f-regels" rows="6">${escapeHtml((m.veiligheid?.regels || []).join('\n'))}</textarea>
      </label>
    `;
  } else if (tab === 'handleiding') {
    body.innerHTML = `
      <label class="form-label">Werkstappen (1 per regel, in volgorde)
        <textarea id="f-stappen" rows="8">${escapeHtml((m.handleiding?.stappen || []).join('\n'))}</textarea>
      </label>
    `;
  } else if (tab === 'controle') {
    body.innerHTML = `
      <label class="form-label">Onderhoudspunten (1 per regel)
        <textarea id="f-controle" rows="6">${escapeHtml((m.controle || []).join('\n'))}</textarea>
      </label>
    `;
  } else if (tab === 'smering') {
    body.innerHTML = `
      <label class="form-label">Smeerpunten (1 per regel)
        <textarea id="f-smering" rows="6">${escapeHtml((m.smering || []).join('\n'))}</textarea>
      </label>
    `;
  }
}

function zoneNumber(z) {
  return { blauw: '01', groen: '02', rood: '03', geel: '04', oranje: '05' }[z] || '';
}

$$('.edit-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    saveCurrentEditTab();
    state.activeEditTab = tab.dataset.editTab;
    $$('.edit-tab').forEach(t => t.classList.toggle('active', t === tab));
    const m = state.machines.find(x => x.id === state.selectedMachine);
    if (m) renderEditBody(m);
  });
});

function saveCurrentEditTab() {
  const m = state.machines.find(x => x.id === state.selectedMachine);
  if (!m) return;
  const tab = state.activeEditTab;
  if (tab === 'basis') {
    if ($('#f-name')) m.name = $('#f-name').value.trim() || m.name;
    if ($('#f-desc')) m.description = $('#f-desc').value;
    if ($('#f-zone')) m.zone = $('#f-zone').value;
  } else if (tab === 'veiligheid') {
    m.veiligheid = m.veiligheid || {};
    if ($('#f-pbm')) m.veiligheid.pbm = $('#f-pbm').value.split('\n').map(s => s.trim()).filter(Boolean);
    if ($('#f-regels')) m.veiligheid.regels = $('#f-regels').value.split('\n').map(s => s.trim()).filter(Boolean);
  } else if (tab === 'handleiding') {
    m.handleiding = m.handleiding || {};
    if ($('#f-stappen')) m.handleiding.stappen = $('#f-stappen').value.split('\n').map(s => s.trim()).filter(Boolean);
  } else if (tab === 'controle') {
    if ($('#f-controle')) m.controle = $('#f-controle').value.split('\n').map(s => s.trim()).filter(Boolean);
  } else if (tab === 'smering') {
    if ($('#f-smering')) m.smering = $('#f-smering').value.split('\n').map(s => s.trim()).filter(Boolean);
  }
}

$('#edit-save').addEventListener('click', () => {
  saveCurrentEditTab();
  const m = state.machines.find(x => x.id === state.selectedMachine);
  if (m) saveMachineEditToStorage(m);
  $('#edit-modal').classList.add('hidden');
  showToast('✓ Wijzigingen opgeslagen — zichtbaar voor iedereen');
  renderMachineList();
});

function deleteMachine(id) {
  const m = state.machines.find(x => x.id === id);
  if (!m) return;
  if (!confirm(`"${m.name}" definitief wissen?\n\nDe machine wordt voor álle gebruikers verwijderd uit de lijst en de 3D-kaart. Deze actie kan niet ongedaan worden gemaakt.`)) return;

  state.machines = state.machines.filter(x => x.id !== id);
  delete state.placements[id];
  if (state.selectedManipulator === id) {
    state.selectedManipulator = null;
    $('#manipulator-panel').classList.add('hidden');
  }

  try {
    if (window._spline) {
      const obj = window._spline.findObjectByName(m.id) ||
                  window._spline.findObjectByName(m.name);
      if (obj && obj.visible !== undefined) obj.visible = false;
    }
  } catch (e) {}

  renderMachineList();
  renderPlacementMarkers();

  saveDeletedMachineToStorage(id);
  savePlacementsToStorage();

  showToast(`🗑️ "${m.name}" verwijderd — voor iedereen`);
}

$('#menu-btn').addEventListener('click', () => {
  if ($('#list-modal').classList.contains('hidden')) {
    renderMachineList();
    closeAllModals();
    $('#list-modal').classList.remove('hidden');
  } else {
    $('#list-modal').classList.add('hidden');
  }
});

$$('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => $('#' + btn.dataset.close).classList.add('hidden'));
});
$$('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllModals(); });

function closeAllModals() { $$('.modal').forEach(m => m.classList.add('hidden')); }

let toastTimeout;
function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.add('hidden'), 2600);
}

buildKnownNamesIndex();
renderZone();
loadPlacementsFromStorage();
loadEditsFromStorage();
loadMappingsFromStorage();
console.log('Werkplaats app initialized — gedeelde state + per-machine 3D visuals + click-to-info actief.');
