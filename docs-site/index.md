---
layout: home

hero:
  name: "n8n Design"
  text: "Workflow Automation Platform"
  tagline: "Architecture Design Documentation for n8n - The open-source workflow automation platform"
  image:
    src: /logo.svg
    alt: n8n Design
  actions:
    - theme: brand
      text: Architecture Overview
      link: /architecture
    - theme: brand
      text: API Reference
      link: /api

features:
  - icon: 🏗️
    title: Architecture Overview
    details: Monorepo structure with pnpm workspaces, TypeScript throughout, Vue 3 frontend and Node.js backend.
    link: /architecture
    linkText: View Architecture
  - icon: ⚙️
    title: Workflow Engine
    details: Core execution engine with node traversal, data transformation, error handling, and retry logic.
    link: /workflow-engine
    linkText: View Engine
  - icon: 🔗
    title: Node System
    details: Extensible node-based architecture with 400+ built-in integrations, custom node development support.
    link: /nodes
    linkText: View Nodes
  - icon: 🤖
    title: AI Agents (LangChain)
    details: Native AI capabilities powered by LangChain with specialized n8n nodes for LLM, vector stores, and agents.
    link: /ai-agents
    linkText: View AI Agents
  - icon: 📡
    title: API Reference
    details: REST API architecture, authentication, endpoints, webhook system, and real-time capabilities.
    link: /api
    linkText: View API
  - icon: 🚀
    title: Getting Started
    details: Quick start guide for developers - cloning, building, testing, and contributing to n8n.
    link: /getting-started
    linkText: View Guide
---
