import React, { useState, useEffect, useRef } from 'react';
import { ChefHat, Plus, X, Sparkles } from 'lucide-react';
import { getRecipeFromMistral } from "../ai/ai.js";
import Recipe from './Recipe.js';


function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [recipe, setRecipe] = React.useState("");
const loaderRef = useRef<HTMLDivElement | null>(null);
  const Loader = () => (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );
  const messages = [
    "🍲 Swad ka intezar ho raha hai... Generating your tasty veg recipe!",
    "👨‍🍳 Masale mix ho rahe hain... Aapki perfect vegetarian recipe ready ho rahi hai!",
    "🥘 Bas thoda patience, ek zabardast veg dish aa rahi hai!",
    "🍛 Chulha garam ho raha hai... Tasty vegetarian recipe loading!",
    "🌶️ Flavors ka tadka lag raha hai... Swadisht veg recipe on the way!",
    "🥄 Ek chammach wait, ek lajawab vegetarian recipe aa rahi hai!",
    "🍽️ Bhook lagi? Bas thoda intezar, ek mazedar vegetarian recipe aa rahi hai!",
    "🫕 Perfect combination of taste and masala... Veg recipe tayar ho rahi hai!",
    "🔥 Spices ka magic ho raha hai shuru... Swadisht vegetarian recipe on the way!",
    "🍜 Kadai chadh gayi, ab bas ingredients mil rahe hain... Veg recipe loading!",
    "🍲 I am creating your vegetarian recipe, please wait...",
    "🥦 Sabzi ka swad aa raha hai... Aapki veg recipe tayar ho rahi hai!",
    "🍚 Tasty rice ke saath, swad ka explosion hone wala hai!",
    "🥢 Swad se bharpoor, aapke liye perfect vegetarian recipe ban rahi hai!",
    "🍅 Fresh vegetables ka swad aa gaya hai, bas thodi der!",
    "🍆 Brinjal ke swad ka tadka lag raha hai, vegetarian dish ready ho rahi hai!",
    "🌾 Grains and vegetables ka combination, amazing recipe loading!",
    "🥄 Ek aur chammach masala, bas vegetarian recipe ready hogi!",
    "🍪 Khaas ingredients mil rahe hain, wait karen!",
    "🌽 Makkai aur masale ka perfect combination, veg recipe on the way!"
  ];
  
  const getRandomMessage = () => messages[Math.floor(Math.random() * messages.length)];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.toLowerCase().trim())) {
      setIngredients([...ingredients, newIngredient.charAt(0).toUpperCase() + newIngredient.slice(1).toLowerCase().trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };
  const ToggleGetRecipe = async (): Promise<void> => {
    setLoading(true);

    setTimeout(() => {
        loaderRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
        const recipeMarkdown: string = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);
    } catch (error) {
        setRecipe("Sorry, we couldn't generate a recipe at this time.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 group">
              <ChefHat className="w-8 h-8 text-emerald-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-emerald-200 to-emerald-400 text-transparent bg-clip-text">
                ChefGPT
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        {/* Ingredient Input */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center mb-12 animate-fade-in">
          <input
            type="text"
            placeholder="e.g. oregano (Enter at least 4 ingredients)"
            className="w-full sm:flex-1 sm:max-w-lg px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 backdrop-blur-lg"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={addIngredient}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center sm:justify-start gap-2 group"
          >
            <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
            Add Ingredient
          </button>
        </div>

        {/* Ingredients List */}
        <div className="mb-12 animate-fade-in">
          {ingredients.length != 0 && <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 text-transparent bg-clip-text">
            Ingredients on hand:
          </h2>}
          <ul className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <li
                key={ingredient}
                className="flex items-center gap-3 group bg-gray-800/30 backdrop-blur-lg p-3 rounded-lg border border-gray-700 hover:border-emerald-500/50 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X className="w-4 h-4 text-red-400 hover:text-red-300 transition-colors duration-200" />
                </button>
                <span className="text-gray-300">•</span>
                <span className="text-gray-200">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recipe Generation Section */}
        {ingredients.length >= 4 && <div className="relative bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 text-transparent bg-clip-text">
                Ready for a recipe?
              </h2>
              <p className="text-gray-400">Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={ToggleGetRecipe} className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 group flex items-center justify-center">
            {loading ? "Generating..." : "Get a recipe"}
              <Sparkles className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        
        </div>}

        {/* Recommendations Section */}
        {recipe  && <div className="mt-12 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 text-transparent bg-clip-text">
            ChefGPT Recommends:
          </h2>
          {/* Recommendations will be populated here */}
        </div>}
        <div ref={loaderRef}>
          <Recipe item={ingredients} recipeData={recipe} loading={loading} />
        </div>
        {loading && (
        <>
          {" "}
          <p className="loader" ref={loaderRef}>
            {getRandomMessage()}
          </p>
          <h1>{Loader()}</h1>
        </>
      )}
      </main>
    </div>
  );
}

export default App;