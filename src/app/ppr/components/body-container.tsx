// src/app/ppr/components/PprDynamicContainer.tsx
"use client";

import { use, Suspense } from "react";
import { PageBodyAsync } from "./body-async";
import { useSearchParams } from "next/navigation";

interface ContainerProps {
  searchParamsPromise: Promise<{ category?: string }>;
}

export  function PprDynamicContainer({ searchParamsPromise }: ContainerProps) {
  // 🚀 在子组件内部安全地解构。此时它已经在 <PagePPR> 的外壳之下了
  // const { category = "featured" } = use(searchParamsPromise);
  const searchParams = useSearchParams()

  const category = searchParams.get('category') ?? 'featured'

  return (
    // 🎯 完美上锁！只要切换 Tab，这个局部 Suspense 就会因为 key 改变而精准切回 loading
    <Suspense key={category} fallback={<div>loading...（列表骨架屏）</div>}>
      <PageBodyAsync key={category} searchParamsPromise={searchParamsPromise} />
    </Suspense>
  );
}