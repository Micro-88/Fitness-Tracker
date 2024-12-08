"use client";

import Link from "next/link";
import NavLinks from "@/app/ui/nav-links";
import FitnessLogo from "@/app/ui/fitness-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation';

export default function SideNav() {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    router.push('/loginpage');
  };

  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      <Link
        className='mb-2 flex h-20 items-end justify-start rounded-md bg-gray-800 p-4 md:h-40'
        href='/'
      >
        <div className='w-32 text-white md:w-40'>
          <FitnessLogo />
        </div>
      </Link>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <NavLinks />
        <div className='hidden h-auto w-full grow rounded-md bg-gray-700 md:block'></div>
        <button
          onClick={handleSignOut}
          className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-700 p-3 text-sm font-medium hover:bg-zinc-600 hover:text-cyan-400 md:flex-none md:justify-start md:p-2 md:px-3'
        >
          <PowerIcon className='w-6' />
          <div className='hidden md:block'>Sign Out</div>
        </button>
      </div>
    </div>
  );
}
