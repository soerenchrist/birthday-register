# Birthday Register

This project is a simple Next.js project, to help me plan my birthday party. I can the link to this application to my invited friends and they can register if they will join or not. \
It includes a simple admin page to let me check the participants. \

It is built using:
- [Next.js](https://nextjs.org)
- [Drizzle](https://orm.drizzle.team/) for the ORM
- [shadcn](https://ui.shadcn.com/) for components
- [Auth.js](https://authjs.dev/) for authentication for the admin page

## Getting Started

If you want to run this yourself you will have to add the DATABASE_URL to the .env, pointing to a Postgres database.

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
