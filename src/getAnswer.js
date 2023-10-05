import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain, loadQARefineChain } from "langchain/chains";

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});

async function getAnswer(req, res) {
  const { question } = req.body;
  try {
    const vectorStore = await HNSWLib.load(
      "hnswlib",
      new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
    );

    const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQARefineChain(model),
      retriever: vectorStore.asRetriever(),
    });

    console.log(question);

    const result = await chain.call({
      query: question,
    });

    return res.status(200).json({
      answer: result.output_text,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      message: "Something went wrong",
      error,
    });
  }
}

export default getAnswer;
