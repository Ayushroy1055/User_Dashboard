import axios from "axios";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import UserList from "./userlist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
   <Router>
      <h1>User Dashboard</h1>
      <Routes>
        <Route path="/" element={<Dashboard users={users} />} />
        <Route path="/userlist" element={<UserList users={users} />} />
      </Routes>
    </Router>
  );
}

export default App;
