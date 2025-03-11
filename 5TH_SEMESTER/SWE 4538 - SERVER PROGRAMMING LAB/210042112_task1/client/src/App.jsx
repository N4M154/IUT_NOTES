import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreatePet from "./components/CreatePet";
import PetStats from "./components/PetStats";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-violet-500 p-4 text-white text-center">
          <h1 className="text-2xl">Virtual Pet Playground</h1>
        </header>

        <div className="p-4">
          <nav>
            <ul className="flex justify-center space-x-4 mb-4">
              {/* <li>
                <Link to="/" className="text-blue-600">
                  Home
                </Link>
              </li> */}
              <li>
                <Link to="/create-pet" className="text-violet-600">
                  Create Pet
                </Link>
              </li>
              <li>
                <Link to="/pet-stats" className="text-violet-600">
                  Pet Stats
                </Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <h2 className="text-center">
                  210042112 - Task 1 - Virtual Pet Playground
                </h2>
              }
            />
            <Route path="/create-pet" element={<CreatePet />} />
            <Route path="/pet-stats" element={<PetStats />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
