import React, { FC } from 'react';
import { Main } from './containers';
import {BrowserRouter} from "react-router-dom";

const App: FC = () => {
  return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
  );
};

export default App;
