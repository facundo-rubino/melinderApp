import { Link } from 'react-router-dom'


const NotFound = () => {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-MLblue">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
            <div className="bg-MLyellow px-2 text-sm rounded rotate-12 absolute">
                Página no encotrada :(
            </div>
            <button className="mt-5">
                <a
                    className="relative inline-block text-sm font-medium text-MLyellow group active:text-yellow-500 focus:outline-none focus:ring"
                >
                    <span
                        className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-MLyellow group-hover:translate-y-0 group-hover:translate-x-0"
                    ></span>

                    <span className="relative block px-8 py-3 bg-MLblue border border-current">
                        <Link to="/">Volver al inicio</Link>
                    </span>
                </a>
            </button>
        </main>
    )
}

export default NotFound