import "./App.css";
import "./Styles/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import ProtectedProfile from "./Pages/ProtectedProfile";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Error from "./Pages/Error";
import Dashboard from "./Pages/Dashboard";
import Createpost from "./Pages/Createpost";
import FollowingFollowers from "./Pages/FollowingFollowers";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedProfile Component={Signup} />} />
          <Route
            path="/login"
            element={<ProtectedProfile Component={Login} />}
          />
          {}
          <Route
            path="/dashboard"
            element={<ProtectedRoute Component={Dashboard} />}
          />
          <Route path="/profile" element={<Profile />} />

          <Route path="/profile/:id" element={<FollowingFollowers />} />

          <Route path="/createpost" element={<Createpost />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
