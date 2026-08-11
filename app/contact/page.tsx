import type { Metadata } from 'next';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
export const metadata: Metadata = { title: '문의하기', description: '원온 콘텐츠의 오류 제보와 일반 문의를 받습니다.' };
export default function ContactPage() { return <><SiteHeader /><main id="main-content" className="container page-shell"><header className="page-heading"><p className="kicker">CONTACT</p><h1>함께 더 정확해지는<br />건강 정보</h1><p>오류 제보, 출처 관련 의견, 일반적인 사이트 문의를 남겨 주세요. 개인 의료 상담이나 응급 상황에는 답변을 드릴 수 없습니다.</p></header><section className="contact-card"><h2>이메일로 문의하기</h2><p><a href="mailto:hello@wonon.ehon365.kr">hello@wonon.ehon365.kr</a></p><p>내용을 확인한 뒤 가능한 범위에서 답변드리겠습니다. 개인 진료 정보나 주민등록번호 등 민감한 개인정보는 보내지 마세요.</p></section></main><SiteFooter /></>; }
