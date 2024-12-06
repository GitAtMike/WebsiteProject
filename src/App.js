import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import RecipeList from "./components/RecipeList/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import Favorites from "./components/Favorites/Favorites";
import Login from "./components/Login/Login";

function App() {
  const [recipes, setRecipes] = useState([]);

  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        {isLoggedIn && (
          <>
            <Route
              path="/home"
              element={
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route
              path="/recipes"
              element={
                <RecipeList
                  recipes={recipes}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  setRecipes={setRecipes}
                />
              }
            />
            <Route
              path="/recipes/:id"
              element={<RecipeDetail recipes={recipes} />}
            />
            <Route
              path="/create"
              element={
                <CreateRecipe recipes={recipes} setRecipes={setRecipes} />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites favorites={favorites} setFavorites={setFavorites} />
              }
            />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
