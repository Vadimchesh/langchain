import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import fs from "fs/promises";

async function trainBot(req, res) {
  try {
    const trainingText = await fs.readFile("training-data.txt", "utf8");
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await textSplitter.createDocuments([trainingText]);

    const vectorStore = await HNSWLib.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY })
    );
    vectorStore.save("hnswlib");
    console.log("success");

    return res.status(200).json({
      message: vectorStore,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default trainBot;
