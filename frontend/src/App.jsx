import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestView from "./pages/Testview";

console.log("🚀 Iniciando App.jsx...");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestView />} />
      </Routes>
    </Router>
  );
}

export default App;
