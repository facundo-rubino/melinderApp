import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <Outlet />
                <Footer className="mt-auto bottom-0" />
            </div>

        </>
    )
}

export default Main