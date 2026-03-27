@AGENTS.md
# Frontend: Asset Management System

## Overview

This is the frontend for an asset management system.

* Built with Next.js (App Router)
* Communicates with NestJS backend via REST APIs

---

## Features

* Login / Authentication
* Role-based dashboards:

  * Admin Dashboard
  * User Dashboard
* Asset views (list + detail)
* Asset assignment UI (Admin only)

---

## Routing Structure

User:

* /dashboard
* /assets

Admin:

* /admin/dashboard
* /admin/assets
* /admin/users

---

## Role Handling

* Role is received from backend (JWT)
* Stored in cookies or state
* Used for:

  * Route protection
  * Conditional rendering

---

## API Communication

* Base URL: backend API
* Uses Bearer token (JWT)
* Example:
  Authorization: Bearer <token>

---

## UI Rules

* Reuse components (tables, forms)
* Do not duplicate admin/user views unnecessarily
* Use conditional rendering based on role

---

## Important Notes

* Do NOT handle authorization logic here
* Backend is the source of truth

