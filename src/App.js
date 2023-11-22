import React from "react";
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { userReducer } from "./store/reducer";
import VideoMeet from "./VideoMeet";
import Routers from "./Routers";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
export const store = createStore(userReducer);

const App = () => {
  return (
    <>
    <Routers/>
    <Provider store={store}>
    <BrowserRouter>
        <Routes>  
          <Route path={`/videocall`} element={ <VideoMeet />} />
        </Routes>
      </BrowserRouter>
      </Provider> 
    </>

  )
}

export default App