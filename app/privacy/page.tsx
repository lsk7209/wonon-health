import type { Metadata } from 'next';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
export const metadata: Metadata = { title: '개인정보 처리방침' };
export default function PrivacyPage() { return <><SiteHeader /><main id="main-content" className="container page-shell"><header className="page-heading"><p className="kicker">PRIVACY</p><h1>개인정보 처리방침</h1><p>시행일: 2026년 8월 11일</p></header><div className="policy-content"><h2>수집하는 정보</h2><p>원온은 별도의 회원 가입 기능을 운영하지 않습니다. 문의를 보낼 때 독자가 자발적으로 제공하는 이름, 이메일 주소, 문의 내용은 답변을 위해서만 사용할 수 있습니다.</p><h2>쿠키 및 제3자 서비스</h2><p>서비스 품질과 광고 제공을 위해 쿠키 또는 유사 기술이 사용될 수 있습니다. 광고 제공자는 관련 법령과 자신의 개인정보 처리방침에 따라 정보를 처리할 수 있습니다.</p><h2>보유 및 이용</h2><p>문의 정보는 답변 및 분쟁 대응에 필요한 기간에만 보관한 뒤 안전하게 삭제합니다. 법령에 따라 보관이 필요한 경우에는 해당 기간 동안 보관합니다.</p><h2>문의</h2><p>개인정보 관련 문의는 <a href="mailto:hello@wonon.ehon365.kr">hello@wonon.ehon365.kr</a>로 보내 주세요.</p></div></main><SiteFooter /></>; }
