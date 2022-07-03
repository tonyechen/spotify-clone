import React, { useEffect, useState } from 'react';
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    LogoutIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { playlistIdState } from '../atoms/playlistAtom';
import {useRecoilState } from "recoil";

const Sidebar = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState();
    // pass in an atom as argument for useRecoilState
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    console.log('You picked playlist >>> ', playlistId)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                console.log('Got my playlists');
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);

    return (
        <div className="text-gray-500 p-5 text-xs lg:text-sm border-r overflow-y-scroll scrollbar-hide h-screen sm:max-w-{12rem} lg:max-w-{15rem} hidden md:inline-flex pb-36">
            <div className="space-y-4">
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />
                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create PlayList</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <p>Your episodes</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                {playlists?.map((playlist) => {
                    return (
                        <p
                            key={playlist.id}
                            onClick={() => setPlaylistId(playlist.id)}
                            className="cursor-pointer hover:text-white"
                        >
                            {playlist.name}
                        </p>
                    );
                }) || <p>No Playlists</p>}
            </div>
        </div>
    );
};

export default Sidebar;
