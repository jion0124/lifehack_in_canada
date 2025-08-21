// libs/microcms.ts
import { createClient } from 'microcms-js-sdk';

// 本番環境用の環境変数を使用
const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

if (!serviceDomain || serviceDomain.trim() === '') {
  throw new Error('MICROCMS_SERVICE_DOMAIN is not defined or empty');
}

if (!apiKey || apiKey.trim() === '') {
  throw new Error('MICROCMS_API_KEY is not defined or empty');
}

export const client = createClient({
  serviceDomain: serviceDomain,
  apiKey: apiKey,
});