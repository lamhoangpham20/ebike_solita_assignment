This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install all dependencies by:

```bash
npm install
# or
yarn
```

Then config your .env variables of API_URL to your server's URL. If you want to use Google map services in localhost, you have to get Googlemaps api for development.

```bash
npm run dev
# or
yarn dev
```

The web app will start and running at http://localhost:3000

---

In this web app we use Nextjs for React app and use dynamic routing to render page. The pages can be found at /src/pages.

There is also /component folder which store component for pages.

---

In this project, material UI is used for rendering prescripted UI library and we use **react-hook-form** as well as **react-query** to manage fetching data from database
