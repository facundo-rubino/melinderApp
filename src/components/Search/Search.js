import { useRef } from 'react';
import imgKeys from '../../img/car_interior.jpg';
import { useDispatch, useSelector } from "react-redux";
import { saveSearch } from "../../features/searchesSlice";
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const inpQuery = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const totalSearches = useSelector(state => state.objSearches.searches);
    let actualId = useSelector(state => state.objSearches.searchId);

    const getCars = (offset, arr) => {
        let textSent = inpQuery.current.value;
        let formattedQuery = textSent.charAt(0).toUpperCase() + textSent.toLowerCase().slice(1);
        let existentQuery = totalSearches.find(search => search.q === formattedQuery);

        if (formattedQuery !== "" && !existentQuery) {
            fetch(`https://api.mercadolibre.com/sites/MLU/search?category=MLU1744&q= ${formattedQuery} &offset=` + offset)
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
            alert("Búsqueda existente")
            navigate(`/ShowSearch/${existentQuery.id}`);
        } else {
            alert("Escribí algo")

        }
    }

    return (
        <div className="md:flex h-screen bg-gray-200 overflow-y-hidden">

            <div className="flex flex-col items-center h-auto pb-10 md:pb-0 md:w-1/2 my-auto">
                <h1 className="text-center text-2xl pt-6 mb-2 text-MLblue font-bold md:pt-0 md:mb-4">Encontrá el auto de tus sueños</h1>
                <p className="text-center w-10/12 mb-4  text-MLblue">Melinder es la primer app en la que podrás <strong> optimizar tus búsquedas </strong> de autos realizadas en Mercado Libre.
                    Agregá a <strong> favoritos </strong> para seguir de cerca tus autos más deseados, o <strong> descartalos</strong>, para que no te cruces
                    una y otra vez con el mismo resultado no deseado.
                </p>
                <input ref={inpQuery} type="text" className="w-4/5 py-3 rounded placeholder-MLblue pl-[14px] text-lg" placeholder="Buscá un auto..." />
                <input type="button" onClick={() => getCars(0, [])} className="block mt-4 py-3 bg-MLblue w-1/3 rounded text-white text-2xl  cursor-pointer" value="Buscar" />
            </div>

            <div className="h-auto md:w-1/2 ">
                <img className="object-cover h-max w-full" src={imgKeys} /></div>
        </div>
    )
}

export default Search