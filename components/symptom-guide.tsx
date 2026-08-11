'use client';

import Link from 'next/link';
import { useState } from 'react';

const paths = [
  { id: 'heat', label: '갑작스러운 열감·식은땀', href: '/article/hot-flash-daily-record', result: '7일 증상 기록으로 내 패턴부터 살펴보세요.' },
  { id: 'sleep', label: '자주 깨는 잠·낮 피로', href: '/article/sleep-after-45', result: '수면 리듬과 함께 확인할 신호를 정리했습니다.' },
  { id: 'bone', label: '뼈·근력·낙상 걱정', href: '/article/bone-health-small-steps', result: '골밀도 상담과 꾸준한 움직임의 출발점을 확인하세요.' },
  { id: 'checkup', label: '검진 결과·대상 여부', href: '/article/national-screening-checklist-2026', result: '대상 조회부터 결과 확인까지 순서대로 살펴보세요.' },
];

export function SymptomGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const path = paths.find((item) => item.id === selected);
  return <div className="guide-card">
    <div><p className="kicker">FIND YOUR NEXT STEP</p><h2>지금 가장 가까운 고민은 무엇인가요?</h2><p>진단이 아닌 정보 탐색 도구입니다. 선택 내용은 저장하거나 전송하지 않습니다.</p></div>
    <div className="guide-options" role="group" aria-label="건강 고민 선택">{paths.map((item) => <button type="button" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)} key={item.id}>{item.label}</button>)}</div>
    {path && <div className="guide-result" aria-live="polite"><strong>{path.result}</strong><Link href={path.href}>관련 건강 노트 읽기 <span aria-hidden="true">→</span></Link></div>}
    <p className="urgent-note"><strong>즉시 도움이 필요한 경우:</strong> 흉통, 호흡곤란, 의식 변화, 갑작스러운 마비·말하기 어려움, 심한 출혈은 119 또는 응급실을 이용하세요.</p>
  </div>;
}
