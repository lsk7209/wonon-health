import type { Metadata } from 'next';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
export const metadata: Metadata = { title: '이용약관', alternates: { canonical: '/terms' } };
export default function TermsPage() { return <><SiteHeader /><main id="main-content" className="container page-shell"><header className="page-heading"><p className="kicker">TERMS</p><h1>이용약관</h1><p>시행일: 2026년 8월 11일</p></header><div className="policy-content"><h2>정보의 목적</h2><p>원온의 콘텐츠는 일반적인 건강 정보 제공을 목적으로 하며 개인의 진단, 치료, 처방 또는 의료기관 상담을 대신하지 않습니다.</p><h2>이용자의 판단</h2><p>증상, 복용 약, 병력과 검사 결과에 따라 적절한 대응은 달라질 수 있습니다. 건강 관련 결정을 내리기 전 자격 있는 의료전문가와 상담하세요. 응급 신호가 있으면 119 또는 응급의료기관에 도움을 요청하세요.</p><h2>출처와 변경</h2><p>공식·전문기관 자료를 우선 확인하지만 외부 지침과 링크는 변경될 수 있습니다. 발견한 오류는 문의 페이지의 공개 창구로 알려 주세요.</p><h2>광고와 외부 링크</h2><p>광고와 외부 링크는 정보 접근을 돕거나 사이트 운영을 지원할 수 있으나, 링크된 서비스의 내용과 개인정보 처리는 해당 제공자의 정책을 따릅니다.</p></div></main><SiteFooter /></>; }
