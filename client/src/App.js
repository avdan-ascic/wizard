import axios from "axios";
import { BrowserRouter } from "react-router-dom";

import MainRouter from "./MainRouter";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
