# Graph Report - .  (2026-04-27)

## Corpus Check
- Corpus is ~31 words - fits in a single context window. You may not need a graph.

## Summary
- 6 nodes · 5 edges · 2 communities detected
- Extraction: 80% EXTRACTED · 20% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Obsidian Knowledge System|Obsidian Knowledge System]]
- [[_COMMUNITY_Portfolio Project Root|Portfolio Project Root]]

## God Nodes (most connected - your core abstractions)
1. `Memory Vault (Obsidian)` - 4 edges
2. `Portfolio Website` - 2 edges
3. `Obsidian Vault at /Users/shivansh052k/Documents/Obsidian/shivansh_vault` - 1 edges
4. `Global Instructions (CLAUDE.md in vault)` - 1 edges
5. `Portfolio Website Project Notes in Obsidian` - 1 edges
6. `graphify-out/GRAPH_REPORT.md` - 1 edges

## Surprising Connections (you probably didn't know these)
- `Portfolio Website` --uses--> `Memory Vault (Obsidian)`  [INFERRED]
  README.md → CLAUDE.md
- `Portfolio Website` --references--> `graphify-out/GRAPH_REPORT.md`  [EXTRACTED]
  README.md → CLAUDE.md

## Communities

### Community 0 - "Obsidian Knowledge System"
Cohesion: 0.5
Nodes (4): Global Instructions (CLAUDE.md in vault), Memory Vault (Obsidian), Obsidian Vault at /Users/shivansh052k/Documents/Obsidian/shivansh_vault, Portfolio Website Project Notes in Obsidian

### Community 1 - "Portfolio Project Root"
Cohesion: 1.0
Nodes (2): graphify-out/GRAPH_REPORT.md, Portfolio Website

## Knowledge Gaps
- **4 isolated node(s):** `Obsidian Vault at /Users/shivansh052k/Documents/Obsidian/shivansh_vault`, `Global Instructions (CLAUDE.md in vault)`, `Portfolio Website Project Notes in Obsidian`, `graphify-out/GRAPH_REPORT.md`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Portfolio Project Root`** (2 nodes): `graphify-out/GRAPH_REPORT.md`, `Portfolio Website`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Memory Vault (Obsidian)` connect `Obsidian Knowledge System` to `Portfolio Project Root`?**
  _High betweenness centrality (0.900) - this node is a cross-community bridge._
- **Why does `Portfolio Website` connect `Portfolio Project Root` to `Obsidian Knowledge System`?**
  _High betweenness centrality (0.400) - this node is a cross-community bridge._
- **What connects `Obsidian Vault at /Users/shivansh052k/Documents/Obsidian/shivansh_vault`, `Global Instructions (CLAUDE.md in vault)`, `Portfolio Website Project Notes in Obsidian` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._