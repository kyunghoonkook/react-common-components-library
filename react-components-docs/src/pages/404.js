import React from 'react';
import Layout from '@theme/Layout';

export default function NotFound() {
  return (
    <Layout title="페이지를 찾을 수 없습니다">
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="hero__title">페이지를 찾을 수 없습니다</h1>
            <p>요청하신 페이지를 찾을 수 없습니다.</p>
          </div>
        </div>
      </main>
    </Layout>
  );
} 