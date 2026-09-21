#!/usr/bin/env node
/** Génère l'image Open Graph et l'apple-touch-icon à partir de SVG (aucun asset binaire versionné inutilement). */
import sharp from 'sharp';
import { writeFileSync, readFileSync } from 'node:fs';

const font = readFileSync(new URL('../public/fonts/manrope-latin-var.woff2', import.meta.url)).toString('base64');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="g" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0v64" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <style>
      .t { font-family: 'Manrope', 'DejaVu Sans', sans-serif; fill: #ffffff; }
      .lbl { font-size: 22px; font-weight: 700; letter-spacing: 3.4px; fill: #ffc21f; }
      .h { font-size: 68px; font-weight: 800; letter-spacing: -2px; }
      .s { font-size: 28px; font-weight: 500; fill: #a9bac7; }
      .tel { font-size: 38px; font-weight: 800; fill: #ffc21f; letter-spacing: -1px; }
    </style>
  </defs>
  <rect width="1200" height="630" fill="#0a1a2b"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#ffc21f"/>
  <g transform="translate(80,92)">
    <path d="M0 96V38L32 20l32 18v58" fill="none" stroke="#ffffff" stroke-width="7" stroke-linejoin="round"/>
    <rect x="22" y="62" width="20" height="34" fill="#ffc21f"/>
  </g>
  <text class="t lbl" x="80" y="262">DÉRATISATION • ÎLE-DE-FRANCE</text>
  <text class="t h" x="80" y="344">Rats et souris :</text>
  <text class="t h" x="80" y="420">intervention en Île-de-France</text>
  <text class="t s" x="80" y="478">Diagnostic, traitement, sécurisation des points d’entrée, prévention.</text>
  <text class="t tel" x="80" y="552">07 56 82 27 85</text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(new URL('../public/og/og-deratisation-ile-de-france.png', import.meta.url).pathname);

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0a1a2b"/>
  <path d="M6 26V11.8L16 6l10 5.8V26" fill="none" stroke="#ffffff" stroke-width="2.6" stroke-linejoin="round"/>
  <rect x="12.4" y="18.4" width="7.2" height="7.6" fill="#ffc21f"/>
</svg>`;
await sharp(Buffer.from(icon)).png({ compressionLevel: 9 }).toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname);

console.log('  [og] Images générées.');
