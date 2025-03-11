import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '사용하기 쉬운 컴포넌트',
    description: (
      <>
        React Common Components Library는 쉽게 사용하고 커스터마이징할 수 있도록 설계되었습니다.
      </>
    ),
  },
  {
    title: '접근성 중심',
    description: (
      <>
        모든 컴포넌트는 WCAG 가이드라인을 준수하며 키보드 탐색과 스크린 리더를 위한 지원을 포함합니다.
      </>
    ),
  },
  {
    title: 'TypeScript로 작성',
    description: (
      <>
        모든 컴포넌트는 TypeScript로 개발되었으며 완전한 타입 정의를 제공합니다.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
} 