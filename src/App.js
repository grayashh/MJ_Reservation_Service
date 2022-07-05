import "./App.css";
import Join from "./Sign/Join";
import Login from "./Sign/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="user/join" element={<Join />} />
          <Route path="user/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
