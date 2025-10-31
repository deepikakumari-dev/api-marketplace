# DKAPI

A developer-powered open-source API marketplace, where you can publish, test, and monetize APIs --- or just explore and play with others' endpoints like a real tech nerd.

**NOTE:** The site isn't mobile-friendly *yet* (blame the sidebar and my perfectionism), so please use a laptop or desktop for now :)


# Why am I building this?

Because building **full-stack things** that connect other full-stack things is my version of caffeine ☕
Also... maybe I want devs to finally have an open API marketplace that doesn't lock everything behind paywalls or vendor APIs.
And yeah... maybe I want to build *the* open alternative to RapidAPI --- but with more soul.

# Features

-    Sleek UI inspired by RapidAPI (but with cleaner vibes)
-    Publish your own APIs with docs, endpoints, and pricing
-    Create subscription plans (monthly, per-request, free tiers)
-    Smart endpoint playground for instant testing (but testing doesn't work yet :)
-    Public and private APIs support
-    Organization-based ownership and team control

# Upcoming Features
Ther r tonnes of stuff which r not implemented yet, bcoz of procrastination...:( and now Athena is ending....:(

-    API Gateway with rate-limiting and request logging
-    Developer profile pages
-    Built-in monetization with PayPal (no middlemen)
-    Live demo and auto-generated documentation
-    Dynamic usage analytics, latency tracking, and scoreboards
-    Webhooks, auto-SDK generation, and analytics dashboards
-    Organization billing and team management
-    AI-powered endpoint description generator
-    Smart search for APIs by function or use case
-    Comments, ratings, and discussions per API
-    Better moderation + abuse detection



# Prerequisites

-   Node.js (obviously)
-   NPM or Yarn
-   PostgreSQL or MongoDB (depending on your config)
-   PayPal Developer Account (for payments)
-   Image Upload API (for logos, covers, etc.)
-   Optional: Redis for caching if you like things fast

# Installation

- Clone this repository:
```bash
git clone https://github.com/deepikakumari-dev/DKAPI.git
cd DKAPI
```

- Rename the `.env.example` file to `.env` and add your variables --- stuff like database URLs, PayPal client/secret, JWT secret, etc.

- Then install dependencies:
```bash
npm i
```

- Run the dev server:
```bash
npm run dev
```

- Now visit:  http://localhost:3000
Congrats, you now run your own mini RapidAPI :)

* * * * *

# How it was built
-------------------

DKAPI was crafted with pure caffeine, frustration, and a sprinkle of logic.\
It's my take on a modern, open, and self-hostable API marketplace.

**Tech stack (the essentials):**

-    Next.js (App Router + Server Components)
-    Prisma + MongoDB (because schemas love structure)
-    Next-Auth for sessions
-    Tailwind + shadcn/ui for styling
-    Vercel (deployment + speed)
-    Node.js (the glue for everything)
-    VS Code (my mana well)
-    Git + GitHub (to store all this chaos)

# AI Usage

AI usage was pretty minimal --- I only used ChatGPT to debug or name stuff.
No Copilot, no autocode magic, just brain + caffeine + vibes.
(Though if you see something suspiciously elegant, maybe I *did* let AI help a bit 👀)

* * * * *

# Closing Words
----------------

DKAPI is still evolving, but the goal is simple:
Make API discovery, testing, and monetization **open, dev-friendly, and beautiful**.

If you're a builder, I'd love to see your APIs here.