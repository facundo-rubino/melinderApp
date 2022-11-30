import TailwindLogo from '../../img/Tailwind@2x.png'
import ReactLogo from '../../img/ReactJs@2x.png'
import MelinderLogo from '../../img/melinder1.png'

const Footer = () => {
    return (
        <>
            <div className="w-full bg-MLyellow h-14 bottom-0 flex justify-center ">
                <img className="m-auto w-24" src={MelinderLogo} alt="Logo de React Js" />

                <p className="m-auto font-medium text-xs lg:text-lg">© Facundo Rubino - 2022</p>
                <div className="m-auto">
                    <img className="inline-block w-5 lg:w-10 " src={ReactLogo} alt="Logo de React Js" />
                    <img className="inline-block w-5 lg:w-10" src={TailwindLogo} alt="Logo de Tailwind Css" />
                </div>
            </div>
        </>
    )
}

export default Footer