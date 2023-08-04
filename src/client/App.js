import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealsList from "./components/MealsList/MealsList";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/meals" component={MealsList} />
      </Switch>
    </Router>
  );
}

export default App;
