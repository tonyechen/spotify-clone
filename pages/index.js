import Sidebar from '../components/Sidebar';

export default function Home() {
    return (
        <div className="bg-black h-screen ">
            <main>
                <Sidebar />

                {/*Center*/}
            </main>

            <div>{/* Player */}</div>
        </div>
    );
}
