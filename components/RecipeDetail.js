import { useParams } from 'react-router-dom';

function RecipeDetail({ recipes }) {
  const { id } = useParams();

  const recipe = recipes.find(recipe => recipe.id === parseInt(id));

  if (!recipe) {
    return <h2>Recipe not found!</h2>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
    </div>
  );
}

export default RecipeDetail;