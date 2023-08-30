import Signup from "./Signup";
import Appbar from "./Appbar";

function App() {
  return (
    <>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#e2e2e2" }}
      >
        <Signup />
        <Appbar />
      </div>
    </>
  );
}

export default App;
