import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { HiHeart, HiArrowCircleRight, HiArrowSmLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom"

import CardFav from '../CardFav/CardFav'
import Loader from '../Loader/Loader'


const Favorites = () => {
    const totalSearches = useSelector(state => state.objSearches.searches);
    const [loading, setLoading] = useState(true);
    const [emptyFavs, setEmptyFavs] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        totalSearches ? setLoading(false) : setLoading(true);
        for (let i = 0; i < totalSearches.length; i++) {
            if (totalSearches[i].favs) {
                setEmptyFavs(true)
                console.log(emptyFavs);
            }
        }

    }, [totalSearches])

    return (

        <>
            {loading ? <Loader /> :
                <>
                    <div>
                        <button onClick={() => navigate(-1)} className="bg-white pl-4 pr-6 py-2 rounded ml-2 mt-6 md:mt-6 mb-0"> <HiArrowSmLeft className="inline-block text-2xl " /> Volver </button>
                    </div>
                    {totalSearches.length > 0 && emptyFavs ? totalSearches.map((selectedSearch) =>
                        <div className="my-auto md:w-11/12 md:m-auto" >
                            {selectedSearch.favs.length > 3 ?
                                <HiArrowCircleRight className="absolute right-5 text-4xl my-64 text-white " />
                                : ""}
                            {selectedSearch.favs.length > 0 ?
                                <>
                                    <p className="ml-2 mt-6 text-sm font-bold text-slate-500"><HiHeart className="inline-block mb-1" /> Favorito</p>
                                    <p className="pl-3 text-2xl font-bold">{selectedSearch.q}</p>
                                    <div className="flex flex-row  w-auto h-96 mt-1 overflow-x-scroll mb-5">
                                        {selectedSearch.favs.map((fav) =>
                                            <CardFav
                                                key={fav.id}
                                                price={fav.price}
                                                thumbnail={fav.thumbnail}
                                                title={fav.title}
                                                currency_id={fav.currency_id}
                                                attributes={fav.attributes}
                                                idML={fav.id}
                                                idSearch={selectedSearch.id}
                                            />
                                        )}
                                    </div>
                                </> : ""}
                        </div>
                    ) : <div className="m-auto text-center text-MLblue ">
                        <p className="font-bold text-3xl pb-3">Nada por aquí</p>
                        <p className="text-xl">No hay Favoritos para mostrar...</p></div>}

                </>
            }
        </>

    )
}

export default Favorites 