import { Link, Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        {/* <div  className='flex flex-row gap-3 justify-center items-center overflow-hidden bg-[#28283e] bg-opacity-none w-[100vw] h-8'>
            <Link to="/"></Link>
            <Link to="/home">home</Link>
            <Link to="/register">register</Link>
            <Link to="/signin">signin</Link>
        </div> */}
        <div id="detail">
            <Outlet/>
        </div>
      </>
    );
  }