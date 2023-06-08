import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import NotFound from './components/NotFound/NotFound';
import Favorites from './components/Favorites/Favorites';
import Main from './components/Main/Main';
import Historic from './components/Historic/Historic';
import CarDetail from './components/CarDetail/CarDetail';
import ShowSearch from './components/ShowSearch/ShowSearch';
import Search from './components/Search/Search';

function App() {

  const params = useParams();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Main />} >
            <Route path="/" element={<Search />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="historic" element={<Historic />} />
            <Route path="ShowSearch/:idSearch" element={<ShowSearch />} />
            <Route path="CarDetail/:idSearch/:idCar" element={<CarDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
