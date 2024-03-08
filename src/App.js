import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  let [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const port = process.env.REACT_APP_SERVER_PORT;
    async function countUsers() {
      try {
        const api = axios.create({
          baseURL: `http://localhost:${port}`
        });
        const response = await api.get(`/users`);
        setUsersCount(response.data.utilisateurs.length)
      } catch (error) {
        console.error(error);
      }
    }
    countUsers()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Users manager</h1>
        <p>{usersCount} user(s) already registered</p>
      </header>
    </div>
  );
}
export default App;
