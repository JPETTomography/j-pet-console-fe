import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/pages/Login";
import ExperimentsList from "./components/pages/ExperimentsList";
import Experiment from "./components/pages/Experiment";
import DetectorsList from "./components/pages/DetectorsList";
import Detector from "./components/pages/Detector";
import TagsList from "./components/pages/TagsList";
import Tag from "./components/pages/Tag";
import RadioisotopesList from "./components/pages/RadioisotopesList";
import Radioisotope from "./components/pages/Radioisotope";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/experiments" element={<ExperimentsList />} />
        <Route path="/experiments/:experiment_id" element={<Experiment />} />
        <Route path="/detectors" element={<DetectorsList />} />
        <Route path="/detectors/:detector_id" element={<Detector />} />
        <Route path="/tags" element={<TagsList />} />
        <Route path="/tags/:tag_id" element={<Tag />} />
        <Route path="/radioisotopes" element={<RadioisotopesList />} />
        <Route
          path="/radioisotopes/:radioisotope_id"
          element={<Radioisotope />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
