import { useRef, useState } from 'react';
import imgKeys from '../../img/car_interior.jpg';
import imgInicio from '../../img/peoplecarWeb@2x.png';
import homePhoto from '../../img/homePhoto.jpg';
import { useDispatch, useSelector } from "react-redux";
import { saveSearch } from "../../features/searchesSlice";
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Search = () => {

    const inpQuery = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const totalSearches = useSelector(state => state.objSearches.searches);
    let actualId = useSelector(state => state.objSearches.searchId);

    const [isLoading, setIsLoading] = useState(false);

    const getCars = (offset, arr) => {
        let textSent = inpQuery.current.value;
        let formattedQuery = textSent.charAt(0).toUpperCase() + textSent.toLowerCase().slice(1);
        let existentQuery = totalSearches.find(search => search.q === formattedQuery);


        if (formattedQuery !== "" && !existentQuery) {
          fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(formattedQuery)}`)
                .then(r => r.json())
                .then(res => {
                    let total = res.paging.total;
                    let actual = res.paging.limit + res.paging.offset;
                    let arrActual = [...arr, ...res.results];
                    if (actual < total) {
                        getCars(actual, arrActual);
                    } else {
                        let searchObject = {
                            id: actualId,
                            q: formattedQuery,
                            result: arrActual,
                            favs: [],
                            discarded: [],
                        };
                        if (totalSearches.length > 0) {
                            dispatch(saveSearch([...totalSearches, searchObject]))
                        }
                        else {
                            dispatch(saveSearch([searchObject]))
                        }
                        navigate(`/ShowSearch/${actualId}`);
                    }
                });
        } else if (existentQuery) {
            setIsLoading(true);
            toast.info("Búsqueda existente, redirigiendo...", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setIsLoading(false);
            setTimeout(() => {
                navigate(`/ShowSearch/${existentQuery.id}`);
            }, 2000);

        } else {
            toast.warn("¡El campo de búsqueda está vacío!", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <>
            <div className="w-full h-screen relative">
                <div className="w-full h-full flex flex-col absolute top-0 left-0 justify-center items-center">
                    <p className="text-white text-3xl font-normal text-center ">Optimizá tus búsquedas <br /> con <strong>MeLinder</strong></p>
                    <input ref={inpQuery} type="text" className="my-5 p-2 rounded w-4/5 pl-[20px] sm:w-3/5 md:w-2/5" placeholder="Buscá un auto..." />
                    <input type="button" onClick={() => getCars(0, [])} className="text-white bg-MLblue p-3 rounded w-3/6 cursor-pointer font-bold text-xl sm:w-1/6 sm:p-3" value="Buscar" />
                    <ToastContainer />
                </div>
                <img src={homePhoto} className="w-full object-cover h-screen" />
            </div>
            <div className="flex flex-col md:flex-row ">
                <div className="md:pb-0 md:basis-1/2 w-96 m-auto my-10">
                    <img className="w-9/12 m-auto" src={imgInicio} alt='Imagen de inicio' />
                </div>
                <div className="md:pb-0 md:basis-1/2 my-auto ">
                    <p className="text-center w-10/12 text-MLblue m-auto mb-10 text-md sm:text-xl sm:mb-0">Melinder es la primer app en la que podrás <strong> optimizar tus búsquedas </strong> de autos realizadas en Mercado Libre.<br />
                        Agregá a <strong> favoritos </strong> para seguir de cerca tus autos más deseados, o <strong> descartalos</strong>, para que no te cruces
                        una y otra vez con el mismo resultado no deseado.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Search