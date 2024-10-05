import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/pages/Login";
import ExperimentsList from "./components/pages/ExperimentsList";
import Experiment from "./components/pages/Experiment";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/experiments" element={<ExperimentsList />} />
        <Route path="/experiments/:experiment_id" element={<Experiment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
