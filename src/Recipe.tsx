import React from "react";
import ReactMarkdown from "react-markdown";

interface RecipeProps {
  recipeData: string;
  loading: boolean;
  item: string[];
}

const Recipe: React.FC<RecipeProps> = ({ recipeData, loading, item }) => {
  return (
    <>
      {!loading && recipeData && (
        <section className="p-6 bg-black bg-opacity-60 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-white mb-4"></h2>
          <article
            className="prose prose-lg max-w-none p-4 rounded-lg text-gray-100 font-normal
 prose-h1:text-white prose-h2:text-gray-200 prose-h3:text-gray-300 
 prose-strong:text-green-300 prose-p:text-gray-100"
            aria-live="polite"
          >
            <ReactMarkdown>{recipeData}</ReactMarkdown>
          </article>
        </section>
      )}
    </>
  );
};

export default Recipe;
