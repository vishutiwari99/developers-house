import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navigation from "./components/shared/navigation/Navigation";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <Switch>
        <Route path="/register" exact component={Register} />
      </Switch>
      <Switch>
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
