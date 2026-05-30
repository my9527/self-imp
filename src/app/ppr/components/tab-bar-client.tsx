// src/app/ppr/components/TabBarClient.tsx
"use client";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabBarClient({ activeTab, onTabChange }: TabBarProps) {
  const tabs = [
    { id: "featured", label: "精选" },
    { id: "hot", label: "热榜" },
    { id: "new", label: "最新" }
  ];

  return (
    <div className="flex space-x-4 border-b pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === tab.id ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}