import React, { useState, useEffect, useRef } from 'react';
import { ChefHat, Plus, X, Sparkles } from 'lucide-react';
import { getRecipeFromMistral } from "../ai/ai.js";
import Recipe from './Recipe.js';
import {   Share2, Twitter, Github, Linkedin } from 'lucide-react';



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
    setIngredients((prevIngredients) => {
      const index = prevIngredients.indexOf(ingredient);
      if (index === -1) return prevIngredients; // Ingredient not found
      const newIngredients = [...prevIngredients];
      newIngredients.splice(index, 1);
      return newIngredients;
    });
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
    // <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
    //   {/* Floating Elements */}
    //   <div className="fixed inset-0 pointer-events-none overflow-hidden">
    //     <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
    //     <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    //   </div>

    //   {/* Header */}
    //   <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : ''}`}>
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    //       <div className="flex items-center justify-center">
    //         <div className="flex items-center space-x-2 group">
    //           <ChefHat className="w-8 h-8 text-emerald-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
    //           <span className="text-2xl font-bold bg-gradient-to-r from-white via-emerald-200 to-emerald-400 text-transparent bg-clip-text">
    //             ChefGPT
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col min-h-screen flex-grow">
    {/* Floating Elements */}
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    {/* Navigation */}
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <ChefHat className="w-8 h-8 text-emerald-400" />
              <a href="#home"><span className="ml-2 text-xl font-bold bg-gradient-to-r from-white via-emerald-200 to-emerald-400 text-transparent bg-clip-text">ChefGPT</span></a>

            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-300 hover:text-emerald-400 transition-colors">Features</a>
              <a href="#recipes" className="text-gray-300 hover:text-emerald-400 transition-colors">Recipes</a>
              <a href="#pricing" className="text-gray-300 hover:text-emerald-400 transition-colors">Pricing</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">Sign In</button>
              <button onClick={() => window.location.href = "https://chefgpt-yopb.vercel.app/"} className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20">
              Get Started
            </button>
          



          </div>
        </div>
      </div>
    </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-32 pb-16 flex-grow min-h-screen flex flex-col">
      {/* Ingredient Input */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-12 animate-fade-in w-full">
  <input
    type="text"
    placeholder="e.g. oregano (Enter at least 4 ingredients)"
    className="w-[300x] sm:w-[500px] flex-shrink-0 px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 backdrop-blur-lg"
    value={newIngredient}
    onChange={(e) => setNewIngredient(e.target.value)}
    onKeyPress={handleKeyPress}
  />
 <button
  onClick={addIngredient}
  className="w-auto min-w-[200px] px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 group"
>
    <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
    Add Ingredient
  </button>
</div>


        {/* Ingredients List */}
        <div className="mb-12 animate-fade-in">
  {ingredients.length != 0 && (
    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 text-transparent bg-clip-text">
      Ingredients on hand:
    </h2>
  )}
  <ul className="space-y-3">
    {ingredients.map((ingredient, index) => (
      <li
        key={ingredient}
        className="flex items-center justify-between group bg-gray-800/30 backdrop-blur-lg p-3 rounded-lg border border-gray-700 hover:border-emerald-500/50 transition-all duration-500 animate-fade-in"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Left Side: Ingredient */}
        <div className="flex items-center gap-3">
          <span className="text-gray-300">•</span>
          <span className="text-gray-200">{ingredient}</span>
        </div>

        {/* Right Side: Remove Button */}
        <button
          onClick={() => removeIngredient(ingredient)}
          className="text-red-400 hover:text-red-300 transition-colors duration-200"
        >
          Remove
        </button>
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
      <footer className="relative bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <ChefHat className="w-8 h-8 text-emerald-400" />
                <span className="ml-2 text-xl font-bold">ChefGPT</span>
              </div>
              <p className="text-gray-400 text-sm">Transform your cooking experience with the power of AI.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">© 2024 ChefGPT. Made with 💗 by Avinash</p>
            <div className="flex items-center gap-6">
              <Twitter className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors duration-300" />
              <Github className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors duration-300" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors duration-300" />
              <Share2 className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors duration-300" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;