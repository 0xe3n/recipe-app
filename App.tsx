
import React, { useState, useEffect } from 'react';
import { ViewState, Recipe, User } from './types';
import Layout from './components/Layout';
import LandingView from './views/LandingView';
import OnboardingView from './views/OnboardingView';
import HomeView from './views/HomeView';
import SavedView from './views/SavedView';
import ExploreView from './views/ExploreView';
import ProfileView from './views/ProfileView';
import RecipeDetailView from './views/RecipeDetailView';

const MOCK_USER: User = {
  name: "Alex Cook",
  email: "alex@example.com",
  avatar: "https://picsum.photos/seed/alex/200",
  dietaryPreferences: ["Healthy", "Vegetarian"],
  savedRecipes: ['1', '2']
};

const MOCK_SAVED: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Garlic Salmon',
    cookTime: '15 MINS',
    difficulty: 'Easy',
    category: 'HEALTHY',
    image: 'https://picsum.photos/seed/salmon/600/400',
    ingredients: ['Salmon fillet', 'Lemon', 'Garlic', 'Olive oil', 'Salt', 'Black pepper'],
    instructions: ['Season salmon', 'Sear in pan', 'Add lemon and garlic', 'Finish in oven'],
    description: 'A light and zesty salmon dish perfect for a quick healthy dinner.',
    nutritionalInfo: { calories: 350, protein: '34g', carbs: '2g', fat: '22g' }
  },
  {
    id: '2',
    title: 'Mediterranean Bowl',
    cookTime: '10 MINS',
    difficulty: 'Easy',
    category: 'VEGAN',
    image: 'https://picsum.photos/seed/bowl/600/400',
    ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Cherry tomatoes', 'Kalamata olives', 'Tahini'],
    instructions: ['Cook quinoa', 'Chop vegetables', 'Combine in bowl', 'Drizzle with tahini'],
    description: 'Fresh and vibrant bowl packed with plant-based protein.',
    nutritionalInfo: { calories: 420, protein: '15g', carbs: '58g', fat: '14g' }
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [user, setUser] = useState<User>(MOCK_USER);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>(MOCK_SAVED);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const toggleSaveRecipe = (recipe: Recipe) => {
    const isSaved = savedRecipes.some(r => r.id === recipe.id);
    if (isSaved) {
      setSavedRecipes(prev => prev.filter(r => r.id !== recipe.id));
    } else {
      setSavedRecipes(prev => [...prev, recipe]);
    }
  };

  const handleOpenRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setView('recipe-detail');
  };

  const renderView = () => {
    switch (view) {
      case 'landing':
        return <LandingView onStart={() => setView('onboarding')} />;
      case 'onboarding':
        return <OnboardingView onComplete={() => setView('home')} onBack={() => setView('landing')} />;
      case 'home':
        return <HomeView onRecipeSelect={handleOpenRecipe} user={user} />;
      case 'saved':
        return <SavedView recipes={savedRecipes} onRecipeSelect={handleOpenRecipe} toggleSave={toggleSaveRecipe} />;
      case 'explore':
        return <ExploreView onRecipeSelect={handleOpenRecipe} toggleSave={toggleSaveRecipe} />;
      case 'profile':
        return <ProfileView user={user} setUser={setUser} />;
      case 'recipe-detail':
        return selectedRecipe ? (
          <RecipeDetailView 
            recipe={selectedRecipe} 
            onBack={() => setView('home')} 
            isSaved={savedRecipes.some(r => r.id === selectedRecipe.id)}
            onToggleSave={() => toggleSaveRecipe(selectedRecipe)}
          />
        ) : null;
      default:
        return <HomeView onRecipeSelect={handleOpenRecipe} user={user} />;
    }
  };

  return (
    <Layout activeView={view} setView={setView}>
      {renderView()}
    </Layout>
  );
};

export default App;
