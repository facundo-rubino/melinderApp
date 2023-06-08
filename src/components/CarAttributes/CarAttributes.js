import { useState, useEffect } from 'react'

import BrandSVG from '../../img/cardsSVG/Brand.svg'
import DoorsSVG from '../../img/cardsSVG/Doors.svg'
import EngineSVG from '../../img/cardsSVG/Engine.svg'
import FuelSVG from '../../img/cardsSVG/Fuel.svg'
import TransmissionSVG from '../../img/cardsSVG/Transmission.svg'
import TrimSVG from '../../img/cardsSVG/Trim.svg'
import Loader from '../Loader/Loader'

const CarAttributes = (props) => {
    const [arePropsReady, setArePropsReady] = useState(false);

    let transformDoorNumbers = (doorsNumber) => {
        switch (doorsNumber) {
            case 1: return `UNA`;
            case 2: return `DOS`;
            case 3: return `TRES`;
            case 4: return `CUATRO`;
            case 5: return `CINCO`;
            case 6: return `SEIS`;
            case 7: return `SIETE`;
            case 8: return `OCHO`;
            case 9: return `NUEVE`;
        }
        return `N/D`
    }

    useEffect(() => {
        setArePropsReady(true)
    }, [props])

    if (!arePropsReady) return <Loader />;
    return (

        <div className="container mx-auto  md:px-20 lg:px-0">
            <div >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 py-10">
                    <div className="flex flex-col justify-center items-center py-4 p-2 bg-gray-100 rounded-lg md:h-40">
                        <div>
                            <img src={BrandSVG} className="w-10 h-10 inline my-0 mb-1" alt="Marca SVG" />
                            <p className="text-xl inline font-medium text-MLblue">Marca</p>
                        </div>
                        <p className="text-xl font-bold my-0 mt-4">{props.brand ? props.brand : `N/D`}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center py-4 p-2 bg-gray-100 rounded-lg md:h-40">
                        <div>
                            <img src={TrimSVG} className="w-10 h-10 inline my-0 mb-1  " alt="Modelo SVG" />
                            <p className="text-xl inline font-medium pl-2 text-MLblue">Modelo</p>
                        </div>

                        <p className="text-xl font-bold my-0 mt-4">{props.trim ? props.trim : `N/D`}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center py-4 p-2 bg-gray-100 rounded-lg md:h-40">
                        <div>
                            <img src={DoorsSVG} className="w-10 h-10 inline my-0 mb-1 " alt="Puertas SVG" />
                            <p className="text-xl inline font-medium  pl-2 text-MLblue">Puertas</p>
                        </div>

                        {<p className="text-xl font-bold my-0 mt-4">{props.doors ? transformDoorNumbers(Number(props.doors)) : 'N/D'}</p>}
                    </div>
                    <div className="flex flex-col justify-center items-center py-4 p-2 bg-gray-100 rounded-lg md:h-40">
                        <div>
                            <img src={EngineSVG} className="w-10 h-10 inline my-0 mb-1 " alt="Motor SVG" />
                            <p className="text-xl inline font-medium  pl-2 text-MLblue">Motor</p>
                        </div>

                        {<p className="text-xl font-bold my-0 mt-4">{props.engine ? props.engine : `N/D`}</p>}
                    </div>
                    <div className="flex flex-col justify-center items-center py-4 p-2 bg-gray-100 rounded-lg md:h-40">
                        <div>
                            <img src={FuelSVG} className="w-10 h-10 inline my-0 mb-1" alt="Combustible SVG" />
                            <p className="text-xl inline font-medium  pl-2 text-MLblue ">Combustible</p>
                        </div>

                        {<p className="text-xl font-bold my-0 mt-4">{props.fuel ? props.fuel : `N/D`}</p>}
                    </div>
                    <div className="flex flex-col justify-center items-center py-4 p-2 bg-gray-100 rounded-lg md:h-40">
                        <div>
                            <img src={TransmissionSVG} className="w-10 h-10 inline my-0 mb-1  " alt="Transmisión SVG" />
                            <p className="text-xl inline font-medium  text-MLblue ">Transmisión</p>
                        </div>

                        {<p className="text-xl font-bold my-0 mt-4">{props.transmission ? props.transmission : `N/D`}</p>}
                    </div>


                </div>



            </div>



        </div >

    )
}

export default CarAttributes