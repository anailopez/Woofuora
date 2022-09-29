import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import HomePage from "./components/HomePage";
import SingleSpace from "./components/SingleSpace/SingleSpace";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions?.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app">
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage isLoaded={isLoaded} />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          {/* <Route exact path="/signup">
            <SignupFormPage />
          </Route> */}
          {/* <Route exact path="/user-profile">
            <UserProfile />
          </Route> */}
          <Route exact path='/spaces/:spaceId'>
            <SingleSpace isLoaded={isLoaded} />
          </Route>
          <Route>
            <LoginFormPage />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
