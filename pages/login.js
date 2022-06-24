import { getProviders, signIn } from 'next-auth/react';

function Login({ providers }) {
    return (
        <div className="grid place-content-center h-screen bg-gray-300">
            <div className="flex p-5 bg-gray-100 rounded-3xl shadow-xl shadow-xxl">
                <img
                    src="https://pnggrid.com/wp-content/uploads/2021/05/Spotify-PNG-Logo-768x767.png"
                    alt="spotify"
                    className="w-14 mr-5"
                />

                {Object.values(providers).map((provider) => {
                    return (
                        <div key={provider.name} className="m-auto">
                            <button
                                className="bg-gray-800 text-white px-5 py-1 rounded-xl border-2 hover:bg-white hover:border-black hover:text-black ease-in-out duration-300"
                                onClick={() =>
                                    signIn(provider.id, { callbackUrl: '/' })
                                }
                            >
                                Login with {provider.name}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Login;

// run on the server before the page gets delivered to the client
export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}
