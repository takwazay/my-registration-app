import './App.css';
import { useState, useEffect } from 'react';
import UserListPage from './components/UserListPage'; // Import the Form component instead of App
import { Routes,  Route} from "react-router-dom";

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
      <Routes>
          <Route exact path="/utilisateurs" element={<UserListPage/>}/>
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
      <header className="App-header">
        <h1>Users manager</h1>
        <p>{usersCount} user(s) already registered</p>
      </header>
    </div>
  );
}
export default App;
