import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiRefresh, HiTrash } from "react-icons/hi";
import { deleteSearch, deleteAllSearches } from '../../features/searchesSlice';
import historicPic from '../../img/historicPic.jpg'

const Historic = () => {

    const dispatch = useDispatch();
    const totalSearches = useSelector(state => state.objSearches.searches);

    return (

        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 my-auto">
            <div className="grid gap-6 row-gap-10 lg:grid-cols-2">
                <div className="">
                    {totalSearches.length > 0 ? totalSearches.map((s, index) =>
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                        <svg
                                            className="w-4 text-gray-600"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            viewBox="0 0 24 24"
                                        >
                                            <line
                                                fill="none"
                                                strokeMiterlimit="10"
                                                x1="12"
                                                y1="2"
                                                x2="12"
                                                y2="22"
                                            />
                                            <polyline
                                                fill="none"
                                                strokeMiterlimit="10"
                                                points="19,15 12,22 5,15"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-px h-full bg-gray-300" />
                            </div>
                            <div className="pt-1 pb-8">
                                <p className="mb-2 text-lg font-bold underline">Búsqueda: {s.q} </p>
                                <p className="text-gray-700">
                                    {s.favs.length ? `Esta búsqueda tiene ${s.favs.length} favorito/s seleccionado/s` : "Esta búsqueda no tiene favorito/s seleccionado/s"}.
                                    {s.discarded.length ? ` Esta búsqueda cuenta con ${s.discarded.length} elemento/s descartado/s` : " Esta búsqueda no cuenta con elementos descartados"}



                                </p>
                                <div className="mt-2">
                                    <Link className="font-bold " to={`/ShowSearch/${s.id}`}>{<HiRefresh className="h-7 w-7  inline-block  mb-2 text-MLblue" />} Repetir </Link>
                                    <a className="  cursor-pointer ml-10 font-bold" onClick={() => dispatch(deleteSearch(index))} >{<HiTrash className="h-7 w-7 inline-block mb-2 text-red-600" />}Eliminar </a>
                                </div>
                            </div>
                        </div>
                    ) : <div className="flex flex-col  m-auto text-center text-MLblue ">
                        <p className="font-bold text-3xl pb-3">Nada por aquí</p>
                        <p className="text-xl">No hay búsquedas para mostrar...</p>
                    </div>}


                    <input type="button" onClick={() => dispatch(deleteAllSearches())} className={totalSearches.length > 1 ? `flex w-4/8 h-auto bg-red-600 rounded p-2 px-3 text-white mt-2 cursor-pointer mx-auto` : `hidden`} value="Eliminar todas las búsquedas" />

                </div>

                <div className="relative">
                    <img
                        className="inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:h-auto"
                        src={historicPic}
                        alt={historicPic}
                    />
                </div>
            </div>
        </div>
    );
};




export default Historic