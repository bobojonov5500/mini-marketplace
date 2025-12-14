import { FaShopify } from "react-icons/fa6"
import { Link, NavLink } from "react-router-dom"


export const Navbar = () => {

    return (
        <>
            <header className="text-white fixed w-full  z-999 bg-[#9F7AEA] ">
                <div className="container    duration-150 transition-all ease-in mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link to={'/'} className="flex title-font hover:scale-110 duration-150 ease-in-out font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <FaShopify className="text-[40px] " />
                        <span className="ml-3 text-3xl font-serif">SHOP</span>
                    </Link>
                    <nav className="md:ml-auto  flex flex-wrap items-center text-base justify-center">
                        <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                                `mr-5 transition text-xl duration-150 ease-out hover:text-gray-900 ${isActive ? "underline text-zinc-800" : " "
                                }`
                            }
                        >
                            Cart
                        </NavLink>
                    </nav>
                    <button className="inline-flex cursor-pointer duration-150 transition ease-in-out hover:scale-110 items-center bg-green-500 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">Button
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </header > </>
    )
}
