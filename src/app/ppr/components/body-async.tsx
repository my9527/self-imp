// src/app/ppr/components/PprDynamicContainer.tsx
"use client";

import { use, Suspense } from "react";
import PageBody from "./body";
import { useSearchParams } from "next/navigation";


export function PageBodyAsync({ searchParamsPromise }: { searchParamsPromise: Promise<{ category?: string }> }) {
    // 🚀 React 19 新特性：在组件内部通过 use() 极其轻量地解构 Promise
    // const { category = "featured" } = use(searchParamsPromise);
    const searchParams = useSearchParams()
    const category = searchParams.get('category') ?? 'featured'
    return <PageBody category={category} />;
}
