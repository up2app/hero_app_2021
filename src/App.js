//react
import { useState, useEffect } from 'react';

//components
import Hero from './components/heros/hero';

//styles
import './App.css';

//import the API config file
import { API } from './api'

const App = () => {

  const [heros, setHeros] = useState([])

  useEffect(() => {
    loadHeros()
  }, [])

  const loadHeros = async () => {
    let result = await fetch(`${API.base}/all`, { method: `GET` })
    let data = await result.json()
    setHeros(data)
  }

  const activeHeroHandler = async (id) => {
    let result = await fetch(`${API.base}/reactivate/${id}`, { method: `PUT` })
    let data = await result.json()
    console.log(`active date => `, data)
    if (data !== undefined)
      loadHeros()
  }

  const deleteHeroHandler = async (id) => {
    let result = await fetch(`${API.base}/heros/delete/${id}`, { method: `DELETE` })
    let data = await result.json()
    console.log(`delete date => `, data)
    if (data !== undefined)
      loadHeros()
  }

  return (
    <div className="App">
      {
        heros.map(hero => <Hero
          key={hero.hero_id}
          hero={hero}
          activeHero={activeHeroHandler}
          deleteHero={deleteHeroHandler}></Hero>)
      }
    </div>
  );
}

export default App;
