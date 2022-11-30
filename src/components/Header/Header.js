import { useEffect, useState, useId } from 'react';
import logoApp from '../../img/melinder1.png';
import { HiMenu, HiHeart, HiHome, HiClock, HiOutlineX, HiMoon } from "react-icons/hi";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { saveSearch } from "../../features/searchesSlice";

const Header = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const id = useId();
    const totalSearches = useSelector(state => state.objSearches.searches);
    let globalId = useSelector(state => state.objSearches.searchId);


    useEffect(() => {
        let searchesStorage = localStorage.getItem("totalSearches");
        if (searchesStorage === null) {
            localStorage.setItem("totalSearches", JSON.stringify([]))
        } else {
            dispatch(saveSearch((JSON.parse(searchesStorage))));
        }

        let idStorage = localStorage.getItem("globalId");
        if (idStorage === null) {
            localStorage.setItem("globalId", idStorage);
        }
    }, [])

    useEffect(() => {
        if (totalSearches.length) {
            localStorage.setItem("totalSearches", JSON.stringify(totalSearches))
            localStorage.setItem("globalId", globalId)
        }
    }, [totalSearches])

    return (
        <>
            <nav className="p-5 bg-MLyellow shadow md:flex md:items-center md:justify-between font-bold z-[9999]">
                <div className="flex justify-between items-center">
                    <span className="text-2xl md:pl-3 ">
                        <NavLink to="/"> <img src={logoApp} className="h-12" /></NavLink>
                    </span>
                    <span className="text-3xl cursor-pointer md:hidden block" onClick={() => setOpen(!open)} >
                        <HiMenu className={`h-6 w-6 text-MLblue ${open ? 'hidden' : 'block'}`} />
                        <HiOutlineX className={`h-6 w-6 text-MLblue ${open ? 'block' : 'hidden'}`} />
                    </span>
                </div>
                <ul className={`md:flex md:items-center md:pb-0  absolute md:static bg-MLyellow
            md:z-auto z-[0] left-0 w-full md:pr-10 md:w-auto md:pl-0 px-auto transition-all ease-in duration-500 
            ${open ? `top-20 opacity-100` : `top-[-490px] md-opacity-100 `}
            
            `}>
                    <NavLink to="/">
                        <li key={id} className={`text-2xl text-MLblue px-4 py-4 md:my-0 md:text-2xl`} onClick={() => setOpen(!open)}>
                            {<HiHome className="h-7 w-7  inline-block mr-4 mb-2 text-3xl hover:text-MLblueHover duration-300" />}Inicio
                        </li>  </NavLink>
                    <NavLink to="favorites">
                        <li key={id} className="text-2xl text-MLblue px-4 py-4 md:my-0 md:text-2xl" onClick={() => setOpen(!open)}>
                            {<HiHeart className="h-7 w-7  inline-block mr-4 mb-2 text-3xl hover:text-MLblueHover duration-300" />}Favoritos
                        </li> </NavLink>
                    <NavLink to="historic">
                        <li key={id} className="text-2xl text-MLblue px-4 py-4 pb-6 md:pb-4 md:my-0 md:text-2xl" onClick={() => setOpen(!open)}>
                            <HiClock className="h-7 w-7  inline-block mr-4 mb-2 text-3xl hover:text-MLblueHover duration-300" />Historial
                        </li></NavLink>

                </ul>
            </nav>

        </>

    )
}

export default Header