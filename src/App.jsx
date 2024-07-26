import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <LoadingBar
        color="#B80000"
        // color="black"
        shadow={true}
        height={4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home setProgress={setProgress} />} />
          <Route path="/:filter" element={<Home setProgress={setProgress} />} />
          <Route
            path="/:filter/:date"
            element={<Home setProgress={setProgress} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
