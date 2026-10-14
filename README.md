This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Hero project cards

The Home hero's interactive project cards and their category links are configured in `app/components/heroProjectData.ts`. Add or edit entries there; card rendering, hover/focus reveals and cursor parallax live in `app/components/InteractiveProjectCard.tsx`.

Put project media under `public/projects/` and reference it from the data with a root-relative URL such as `/projects/my-project.webp`. The current image entries reuse local project-preview images already in that folder as placeholders. Replace each `media`, `mediaAlt`, `title`, `type` and `projectUrl` with the final project details. For a video, set `mediaType` to `"video"` and point `media` at a local `.mp4` or `.webm`; it is only mounted when its card is revealed or matched by an expertise link, and plays muted in a loop.

Each card's `categories` array controls which expertise links highlight it. `depth` sets the maximum desktop parallax in pixels, and `position` sets its side and percentage offsets around the hero.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
