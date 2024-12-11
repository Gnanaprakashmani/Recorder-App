import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./privateRoute";
import AuthUI from "./Auth";
import AudioRecorder from "./AudioRecorder";
import { ROUTE_CONSTANT } from "./constant/routeConstant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthUI />} />
        <Route
          path={ROUTE_CONSTANT.RECORD}
          element={
            <ProtectedRoute>
              <AudioRecorder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
