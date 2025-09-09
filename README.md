Service

A Next.js 15 full-stack application using TypeScript, Drizzle ORM, Stripe, and Clerk for authentication. This project manages products, subscriptions, and analytics for users.

Table of Contents

Features

Tech Stack

Setup & Installation

Environment Variables

Folder Structure

Database Schema

Authentication

Subscriptions & Payments

API & Server Actions

Components

Charts & Analytics

Deployment

Features

User authentication via Clerk

Product management (create, update, list)

Subscription management with Stripe

Payment tiers (Free, Basic, Standard, Premium)

Analytics dashboard with charts:

Views per day

Views by product price point (PPP)

Views by country

Responsive UI with Tailwind CSS and custom components

Server-side caching using Drizzle and cache tags

Tech Stack

Frontend: Next.js 13 (App Router), React, Tailwind CSS

Backend: Node.js, Next.js Server Actions

Database: PostgreSQL with Drizzle ORM

Authentication: Clerk

Payments: Stripe (Subscriptions & Customer Portal)

Charts: Recharts / Custom chart components

Deployment: Vercel

Setup & Installation

Clone the repository:

git clone https://github.com/kotakunp/service.git
cd service


Install dependencies:

npm install


Add environment variables (see next section).

Run the development server:

npm run dev


Open http://localhost:3000
.

Environment Variables

Create a .env file in the root with the following:

DATABASE_URL=postgres://user:password@host:port/dbname
CLERK_SECRET_KEY=your_clerk_secret
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_BASIC_PLAN_PRICE_ID=price_id
STRIPE_STANDART_PLAN_PRICE_ID=price_id
STRIPE_PREMIUM_PLAN_PRICE_ID=price_id
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

Folder Structure
app/                      # Main Next.js App Router
  dashboard/
    analytics/            # Analytics dashboard pages and charts
    subscription/         # Subscription management pages
  page.tsx                # Home page
components/               # Reusable UI components
data/                     # Constants and environment configuration
  env/                    # Server & client envs
  priceTiers.ts           # Subscription tiers and prices
drizzle/                  # Drizzle ORM schema and DB configuration
lib/                      # Utility functions, cache, and formatters
server/                   # Server actions and API logic
  actions/stripe.ts       # Stripe API logic
  db/                     # Database actions (products, subscriptions)
schemas/                  # Zod schemas for validation

Database Schema

UserSubscriptionTable

Column	Type	Notes
id	UUID	Primary key, default random
clerkUserId	Text	Unique, links to Clerk user
stripeSubscriptionItemId	Text	Stripe subscription item
stripeSubscriptionId	Text	Stripe subscription ID
stripeCustomerId	Text	Stripe customer ID
tier	Enum	User tier (Free, Basic, Standard, Premium)
createdAt	Date	Timestamp
updatedAt	Date	Timestamp
Authentication

Users are managed using Clerk.

Webhooks from Clerk handle user creation and deletion.

Free subscription tier is automatically assigned on user creation.

Subscriptions & Payments

Stripe handles subscriptions and customer portal sessions.

Server Actions for:

createCheckoutSession: New subscription

createCustomerPortalSession: Manage subscription

createCancelSession: Cancel subscription

Pricing tiers:

Free

Basic

Standard

Premium

Subscription upgrades are handled via Stripe Billing Portal.

API & Server Actions

Product Actions:

createProduct, updateProduct

Tracks product views

Subscription Actions:

createUserSubscription, updateUserSubscription, getUserSubscription

Cached using dbCache and CACHE_TAGS

Analytics Queries:

getViewsByDayChartData

getViewsByPPPChartData

getViewsByCountryChartData

Components

Card, Button, Input, Textarea, DropdownMenu

RequiredLabelIcon for form validation

HasPermission wrapper for permission-based rendering

ViewsByDayChart, ViewsByPPPChart, ViewsByCountryChart

Charts & Analytics

ViewsByDayChart: Line chart for daily product views

ViewsByPPPChart: Bar chart for views by product price point

ViewsByCountryChart: Geo chart / bar chart for views by country

Filters include time interval, timezone, and product

Deployment

The app can be deployed on Vercel.

Connect your GitHub repository to Vercel for automatic deployments on push.

Make sure to set environment variables in Vercel.

Notes

Free tier users can access limited features (5000 views, 1 product, no analytics)

Server Actions are used for Stripe interactions and database updates.

Database caching is implemented to improve performance.
