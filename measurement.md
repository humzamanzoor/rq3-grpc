---
name: gRPC.C20
author: Humza
description: Energy consumption measurement of gRPC.ASPNetCore under concurrent load using k6.
active-nodes:
  - odroid
  - odroid2
initialization-strategy:
  - IncludeActive
collector:
  - odroid=ACTIVE,HTTP,RAPL
resource-filters:
  - memory-used
  - memory-free
  - memory-cached
  - memory-buffered
  - if_octets
  - cpu-user
  - cpu-system
  - cpu-idle
  - counter
script:
  - run.sh
runs: 1
timeout: 7200
report-modes:
  - Technical Report
  - High-Level Report
report-palette:
  - "#0b84a5"
  - "#f6c85f"
  - "#6f4e7c"
  - "#9b5de5"
  - "#ff6b6b"
  - "#3ac569"
  - "#ffa600"
sections:
  - Introduction
  - Setup
  - Results
  - Summary
visible-sections:
  - 0,1,2,3
  - 0,1,2,3
expanded-sections:
  - 0,1,2
  - 0,1

---
## Introduction
Energy consumption measurement of gRPC.ASPNetCore under concurrent load using k6.

---

## Setup
- Frontend node: odroid (H3+)
- Backend node: odroid2 (H4)
- Client sends nested queries to REST Controllers backend
- PowerGoblin captures hardware meter readings per run

---

## Results
[BOXPLOT]

[SUMMARYTABLE:boxplot-1]

---

## Summary
[SCATTERPLOT]

[NODEDATA]