# Next.js
````
npx create-next-app app-name
````
## How Next.js Handle Pages:
- Next.js has a built in Router, which uses file name to determine which page to visit, index.js hosts the Home Page component which points to the '/' path on the website

more info on Base Path:
https://nextjs.org/docs/api-reference/next.config.js/basepath

- /pages/api contains API Routes that you set up which tells Next to not map the route to a page, but to an API endpoint. They are server-side only bundles and won't increase client-side bundle size

More on this:

https://nextjs.org/docs/api-routes/introduction

## .env.local
- Next.js has built-in support for loading environment variables from '.env.local' into 'process.env'
- Normally environmental variables are only availble in the Node.js environment(aka server), and won't be exposed to the browser(aka client). In order to expose a variable to the browser we need to prefix the variable with 'NEXT_PUBLIC_'
- IMPORTANT: environmental variables are loaded in at build time so make sure to rebuild app when you add new environmental variables
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

## Middleware
create '_middleware.js' in pages
# NextAuth.js
```
npm install next-auth
```
Authentication Module built for next.js

Documentation: https://next-auth.js.org/getting-started/introduction

NextAuth Refresh Token Rotation:

link: https://next-auth.js.org/tutorials/refresh-token-rotation

***OAuth (Open authroization)*** is an open standard authorization framework for token based authorization on the internet. It enables an end user's account information to be used by third-party services, such as Facebook and google, without exposing the user's account credentials to the 3rd party. It acts as an intermediary on the behalf of the end user, providing the 3rd party service with an access token that authorizes specific account information to be shared. The process for obtaining the token is called an authorization flow.
- refresh token is used to update expired access token, usually refresh token never expires

## Callbacks
asynchronous functions that we can use to control what happens when an action is performed
- if you want to pass data such as an Access Token or User ID to the browser when using JSON WEb Tokens, you can persist the data in the token when the ***jwt*** callback is called, then pass the data through to the browser in the ***session*** callback

## Sessions
Use < SessionProvider > to allows instances of useSession() to share the session object across components. It keeps the session updated and synced between tabs/windows

More info: https://next-auth.js.org/getting-started/client#sessionprovider

The data in the session object is based on the ***session callback*** we defined 

# Recoil
Typical way to use recoil is to create an Atom, which represents state in Recoil. It is like a section of the global state, it can be like a playlist atom and song atom and should be contextual to what it is used for.
- Each atom need to have a unique key
# Spotify API
```
export default NextAuth({
    // Configure on or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID (spotify client id),
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET (spotify client secret),
            authorization: {/*This Part defines scope*/}
        }),
    ],
});
```
- authorization define the permission to Spotify data and features. The access to protected resources is determined by one or several scopes. Scopes enable the app to access specific functionality (e.g. read a playlist, modify your library or just streaming) on behalf of a user
