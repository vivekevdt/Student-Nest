import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'leaflet/dist/leaflet.css';

import {  persistor,store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    ,
  </StrictMode>
);
