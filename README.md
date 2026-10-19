# Abdelaaziz Belkhair

Jekyll site using Chirpy 7.6.0. GitHub Actions builds the static site and deploys it to GitHub Pages.

## Add a tool

Add an entry to [`_data/tools.yml`](_data/tools.yml). Set `featured: true` to show it on Home. Use `github` and `writeup` when those URLs exist. The Tools page reads this file directly.

## Add research or a writeup

Add a dated Markdown file under `_posts`, for example `2026-10-08-short-title.md`. The default layout provides Chirpy's TOC, syntax highlighting, article metadata, and responsive reading layout.

```yaml
---
title: A specific research title
date: 2026-10-08
description: One sentence describing the result or subject.
categories: [Windows, Research]
tags: [COM, DCOM]
section: research
research_area: COM / DCOM
featured: false
repository: https://github.com/owner/repo
research_status: Reproduced in a local lab
affected_technology: TODO: add versions or product
# cve: CVE-YYYY-NNNN
# mermaid: true
---

Start with the behavior you tested or the result you observed.
```

Use `section: research` and a `research_area` value to list the post on Research. Available areas are Active Directory, Windows Internals, COM / DCOM, Reverse Engineering, Mobile Security, Web Security, Vulnerability Research, Cryptography, and Cloud and Containers. Set `featured: true` to include a research post in the Home publications list. Use `mermaid: true` with fenced `mermaid` blocks to enable Chirpy's Mermaid loader.

Optional metadata fields include `project`, `repository`, `cve`, `affected_technology`, `research_status`, and `external_references` (a list of `title` and `url` values). Do not add a field unless the information is confirmed.

## Existing HTML articles

Existing article and writeup files keep their original paths. Their technical bodies are retained as raw HTML to protect payloads and code examples from Liquid processing. Set `kind`, `research_area`, `research_date`, `status`, and optional `featured` in the front matter when adding or updating an entry. Keep `status: Pending` and `noindex: true` for unpublished writeups.

## Local build

Install Ruby 3.3 and run:

```sh
bundle install
JEKYLL_ENV=production bundle exec jekyll build
bundle exec htmlproofer _site --disable-external
```

## Theme overrides

The site pins Chirpy in the Gemfile. Local customizations live in `assets/css/jekyll-theme-chirpy.scss`, `_layouts/home.html`, `_layouts/legacy-article.html`, `_layouts/default.html`, `_layouts/post.html`, and the sidebar, topbar, favicon, and metadata includes. The default and post layouts are based on upstream Chirpy files; compare them with the pinned version when upgrading.

The Pages workflow expects the repository's Pages source to be set to **GitHub Actions** in repository settings.
