# EzMuzik SaaS website

A **Next.js 15 full-stack application** using TypeScript, Drizzle ORM, Stripe, and Clerk for authentication. This project manages products, subscriptions, and analytics for users.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Environment Variables](#environment-variables)  
- [Folder Structure](#folder-structure)  
- [Database Schema](#database-schema)  
- [Authentication](#authentication)  
- [Subscriptions & Payments](#subscriptions--payments)  
- [API & Server Actions](#api--server-actions)  
- [Components](#components)  
- [Charts & Analytics](#charts--analytics)  
- [Deployment](#deployment)  

---

## Features

- User authentication via [Clerk](https://clerk.com/)  
- Product management (create, update, list)  
- Subscription management with [Stripe](https://stripe.com/)  
- Payment tiers (Free, Basic, Standard, Premium)  
- Analytics dashboard with charts:
  - Views per day  
  - Views by product price point (PPP)  
  - Views by country  
- Responsive UI with Tailwind CSS and custom components  
- Server-side caching using Drizzle and cache tags  

---

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS  
- **Backend:** Node.js, Next.js Server Actions  
- **Database:** PostgreSQL (hosted on Neon) with Drizzle ORM  
- **Authentication:** Clerk  
- **Payments:** Stripe (Subscriptions & Customer Portal)  
- **Charts:** Recharts / Custom chart components  
- **Deployment:** Vercel  

---

## Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/kotakunp/service.git
cd service
```
2. Install dependencies:

```bash
npm install
```
3. Add environment variables:

```env
DATABASE_URL=postgres://user:password@host:port/dbname
CLERK_SECRET_KEY=your_clerk_secret
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_BASIC_PLAN_PRICE_ID=price_id
STRIPE_STANDART_PLAN_PRICE_ID=price_id
STRIPE_PREMIUM_PLAN_PRICE_ID=price_id
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

5. Open http://localhost:3000
