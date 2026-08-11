import type { Metadata } from 'next';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
export const metadata: Metadata = { title: '편집 원칙', description: '원온의 건강 콘텐츠 작성과 검토 원칙입니다.' };
export default function EditorialPolicyPage() { return <><SiteHeader /><main id="main-content" className="container page-shell"><header className="page-heading"><p className="kicker">EDITORIAL POLICY</p><h1>정보가 사람을<br />앞서가지 않도록</h1></header><div className="policy-content"><h2>근거와 출처</h2><p>의료·건강 관련 글은 공공 보건기관, 전문 학회, 검토된 임상 지침 등 신뢰할 수 있는 자료를 우선 확인합니다. 글마다 참고한 핵심 출처의 링크를 제공합니다.</p><h2>의학적 한계</h2><p>온라인 건강 정보는 개인의 병력, 검사 결과, 복용 약, 생활 조건을 모두 알 수 없습니다. 원온은 진단과 치료 결정을 대신하지 않으며, 개인적인 건강 문제는 의료 전문가와 상담하도록 안내합니다.</p><h2>정정과 업데이트</h2><p>중요한 지침이나 근거가 바뀌면 관련 콘텐츠를 검토하고 수정일을 표시합니다. 오류 제보는 문의 페이지를 통해 받을 수 있습니다.</p><h2>광고와 이해관계</h2><p>광고 또는 제휴 링크가 포함될 경우 독자가 알아볼 수 있게 표시합니다. 편집 판단은 광고주나 제휴사의 요구와 분리합니다.</p></div></main><SiteFooter /></>; }
