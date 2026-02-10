import { useState, useEffect } from 'react'
import './App.css'
import CharacterCard from './components/CharacterCard'
import EpisodeCard from './components/EpisodeCard'
import LocationCard from './components/LocationCard'
import { fetchCharacter, fetchCharacters, fetchEpisodes, fetchLocations } from './services/api'

function App() {
  const [view, setView] = useState('search'); // 'search', 'characters', 'episodes', 'locations'
  const [data, setData] = useState([]);
  const [singleCharacter, setSingleCharacter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [characterId, setCharacterId] = useState(1)
  const [inputValue, setInputValue] = useState(1)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      // Don't clear data immediately if we want to preserve previous view while loading,
      // but usually clearing is safer to avoid mixups.
      if (view !== 'characters' || (view === 'characters' && !singleCharacter)) {
        setData([]);
      }

      try {
        if (view === 'characters') {
          // If we are in characters view and have a singleCharacter, we don't need to fetch the list 
          // unless the user clears the search. 
          // If singleCharacter is null, we fetch the list.
          if (!singleCharacter) {
            const result = await fetchCharacters();
            setData(result);
          }
        } else if (view === 'episodes') {
          const result = await fetchEpisodes();
          setData(result);
        } else if (view === 'locations') {
          const result = await fetchLocations();
          setData(result);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [view, singleCharacter]); // Re-run when view changes or when singleCharacter state changes (search/clear)

  // Function to perform the search
  const performSearch = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCharacter(id);
      setSingleCharacter(data);
      setData([]); // Clear list data when showing single result
    } catch (err) {
      setError(err.message || 'Failed to fetch character');
      setSingleCharacter(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue) {
      setCharacterId(inputValue); // Keep this state synced if needed, but mainly we call performSearch
      performSearch(inputValue);
    }
  };

  const clearSearch = () => {
    setSingleCharacter(null);
    setInputValue('');
    // The useEffect will trigger and reload the list because !singleCharacter
  };

  const cleanRandomId = () => {
    const randomId = Math.floor(Math.random() * 50) + 1;
    setInputValue(randomId);
    setCharacterId(randomId);
    performSearch(randomId);
  }

  return (
    <div className="app-container">
      <header>
        <h1>The Simpsons API Explorer</h1>
        <nav className="main-nav">
          <button onClick={() => { setView('characters'); setSingleCharacter(null); }} className={view === 'characters' ? 'active' : ''}>Characters</button>
          <button onClick={() => setView('episodes')} className={view === 'episodes' ? 'active' : ''}>Episodes</button>
          <button onClick={() => setView('locations')} className={view === 'locations' ? 'active' : ''}>Locations</button>
        </nav>
      </header>

      <main>
        {view === 'characters' && (
          <div className="controls">
            <form onSubmit={handleSearch}>
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter Character ID"
                min="1"
              />
              <button type="submit">Search ID</button>
            </form>
            <button onClick={cleanRandomId} className="random-btn">Random</button>
            {singleCharacter && <button onClick={clearSearch} style={{ backgroundColor: '#666' }}>Show All</button>}
          </div>
        )}

        <div className={`content-area ${!singleCharacter ? 'grid-view' : ''}`}>
          {loading && <div className="loading">Loading...</div>}
          {error && <div className="error">Error: {error}</div>}

          {!loading && !error && (
            <>
              {view === 'characters' && singleCharacter && (
                <CharacterCard character={singleCharacter} />
              )}

              {view === 'characters' && !singleCharacter && data.map((char, index) => (
                <CharacterCard key={char.id || index} character={char} />
              ))}

              {view === 'episodes' && data.map((ep, index) => (
                <EpisodeCard key={ep.id || index} episode={ep} />
              ))}

              {view === 'locations' && data.map((loc, index) => (
                <LocationCard key={loc.id || index} location={loc} />
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
