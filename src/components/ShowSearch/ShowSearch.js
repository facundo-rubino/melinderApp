import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { HiArrowSmLeft } from "react-icons/hi";

import Card from '../Card/Card';
import Loader from '../Loader/Loader'


const ShowSearch = () => {

    const navigate = useNavigate();
    let { idSearch } = useParams();
    const [loading, setLoading] = useState(true)

    const [selectedSearch, setSelectedSearch] = useState([]);
    const totalSearches = useSelector(state => state.objSearches.searches);

    useEffect(() => {
        setLoading(false);
        setSelectedSearch(totalSearches.find((search) => search.id === Number(idSearch)));
    }, [totalSearches])

    return (
        <>
            <div>
                <button onClick={() => navigate(-1)} className="bg-white pl-4 pr-6 py-2 rounded ml-2 mt-8 md:mt-6 mb-0"> <HiArrowSmLeft className="inline-block text-2xl " /> Volver al buscador</button>
            </div>
            {loading ? <Loader /> :
                <div className="flex flex-col ">
                    <div className=" max-w-6xl py-12 h-full items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-auto">
                        {selectedSearch.result.length > 0 ? selectedSearch.result.map((search) =>
                            <Card
                                idML={search.id}
                                key={search.id}
                                title={search.title}
                                price={search.price}
                                currency_id={search.currency_id}
                                attributes={search.attributes}
                                thumbnail={search.thumbnail}
                            />)
                            : <div className="grid-cols-none m-auto text-center text-MLblue h-screen content-center	">
                                <p className="font-bold text-3xl pb-3">Nada por aquí</p>
                                <p className="text-xl">No hay más búsqeudas para mostrar...</p></div>}
                    </div>
                </div>
            }

        </>
    )
}

export default ShowSearch