import Link from "next/link";
import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartInfo } from "../Redux/Slice/cart";
import { wrapper } from "../Redux/Store/store";
import { getcartThunk } from "../Redux/Thunk/Thunk";

function Header() {
  const dispatch = useDispatch()
  const cart = useSelector(getCartInfo)

  useEffect(() => {
    dispatch(getcartThunk())
  }, []);

  useEffect(() => {
   console.log(cart)
  }, [cart]);

  // const 
  
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img className="w-10 rounded-full h-10" src="logo.jpg"></img>
            <span className="ml-3 text-xl">Web3Com</span>
          </div>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {/* <Link href="/">
            <div className="mr-5 hover:text-gray-900">Home</div>
          </Link>
          <Link href="/about">
            <div className="mr-5 hover:text-gray-900">About</div>
          </Link> */}
          <Link href="/products">
            <div className="mr-5 hover:text-gray-900">Products</div>
          </Link>
          <Link href="/checkout">
            <div className="mr-5 hover:text-gray-900">Cart({cart.slugs.length})</div>
          </Link>
        </nav>
        <button className="inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-5">
          Login
        </button>
        <button
        //   title="Lauching Soon"
        data-title="Lauching Soon"
          className="connect inline-flex relative items-center bg-gray-400 text-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >
          Connect Wallet
          {/* <span className="opacity-0 block w-auto p-auto absolute bg-black text-white z-10 left-2 top-8 hover:opacity-100">Launching Soon</span> */}
        </button>
      </div>
    </header>
  );
}

// export const getServerSideProps =  wrapper.getServerSideProps(store => async ({ query }) => {
//   store.dispatch(getcartThunk())
//   console.log("aaa" ,store.getState())
//   return {
//     props:{
//       cartLength : 0
//     }
//   }
// })

export default Header;
