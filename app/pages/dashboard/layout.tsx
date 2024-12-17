import NavBar from "@/app/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
            <div className='w-full flex-none md:w-64'>
                <NavBar />
            </div>
            <div className='grow p-6 pt-2 md:p-12 md:pt-0'>{children}</div>
        </div>
    );
}