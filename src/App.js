import './App.css';
import { useState, useEffect } from 'react';

function App() {
  let [usersCount, setUsersCount] = useState(0);
  
  useEffect(() => {
    const countUsers = async () => {
      try {
        let count = await countUsers();
        setUsersCount(count)
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
