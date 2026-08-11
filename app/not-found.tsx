import Link from 'next/link';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
export default function NotFound() { return <><SiteHeader /><main id="main-content" className="container not-found"><div><p className="kicker">404</p><h1>찾으시는 페이지가 없어요.</h1><p>주소가 바뀌었거나 아직 준비 중인 페이지입니다.</p><Link className="button button-primary" href="/">원온 홈으로 가기</Link></div></main><SiteFooter /></>; }
