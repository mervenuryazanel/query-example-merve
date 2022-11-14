import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import { QueryClientProvider, QueryClient } from 'react-query';
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'



function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/super-heroes' element={ <SuperHeroesPage />} >
              {/* <SuperHeroesPage /> */}
            </Route>
            <Route path='/rq-super-heroes' element={ <RQSuperHeroesPage />}>
              {/* <RQSuperHeroesPage /> */}
            </Route>
            <Route path='/' element={<HomePage /> }>
              {/* <HomePage /> */}
            </Route>
          </Routes>
        </div>
      </Router>

  )
}

export default App