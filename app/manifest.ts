import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest { return { name: '원온 | 중년 여성의 건강 가이드', short_name: '원온', description: '45세 이후 여성을 위한 근거 기반 건강 안내서', start_url: '/', display: 'standalone', background_color: '#f6f3ec', theme_color: '#2e5545', lang: 'ko' }; }
