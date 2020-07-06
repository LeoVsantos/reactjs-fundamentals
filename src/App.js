import React, {useEffect, useState, useCallback} from "react";
import api from './services/api';

import "./styles.css";


function App() {
  
  const [repos, setRepos] = useState([]);
  
  useEffect(() => {
    try {
      api.get('/repositories').then(response => {
        setRepos(response.data);
      });
      
    } catch(err) {
      console.log(err);
      return;
    }
  }, [])
  
  
  const handleAddRepository = useCallback(async () => {
    
    const {data} = await api.post('/repositories', {
      title: 'Login JWT',
      url: 'https://github.com/',
      techs: 'ReactJs, React Native, NodeJs'
    });
    
    setRepos(repos => [...repos, data]);
    
  }, []);
  
  const handleRemoveRepository = useCallback( async (id) => {
    await api.delete(`/repositories/${id}`);
    
    
    setRepos(repos.filter(repo => repo.id !== id));
    
  }, [repos]);
  
  return (
    <div>
    <ul data-testid="repository-list">
    
    {repos.map(repo => {
      
      return (
        <li key={repo.id}>
        {repo.title}
        
        <button onClick={() => handleRemoveRepository(`${repo.id}`)}>
        Remover
        </button>
        </li>
        )
      })}
      
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
      </div>
      );
    }
    
    export default App;
    