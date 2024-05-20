import './App.css';
import UserListPage from './components/UserListPage'; // Import the Form component instead of App
import { Routes,  Route} from "react-router-dom";

function App() {


  return (
    <div className="App">
      <Routes>
          <Route exact path="/utilisateurs" element={<UserListPage/>}/>
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
    </div>
  );
}
export default App;
