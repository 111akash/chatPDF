import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    });
    const result = await response.json();

    console.log("this is the embeddings api response", result);
    

    if (!result.data || result.data.length === 0) {
      throw new Error("Invalid response from OpenAI Embeddings API");
    }

    const embedding = result.data[0].embedding;
    if (!Array.isArray(embedding)) {
      throw new Error("Invalid embedding format from OpenAI Embeddings API");
    }

    return embedding as number[];
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}