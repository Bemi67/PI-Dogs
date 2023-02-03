import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";



function App() {
  return (
   
      <BrowserRouter>
      <div>
       <Switch>
       <Route exact path="/" component={LandingPage} />
       <Route exact path="/home" component={Home} />
       </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
