// libs/microcms.ts
import { createClient } from 'microcms-js-sdk';

// デバッグ用：環境変数の値を確認
console.log('MICROCMS_SERVICE_DOMAIN_DEV:', process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN_DEV);
console.log('MICROCMS_API_KEY_DEV:', process.env.NEXT_PUBLIC_MICROCMS_API_KEY_DEV);

// テスト環境用の環境変数を使用
const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN_DEV;
const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY_DEV;

if (!serviceDomain || serviceDomain.trim() === '') {
  throw new Error('MICROCMS_SERVICE_DOMAIN_DEV is not defined or empty');
}

if (!apiKey || apiKey.trim() === '') {
  throw new Error('MICROCMS_API_KEY_DEV is not defined or empty');
}

export const client = createClient({
  serviceDomain: serviceDomain,
  apiKey: apiKey,
});