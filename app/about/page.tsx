import type { Metadata } from 'next';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
export const metadata: Metadata = { title: '원온 소개', description: '원온의 건강 정보 기준과 운영 목적을 소개합니다.', alternates: { canonical: '/about' } };
export default function AboutPage() { return <><SiteHeader /><main id="main-content" className="container page-shell"><header className="page-heading"><p className="kicker">ABOUT WONON</p><h1>나를 돌보는 일에<br />믿을 만한 기준을</h1><p>원온은 45세 이후 여성의 몸과 마음에 찾아오는 변화를, 과장 없이 이해하기 쉽게 전하는 건강 정보 공간입니다.</p></header><div className="policy-content"><h2>원온이 하는 일</h2><p>갱년기, 수면, 뼈 건강, 검진처럼 일상과 맞닿아 있는 주제를 다룹니다. 각 글에는 확인한 출처를 표시하고, 하나의 증상에 단정적인 답을 붙이지 않습니다.</p><h2>원온이 하지 않는 일</h2><p>개별 진단이나 처방을 제공하지 않으며, 특정 치료·제품의 효과를 보장하지 않습니다. 의료적으로 중요한 판단은 자격 있는 의료 전문가와 상의해야 합니다.</p><h2>독자와의 약속</h2><p>읽고 난 뒤 불안보다 질문이 남는 글을 만들겠습니다. 오래되었거나 부정확한 정보는 검토해 고치고, 이해관계가 있는 추천이나 광고는 분명히 표시하겠습니다.</p></div></main><SiteFooter /></>; }
