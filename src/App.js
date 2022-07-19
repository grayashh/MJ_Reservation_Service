import "./App.css";
import Main from "./pages/main/Main";
import NotFound from "./pages/error/NotFound";
import Reservation from "./pages/reservation/Reservation";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/reservation/court" element={<Reservation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
