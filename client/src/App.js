//este archivo tiene que ser lo más limpio y sencillo posible
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";
import Home from "./Components/Home.jsx";
import Details from "./Components/Detail.jsx";
import Form from "./Components/Form.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dogs/:id" component={Details} />
          <Route exact path="/home/form" component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
