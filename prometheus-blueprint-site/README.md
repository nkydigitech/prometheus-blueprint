# Prometheus Blueprint — Zero to Hero ⚡🛡️

> Master Prometheus monitoring using simple power meter and security guard analogies. No PhD required.

**Live Site:** `index.html` is a pure HTML/CSS/JS single-page app (GitHub Pages ready)
**Theme:** Power Meter + Security Guard
**Color:** #E6522C
**Category:** Monitoring & Alerting

## The Big Analogy That Makes Everything Click

Imagine your infrastructure is a large apartment building:

- **Application / Server = Apartment** — uses resources
- **Metrics = Electricity Usage** — how much power, water, heat you're using right now
- **Exporter = Power Meter** — the device on the wall that measures and exposes usage
- **Prometheus Server = Meter Reader** — walks around every 15 seconds, collects all meter readings
- **PromQL = Calculator** — does math on your readings: average, spikes, trends, bills
- **Alerting Rules = Trip Switch** — if usage > limit, flip the switch
- **Alertmanager = Security Guard Control Room** — decides who to call, when to silence, when to repeat

Once you see it this way, Prometheus becomes intuitive.

## What You'll Learn (15 Chapters)

1. **Why Monitor?** - From blind driving to full dashboard
2. **Architecture Deep Dive** - How the meter-reader system works
3. **Metrics Types** - Counter, Gauge, Histogram, Summary explained with utility bills
4. **Install & First Scrape** - Your first working Prometheus
5. **Exporters Ecosystem** - Meters for everything: Node, cAdvisor, Blackbox, custom
6. **Service Discovery** - Auto-discover new apartments/meters
7. **PromQL Fundamentals** - The calculator basics
8. **PromQL Advanced** - Joins, aggregations, rate vs irate
9. **Recording Rules** - Pre-compute expensive bills
10. **Alerting Rules** - Writing smart trip switches
11. **Alertmanager** - The security guard's playbook: routing, silencing, inhibition
12. **HA, Federation & Remote Write** - Multi-building monitoring
13. **Pushgateway & Short-Lived Jobs** - Temporary construction meters
14. **Production Hardening** - TLS, auth, relabeling, cardinality
15. **Capstone: From Zero to Production** - Full stack + Grafana link

## 10 Hands-On Labs + Capstone

- Lab 1: Install Prometheus + Node Exporter on Linux (local or Docker)
- Lab 2: Build a custom Python exporter (your own meter)
- Lab 3: Service discovery with file_sd and Docker
- Lab 4: PromQL workout - 25 queries on real data
- Lab 5: Create recording rules for SLO Burn Rate
- Lab 6: Write alerting rules that don't spam (and prove it)
- Lab 7: Deploy Alertmanager with Slack + Email routing
- Lab 8: Blackbox exporter - monitor website uptime like a guard patrol
- Lab 9: Federation - one global view, many Prometheuses
- Lab 10: Secure Prometheus - TLS, basic auth, cardinality limits
- **Capstone:** Monitor a full microservices app (API + DB + Frontend), SLO dashboards, alerts to Slack, on-call runbook.

## Quick Start

```bash
# Clone
git clone https://github.com/nkydigitech/prometheus-blueprint
cd prometheus-blueprint-site

# Run locally - just open
open index.html

# Or serve
python -m http.server 8000
```

Docker quick test:

```bash
docker run -d -p 9090:9090 prom/prometheus
docker run -d -p 9100:9100 prom/node-exporter
# Open http://localhost:9090 -> Status -> Targets
```

## PromQL Cheat Sheet (Fridge Magnet Edition)

```promql
# Is my apartment using any electricity?
up

# How much CPU last 5 min? (rate of meter ticking)
rate(node_cpu_seconds_total{mode="idle"}[5m])

# 95th percentile latency
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Predict disk full in 4 hours
predict_linear(node_filesystem_free_bytes{mountpoint="/"}[1h], 4*3600) < 0

# Alert: high error rate
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
```

## Why This Blueprint?

- **Zero to Hero, no gaps** - assumes you know what a server is, nothing else
- **Global analogies** - house, car dashboard, factory, not local-only references
- **Production-first** - what real SREs do, not toy examples
- **No build system** - pure HTML/CSS/JS, works on GitHub Pages in seconds

## Part of Blueprint Series

Built by Nkechi Anna Ahanonye - Cloud & DevOps Engineer
From manual 3AM firefighting to 1-min automated, observed pipelines.

MIT License - Build, share, teach.
