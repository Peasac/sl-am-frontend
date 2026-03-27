<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
# Frontend Modules (Agents)

## 1. Auth UI Module

Handles:

* Login form
* Token storage
* Redirect based on role

---

## 2. Dashboard Module

Handles:

* Rendering dashboard for Admin/User
* Displaying summary data

---

## 3. Asset UI Module

Handles:

* Asset list view
* Asset detail view
* Assignment UI (Admin only)

---

## 4. Role-Based UI Controller

Handles:

* Showing/hiding UI elements
* Sidebar navigation based on role

---

## 5. API Client Module

Handles:

* Sending requests to backend
* Attaching JWT token
* Handling errors

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
