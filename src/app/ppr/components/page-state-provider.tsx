// src/app/ppr/components/PageStateProvider.tsx
"use client";

import { use, useState, Suspense } from "react";
import TabBarClient from "./tab-bar-client";
import { PageBodyAsync } from "./body-async";

interface ProviderProps {
  searchParamsPromise: Promise<{ category?: string }>;
}

export default function PageStateProvider({ searchParamsPromise }: ProviderProps) {
  // 🎯 核心魔术 1：在客户端组件顶层，通过 use() 极其轻量地解构出首屏参数
  const { category: initialCategory = "featured" } = use(searchParamsPromise);

  // 🎯 核心魔术 2：在“Page层次”成功建立全局 State，初始化为 searchParams 的值
  const [currentCategory, setCurrentCategory] = useState(initialCategory);

  return (
    <div className="p-6">
      {/* 3. 把状态和修改状态的函数传给 Tab 栏 */}
      <TabBarClient activeTab={currentCategory} onTabChange={setCurrentCategory} />

      {/* 4. 给这里的 Suspense 绑定基于 State 的 key！
           当客户端切换 State 时，这里会【瞬间】拔掉老列表，秒开 loading...
      */}
      <Suspense key={currentCategory} fallback={<div>loading...（列表骨架屏）</div>}>
        {/* 🚀 直接把普通的 string 传给服务端组件 */}
        <PageBodyAsync category={currentCategory} />
      </Suspense>
    </div>
  );
}