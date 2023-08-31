import Signup from "./Signup";
import Appbar from "./Appbar";
import Signin from "./Signin";
import Addcourse from "./Addcourse";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#e2e2e2" }}
      >
        <Router>
          {" "}
          <Appbar />
          <Routes>
            <Route path={"/addcourse"} element={<Addcourse />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/signin"} element={<Signin />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
