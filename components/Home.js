import { useNavigate } from 'react-router-dom';
import cookbookImage from '../images/cookbook.png'; // Import the image

function Home({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      // Handle logout logic
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      navigate('/login'); // Redirect to login page after logout
    } else {
      // Navigate to login page
      navigate('/login');
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <ul>
          <li><button className="recipes" onClick={() => navigate('/recipes')}>Recipes</button></li>
          <li><button className="create" onClick={() => navigate('/create')}>Create Recipe</button></li>
          <li><button className="favorites" onClick={() => navigate('/favorites')}>Favorites</button></li>
          <li>
            <button
              className="auth"
              onClick={handleAuthButtonClick}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main>
        <h1>Welcome to the Recipe Website!</h1>
        <p>
          Explore a variety of recipes, save your favorites, and even create your own.
          Use the buttons above to navigate through the site!
        </p>
        {/* Display the Image */}
        <img
          src={cookbookImage}
          alt="Cookbook"
          className="home-image"
        />
      </main>
    </div>
  );
}

export default Home;