
export async function getRecipeFromMistral(ingredientsArr) {
    const apiKey = import.meta.env.VITE_HF_ACCESS_TOKEN;
  
    if (!apiKey) {
      console.error("Hugging Face API key is missing!");
      return "Error: Missing API Key";
    }
  
    // ✅ Pre-written system prompt (hidden from frontend)
    const systemPrompt = `
    You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
    You don't need to use every ingredient they mention in your recipe. 
    The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
  
    Format your response in **Markdown** to make it easier to render on a web page and dont give any link text.
    `;
  
    // ✅ User ingredients input
    const userIngredients = `**User Ingredients:** ${ingredientsArr.join(", ")}`;
  
    try {
  
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `${systemPrompt}\n\n${userIngredients}\n\n**Recipe:**`, // 👈 Hidden prompt + user input
            parameters: { max_tokens: 1024 },
          }),
        }
      );
  
      const result = await response.json();
  
      // ✅ Extract only the generated recipe (clean response)
      if (Array.isArray(result) && result.length > 0 && result[0].generated_text) {
        const generatedText = result[0].generated_text;
  
        // Remove any reference to the system prompt if AI includes it
        return generatedText.replace(systemPrompt, "").trim();
      } else {
        throw new Error("Invalid API response format.");
      }
    } catch (err) {
      console.error("Error fetching recipe:", err.message);
      return "Sorry, I couldn't generate a recipe at this time.";
    }
  }
  
