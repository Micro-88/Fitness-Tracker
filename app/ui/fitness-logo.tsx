import { IoFitnessOutline } from "react-icons/io5";

export default function FitnessLogo() {
  return (
    <div className={`flex flex-row items-center leading-none text-white`}>
      <IoFitnessOutline className='h-12 w-12 rotate-[15deg]' />
      <p className='text-[25px] '>Fitness</p>
    </div>
  );
}
