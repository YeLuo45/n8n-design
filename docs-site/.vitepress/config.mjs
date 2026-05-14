import { defineConfig } from "vitepress";

export default defineConfig({
  title: "n8n Design",
  description: "n8n Workflow Automation Platform - Architecture Design Documentation",
  lang: "en-US",

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
  ],

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "Home", link: "/" },
      { text: "Architecture", link: "/architecture" },
      { text: "Workflow Engine", link: "/workflow-engine" },
      { text: "Nodes", link: "/nodes" },
      { text: "AI Agents", link: "/ai-agents" },
      { text: "API", link: "/api" },
    ],

    sidebar: [
      {
        text: "Documentation",
        items: [
          { text: "Home", link: "/" },
          { text: "Architecture Overview", link: "/architecture" },
          { text: "Workflow Engine", link: "/workflow-engine" },
          { text: "Node System", link: "/nodes" },
          { text: "AI Agents (LangChain)", link: "/ai-agents" },
          { text: "API Reference", link: "/api" },
          { text: "Getting Started", link: "/getting-started" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/YeLuo45/n8n-design" },
      { icon: "external", link: "https://docs.n8n.io" },
    ],

    footer: {
      message: "Based on n8n Open Source Workflow Automation Platform",
      copyright: "Copyright © 2024-present n8n Contributors",
    },
  },
});
