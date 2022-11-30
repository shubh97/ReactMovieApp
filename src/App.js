import './App.css';
import Header from './components/Header/Header'
import MainNav from './components/MainNav'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Trending from './pages/Trending/Trending'
import Movies from './pages/Movies/Movies'
import Series from './pages/Series/Series';
import Search from './pages/Search/Search';
import { Container } from '@material-ui/core'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path='/' element={<Trending />}/>
            <Route path='/movies' element={<Movies />}/>
            <Route path='/series' element={<Series />}/>
            <Route path='/search' element={<Search />}/>
          </Routes>
        </Container>
      </div>
      <MainNav />
    </BrowserRouter>
  );
}

export default App;
