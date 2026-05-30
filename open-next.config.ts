// open-next.config.ts
import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  default: {
    runtime: "edge", // 🎯 告诉适配器，使用 Cloudflare 边缘运行时
  },
  // 如果你在 Next.js 16 中使用了 PPR，必须在这开启边缘缓存桥接
  middleware: {
    external: true,
  },
};

export default config;