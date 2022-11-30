import { useState } from 'react'
import { transformImageUrl, numberWithDots, formatCurrency } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { dropFav } from '../../features/searchesSlice';
import Loader from "../Loader/Loader"

const CardFav = (car) => {
    const year = car.attributes.find((attribute) => attribute.id === "VEHICLE_YEAR");
    const km = car.attributes.find((attribute) => attribute.id === "KILOMETERS");

    const totalSearches = useSelector(state => state.objSearches.searches);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)

    const unsaveFav = (idSearch, idCar) => {
        setLoading(true);
        let selectedSearch;
        let selectedCar;
        let carDrop;

        if (idCar !== undefined) {
            selectedSearch = totalSearches.find(s => s.id === Number(idSearch));
            selectedCar = selectedSearch.favs.find(car => car.id === idCar);

            carDrop = {
                idSearch: idSearch,
                car: selectedCar,
            }
            dispatch(dropFav(carDrop));

        }
        setLoading(false)

    }

    return (
        <>
            <div className="w-96 shrink-0 antialiased text-gray-900 mx-2 align-items-cent">
                <div>
                    <img src={transformImageUrl(car.thumbnail)} alt={car.title} className="w-full object-cover object-center rounded-lg shadow-md aspect-[4/3]" />
                    <div className="relative px-4 -mt-16  ">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex items-baseline">
                                <span className=" text-md   inline-block rounded  uppercase font-semibold ">
                                    {formatCurrency(car.currency_id)} {numberWithDots(car.price)}
                                </span>
                            </div>
                            <h4 className="mt-1 text-xl font-semibold  leading-tight truncate">{car.title}</h4>

                            <div className="flex justify-center">
                                <div className="left-0">
                                    <div className=" text-gray-600 uppercase text-xs font-semibold tracking-wider pt-2">
                                        {year.value_name}  &bull; {numberWithDots(km.value_name)}
                                    </div>
                                    <Link to={`/CarDetail/${car.idSearch}/${car.idML}`} ><input type="button" className=" bg-white rounded px-4 mt-1 text-MLblue border-2
                                         border-MLblue hover:bg-MLblue hover:text-white  cursor-pointer transition-all ease-in duration-200" value="Más información" /></Link>
                                </div>
                                <div onClick={() => unsaveFav(car.idSearch, car.idML)} className="inline-block m-auto my-2">
                                    <HiOutlineHeart className="absolute text-5xl text-green-500" />
                                    <HiHeart className="absolute text-5xl text-green-500 cursor-pointer hover:hidden transition-all ease-in" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardFav