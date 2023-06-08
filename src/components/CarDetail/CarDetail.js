import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { numberWithDots, formatCurrency, colorToHEX } from '../../utils/utils';
import { HiOutlineHeart, HiOutlineTrash, HiArrowSmLeft } from "react-icons/hi";
import dateFormat from 'dateformat';
import { Swiper, SwiperSlide } from "swiper/react";
import { saveFav, discardItem } from "../../features/searchesSlice";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../../App.css";

// import required modules
import { Navigation } from "swiper";

import Loader from '../Loader/Loader'
import CarAttributes from '../CarAttributes/CarAttributes';

const CarDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    let { idCar } = useParams();
    let { idSearch } = useParams();

    const [isFetchFinished, setIsFetchFinished] = useState(false);
    const [selectedCarDesc, setSelectedCarDesc] = useState([]);
    const [selectedCarData, setSelectedCarData] = useState({});
    const [selectedCarImgs, setSelectedCarImgs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isInFavs, setIsInFavs] = useState(true);
    const totalSearches = useSelector(state => state.objSearches.searches);

    useEffect(() => {
        fetch(`https://api.mercadolibre.com/items/${idCar}`)
            .then(r => r.json())
            .then(res => {
                setSelectedCarImgs(res.pictures)
                console.log(res);
                let carDoors = res.attributes.find((attribute) => attribute.id === "DOORS");
                let carFuel = res.attributes.find((attribute) => attribute.id === "FUEL_TYPE");
                let carTransmission = res.attributes.find((attribute) => attribute.id === "TRANSMISSION");
                let carBrand = res.attributes.find((attribute) => attribute.id === "BRAND");
                let carEngine = res.attributes.find((attribute) => attribute.id === "ENGINE");
                let carTrim = res.attributes.find((attribute) => attribute.id === "TRIM");
                let carYear = res.attributes.find((attribute) => attribute.id === "VEHICLE_YEAR");
                let carKm = res.attributes.find((attribute) => attribute.id === "KILOMETERS");
                let getColorName = res.attributes.find((attribute) => attribute.id === "COLOR");
                let colorName;
                if (getColorName) {
                    colorName = colorToHEX(getColorName.value_name);
                }

                let saleTerms = res.sale_terms;
                if (saleTerms) {
                    let bank = res.sale_terms.find((term) => term.id === "FINANCEABLE_BY");
                    saleTerms = `Este vehículo es financiable por ${bank.value_name}`
                } else {
                    saleTerms = `Este vehículo no cuenta información sobre la financiación del mismo`
                }

                setSelectedCarData({
                    doors: carDoors.value_name,
                    fuel: carFuel.value_name.toUpperCase(),
                    transmission: carTransmission.value_name.toUpperCase(),
                    brand: carBrand.value_name.toUpperCase(),
                    engine: carEngine.value_name.toUpperCase(),
                    trim: carTrim.value_name.toUpperCase(),
                    year: carYear.value_name,
                    km: carKm.value_name,
                    color: colorName,
                    price: numberWithDots(res.price),
                    currency: formatCurrency(res.currency_id),
                    title: res.title,
                    id: res.id,
                    lastUpdate: dateFormat(res.last_updated),
                    saleTerms: saleTerms,
                    pictures: res.pictures,
                    link: res.permalink,
                })
                console.log(selectedCarData);
            });

        fetch(`https://api.mercadolibre.com/items/${idCar}/description`)
            .then(r => r.json())
            .then(res => {
                setSelectedCarDesc(res.plain_text);
            })


        let selectedSearch = totalSearches.find(s => s.id === Number(idSearch));
        let findFav = selectedSearch.favs.find(fav => fav.id === idCar);
        console.log(isInFavs);
        findFav ? setIsInFavs(true) : setIsInFavs(false);

        setIsFetchFinished(true);
    }, [])



    const manageCar = (option, idSearch) => {
        setLoading(true);
        let selectedSearch = totalSearches.find(s => s.id === Number(idSearch));
        let selectedResult = selectedSearch.result;
        let selectedCar = selectedResult.find(car => car.id === idCar);

        if (option === "favorite") {
            let newFav = {
                idSearch: idSearch,
                car: selectedCar,
            }
            dispatch(saveFav(newFav));
        } else {
            let newDiscard = {
                idSearch: idSearch,
                car: selectedCar,
            }
            dispatch(discardItem(newDiscard));

        }
        navigate('/historic')
        setLoading(true);

    }

    if (!isFetchFinished) return <Loader />;

    return (

        <>
            <div>
                <button onClick={() => navigate(-1)} className="bg-white pl-4 pr-6 py-2 rounded ml-2 mt-6 md:mt-6 mb-0"> <HiArrowSmLeft className="inline-block text-2xl " /> Volver </button>
            </div>

            {loading ? <Loader /> :

                <div>
                    <section>
                        <div className="relative mx-auto max-w-screen-xl px-4 py-5 text-center">
                            <div>
                                <h1 className="text-2xl font-bold lg:text-3xl">{selectedCarData.title ? selectedCarData.title : "N/D"}</h1>
                                <p className="mt-1 text-sm text-gray-500">Ultima actualización: {selectedCarData.lastUpdate ? selectedCarData.lastUpdate : "N/D"}</p>

                                <a target="_blank" href={selectedCarData.link ? selectedCarData.link : ""} className="bg-transparent p-2 rounded block mt-4 w-1/4 m-auto text-MLblue border-2 border-MLblue hover:bg-MLblue hover:text-white  cursor-pointer
                    transition-all ease-in duration-200"> Link a publicación MercadoLibre </a>
                            </div>

                            <div className=" sm:w-6/12 m-auto">
                                <div className="">
                                    <div className="flex">
                                        <Swiper navigation={true} modules={[Navigation]} className="aspect-[4/3]">
                                            {selectedCarImgs.map(pic =>
                                                <SwiperSlide><img alt={selectedCarData.title} src={pic.url} /></SwiperSlide>
                                            )}
                                        </Swiper>
                                    </div>
                                </div>

                                <div className="pt-3 row-gap-10 ">
                                    <div className=" lg:top-0 ">
                                        <form className="space-y-4 lg:pt-8 items-center">
                                            <div className="flex justify-between text-center w-3/4 m-auto">
                                                <fieldset>
                                                    <legend className="text-lg font-bold align-center">Kilometros</legend>
                                                    <p>{selectedCarData.km ? selectedCarData.km : "N/D"}</p>
                                                </fieldset>
                                                <fieldset>
                                                    <legend className="text-lg font-bold">Año</legend>
                                                    {selectedCarData.year ? selectedCarData.year : "N/D"}
                                                </fieldset>

                                                <fieldset>
                                                    <legend className="text-lg font-bold">Color</legend>

                                                    <div className=" flex gap-1">
                                                        <label htmlFor="color_circle" className="cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                id="color_circle"
                                                                name="color"
                                                                className="peer sr-only"
                                                                checked
                                                            />
                                                            {selectedCarData.color !== undefined ?
                                                                <span className={`bg-${selectedCarData.color} ml-3 block h-5 w-5 rounded-full border border-gray-200 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300`}
                                                                ></span>
                                                                : <p>N/D</p>
                                                            }
                                                        </label>

                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div className="rounded border bg-gray-100 p-4">
                                                <p className="text-md text-center">
                                                    <span>{selectedCarData.saleTerms ? selectedCarData.saleTerms : "N/D"}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-center">{selectedCarData.currency} {selectedCarData.price}</p>
                                            </div>

                                            {isInFavs ?
                                                <>
                                                    <button
                                                        type="button"
                                                        className="w-full rounded border border-gray-300 bg-gray-400 px-6 py-3 text-sm font-bold text-white uppercase tracking-wide cursor-no-drop">
                                                        <HiOutlineHeart className="inline-block mr-2 cursor-no-drop	" />Auto agregado a favoritos
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="w-full rounded border border-gray-300 bg-gray-400 px-6 py-3 text-sm font-bold text-white uppercase tracking-wide cursor-no-drop">
                                                        <HiOutlineTrash className="inline-block mr-2 cursor-no-drop	" />No es posible descartarlo
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <button
                                                        onClick={() => manageCar("favorite", idSearch)}
                                                        type="button"
                                                        className="w-full rounded border border-gray-300 bg-MLgreen px-6 py-3 text-sm font-bold text-white uppercase tracking-wide">
                                                        <HiOutlineHeart className="inline-block mr-2" />Añadir a favoritos
                                                    </button>
                                                    <button
                                                        onClick={() => manageCar("discard", idSearch)}
                                                        type="submit"
                                                        className="w-full rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
                                                        <HiOutlineTrash className="inline-block mr-1 text-white cursor-pointer" /> Eliminar de la búsqueda
                                                    </button>
                                                </>
                                            }
                                        </form>
                                    </div>

                                    <div className="mt-6 sm:col-span-3 flex">
                                        <div
                                            className="prose max-w-none">
                                            <h2 >Características</h2>
                                            <p>{selectedCarDesc ? selectedCarDesc : 'El vendedor no facilitó una descripción'}</p>
                                            <CarAttributes
                                                brand={selectedCarData.brand}
                                                trim={selectedCarData.trim}
                                                doors={selectedCarData.doors}
                                                engine={selectedCarData.engine}
                                                fuel={selectedCarData.fuel}
                                                transmission={selectedCarData.transmission}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>}
        </>


    )
}

export default CarDetail

