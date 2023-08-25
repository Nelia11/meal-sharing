import React from "react";
import { 
  BrowserRouter as Router, 
  Route, 
  Switch
} from "react-router-dom";

import MealsList from "./pages/MealsList/MealsList";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import MealInfo from "./pages/MealInfo/MealInfo";
import ReviewInfo from "./pages/ReviewInfo/ReviewInfo";
import About from "./pages/About/About";
import Footer from "./Footer/Footer";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/meals" >
          <MealsList />
        </Route>

        <Route exact path="/meals/:id" >
          <MealInfo />
        </Route>

        <Route exact path="/meals/:id/reviews/add-review">
          <ReviewInfo />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
