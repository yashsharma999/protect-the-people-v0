// Google service account auth shared by every route that writes to Google Sheets.

import { JWT } from 'google-auth-library';

/**
 * Read GOOGLE_PRIVATE_KEY however it was pasted into the hosting dashboard.
 * Unlike .env files, dashboards keep surrounding quotes as part of the value,
 * and some editors double-escape line breaks, so accept all of these:
 * - the key with real line breaks or with \n escapes, as in the JSON key file
 * - the same, wrapped in quotes
 * - the whole JSON key file
 */
export function getGooglePrivateKey(): string | undefined {
  let key = process.env.GOOGLE_PRIVATE_KEY?.trim();
  if (!key) return undefined;

  if (key.startsWith('{')) {
    try {
      key = String(JSON.parse(key).private_key ?? '');
    } catch {
      // Not valid JSON - fall through and treat it as the key itself
    }
  }

  if (key.length > 1 && (key[0] === '"' || key[0] === "'") && key.endsWith(key[0])) {
    key = key.slice(1, -1);
  }

  key = key.replace(/\\\\n/g, '\n').replace(/\\n/g, '\n').replace(/\r\n/g, '\n');

  if (!key.includes('-----BEGIN') || !key.includes('-----END')) {
    console.warn('⚠️ GOOGLE_PRIVATE_KEY does not look like a complete private key (missing BEGIN or END line)');
  }

  return key;
}

export function getServiceAccountAuth() {
  return new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim(),
    key: getGooglePrivateKey(),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}
