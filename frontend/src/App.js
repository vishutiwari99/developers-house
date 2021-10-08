import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Navigation from "./components/shared/navigation/Navigation";
import Authenticate from "./pages/authenticate/Authenticate";
import Activate from "./pages/activate/Activate";
import Rooms from "./pages/rooms/Rooms";
import { useSelector } from "react-redux";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        {/* <Route path="/" exact component={Home} /> */}
        <GuestRoute exact path="/">
          <Home />
        </GuestRoute>
        <GuestRoute path="/authenticate">
          <Authenticate />
        </GuestRoute>
        <SemiProtectedRoute path="/activate">
          <Activate />
        </SemiProtectedRoute>
        <ProtectedRoute path="/rooms">
          <Rooms />
        </ProtectedRoute>
      </Switch>
      {/* <Switch>
        <Route path="/register" exact component={Register} />
      </Switch>
      <Switch>
        <Route path="/login" exact component={Login} />
      </Switch> */}
    </Router>
  );
}

const GuestRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          <Redirect
            to={{
              pathname: "/rooms",
              state: {
                from: location,
              },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};

const SemiProtectedRoute = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: location,
              },
            }}
          />
        ) : isAuth && !user.activated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/rooms",
              state: {
                from: location,
              },
            }}
          />
        );
      }}
    ></Route>
  );
};

const ProtectedRoute = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: location,
              },
            }}
          />
        ) : isAuth && !user.activated ? (
          <Redirect
            to={{
              pathname: "/activate",
              state: {
                from: location,
              },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};
export default App;
