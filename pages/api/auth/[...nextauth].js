import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log('REFRESH TOKEN IS ', refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            // = 1 hour as 3600 returns from spotify API
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
			// Replace if new one came back else fall back to old one
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
        };
    } catch (error) {
        console.log(error);
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL,
        }),

        // can add more providers
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login',
    },
    // the JWT callback and a session callback allows us to presist OAuth tokens
    // and refresh them when they expire
    callbacks: {
        async jwt({ token, account, user }) {
            // initiaal sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000,
                    // we are handling expiry times in Milliseconds so * 1000
                };
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                console.log('EXISTING ACCESS TOKEN IS VALID');
                return token;
            }

            // Access token has expires, so we need to refresh it
            console.log('ACCESS TOKEN HAS EXPIRED');
            return await refreshAccessToken(token);
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session;
        },
    },
});
