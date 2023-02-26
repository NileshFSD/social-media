import "./App.css";
import "./Styles/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import Error from "./Pages/Error";
import Dashboard from "./Pages/Dashboard";
import Createpost from "./Pages/Createpost";
import FollowingFollowers from "./Pages/FollowingFollowers";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />

            <Route path="/profile/:id" element={<FollowingFollowers />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createpost" element={<Createpost />} />
          </Route>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
