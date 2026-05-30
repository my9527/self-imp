// src/app/ppr/page.tsx
import { Suspense } from "react";
import Header from "./components/header";
import PageStateProvider from "./components/page-state-provider";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

// 🚀 保持它是 Async Server Component，确保 Header 能 0ms 秒开
export default async function PagePPR({ searchParams }: PageProps) {
  return (
    <div>
      {/* 1. 静态外壳：瞬间渲染 */}
      <Header />

      {/* 2. 动态大孔洞：把未兑现的 searchParams 传进去 */}
      <Suspense fallback={<div>正在初始化大框架...</div>}>
        <PageStateProvider searchParamsPromise={searchParams} />
      </Suspense>
    </div>
  );
}