import { LoginContext } from '@/context/LoginContext';
import Image from 'next/image';
import { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { logoutHandler } = useContext(LoginContext);

  return (
    <nav className="flex justify-center items-center h-[100px] shadow-lg px-10 w-full">
      <div className="flex justify-between items-center max-w-[1240px] w-full">
        <Image src="/ccript-logo.png" alt="logo" width={144} height={50} />
        <div
          className="w-[46px] h-[46px] bg-[#EF4444] rounded-[10px] p-2 flex justify-center items-center hover:bg-[#d93434] cursor-pointer transition-all duration-300"
          onClick={() => logoutHandler()}
        >
          <FiLogOut className="text-white text-xl" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
