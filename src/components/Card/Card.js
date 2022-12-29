import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { HiHeart, HiTrash } from "react-icons/hi";
import { transformImageUrl, numberWithDots, formatCurrency } from '../../utils/utils';
import { saveFav, discardItem } from "../../features/searchesSlice";
import Loader from "../Loader/Loader"

const Card = ({ id, idML, key, title, price, currency_id, attributes, thumbnail }) => {
    const dispatch = useDispatch();
    let { idSearch } = useParams();
    const [loading, setLoading] = useState(false)
    const totalSearches = useSelector(state => state.objSearches.searches);

    const year = attributes.find((attribute) => attribute.id === "VEHICLE_YEAR");
    const km = attributes.find((attribute) => attribute.id === "KILOMETERS");

    const manageCar = (option, idML) => {
        setLoading(true);
        let selectedSearch = totalSearches.find(s => s.id === Number(idSearch));
        let selectedResult = selectedSearch.result;
        let selectedCar = selectedResult.find(car => car.id === idML);

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
        setLoading(false);

    }

    return (
        <>
            {loading ? <Loader /> :
                <div className="bg-white shadow rounded px-5 w-11/12 m-auto">
                    <h2 className="text-MLblue text-lg truncate ... py-3">{title}</h2>
                    <img className="object-cover h-max w-full aspect-[4/3] " src={transformImageUrl(thumbnail)} alt={`Imagen de ${title}`} />
                    <div className="flex justify-center py-5 ">
                        <HiTrash className="m-auto text-4xl  hover:cursor-pointer fill-red-700 hover:rotate-3  transition-all ease-in ml-7" onClick={() => manageCar("discard", idML)} />

                        <div className="m-auto text-center ">
                            <p className="font-semibold text-lg">{formatCurrency(currency_id)} {numberWithDots(price)}  </p>
                            <p>{year.value_name} | {numberWithDots(km.value_name)}</p>

                            <Link to={`/CarDetail/${idSearch}/${idML}`} ><input type="button" className="bg-white p-2 rounded px-4 mt-2 text-MLblue border-2 border-MLblue hover:bg-MLblue hover:text-white  cursor-pointer
                    transition-all ease-in duration-200" value="Más info" /></Link>
                        </div>
                        <HiHeart id={id} className="m-auto text-4xl  hover:cursor-pointer fill-MLgreen hover:rotate-3  transition-all ease-in mr-7" onClick={() => manageCar("favorite", idML)} />
                    </div>
                </div >
            }
        </>
    )
}

export default Card