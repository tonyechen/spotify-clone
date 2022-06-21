# Next.js
````
npx create-next-app app-name
````
## How Next.js Handle Pages:
- Next.js has a built in Router, which uses file name to determine which page to visit, index.js hosts the Home Page component which points to the '/' path on the website

more info on Base Path:
https://nextjs.org/docs/api-reference/next.config.js/basepath


# Tailwind CSS
- Include Hero Icons!! : https://heroicons.com/
- need to install for react: https://github.com/tailwindlabs/heroicons
````
npm install @heroicons/react
````
- Can create classes with @apply:
```css
@layer components {
  .btn-primary {
    @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
  }
}

```