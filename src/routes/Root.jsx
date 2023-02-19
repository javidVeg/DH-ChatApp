import { Link, Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div>
            <Link to="/"></Link>
            <Link to="/home">home</Link>
            <Link to="/register">register</Link>
            <Link to="/signin">signin</Link>
        </div>
        <div id="detail">
            <Outlet/>
        </div>
      </>
    );
  }