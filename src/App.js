import React, { useContext, useReducer, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import routes from "routes";
import Context from "store/context";
import Layout from "components/Layout";
import reducer from "store/reducer";
import "assets/css/common.css";

function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
        <Context.Provider value={{ state, dispatch }}>
          <Suspense fallback={null}>
            <Layout>
              <Route component={routes} />
            </Layout>
          </Suspense>
        </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
