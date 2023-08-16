import React from "react";
import { 
  BrowserRouter as Router, 
  Route, 
  Switch
} from "react-router-dom";

import MealsList from "./pages/MealsList/MealsList";
import Home from "./pages/Home/Home";
import Nav from "./components/Nav/Nav";
import MealInfo from "./pages/MealInfo/MealInfo";
import ReviewInfo from "./pages/ReviewInfo/ReviewInfo";
import FormReview from "./components/FormReview/FormReview";

function App() {
  return (
    <Router>
      <Nav />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/meals" >
          <MealsList />
        </Route>


        <Route exact path="/meals/:id" >
          <MealInfo />
        </Route>

        <Route exact path="/meals/:id/reviews/add-review">
          <FormReview />
          <ReviewInfo />
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
