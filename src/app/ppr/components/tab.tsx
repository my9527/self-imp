// // src/app/movies/components/TabBar.tsx
// import Link from "next/link";

// export default function TabBar({ activeCategory }: { activeCategory: string }) {
//   const tabs = [
//     { id: "featured", label: "精选" },
//     { id: "hot", label: "热榜" },
//     { id: "new", label: "最新" }
//   ];

//   return (
//     <div className="flex space-x-4 border-b pb-2">
//       {tabs.map((tab) => (
//         <Link
//           key={tab.id}
//           // 🚀 秘诀在这里：直接跳转到带 query 的 URL
//           href={`/ppr?category=${tab.id}`}
//           // 💡 关键优化参数：告诉 Next.js 只做局部数据替换，不要把屏幕滚动条猛弹回顶部
//           scroll={false} 
//           className={`px-4 py-2 rounded-t-lg transition-colors ${
//             activeCategory === tab.id ? "bg-blue-500 text-white" : "bg-gray-100"
//           }`}
//         >
//           {tab.label}
//         </Link>
//       ))}
//     </div>
//   );
// }

// src/app/movies/components/TabBar.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function TabBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 1. 获取当前真实的分类（首屏或 URL 里的值）
  const currentCategory = searchParams.get("category") || "featured";

  // 2. 引入本地 state，专门用来控制“点击瞬间”的高亮反馈
  const [activeTab, setActiveTab] = useState(currentCategory);
  
  // 3. 引入 React 19 的过渡状态，用来捕捉服务器“正在加载新数据”的空档期
  const [isPending, startTransition] = useTransition();

  const tabs = [
    { id: "featured", label: "精选" },
    { id: "hot", label: "热榜" },
    { id: "new", label: "最新" }
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === activeTab) return;

    // 🚀 核心魔术 A：点击的【千分之一秒内】，立刻把前端 Tab 的高亮变过去！
    setActiveTab(tabId);

    // 🚀 核心魔术 B：把沉重的服务器路由切换放进 Transition 里
    startTransition(() => {
      // 触发纯 Query 切换，不滚动页面
      router.push(`/ppr?category=${tabId}`, { scroll: false });
    });
  };

  return (
    <div className="flex space-x-4 border-b pb-2 items-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`relative px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === tab.id 
              ? "bg-blue-500 text-white font-medium" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {tab.label}
          
          {/* 💡 小细节：如果这个 Tab 正在等待服务器返回数据，转个微型小菊花 */}
          {isPending && activeTab === tab.id && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          )}
        </button>
      ))}
    </div>
  );
}