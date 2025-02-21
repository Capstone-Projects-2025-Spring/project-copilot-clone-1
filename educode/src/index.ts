import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI!;
const client = new MongoClient(mongoUri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("user_code_db");
        const collection = db.collection("code_snippets");

        // Example user-submitted code
        const userCode = {
            userId: "12345",
            language: "TypeScript",
            code: "console.log('Hello, world!');",
            createdAt: new Date(),
        };

        // Insert user code into MongoDB
        const result = await collection.insertOne(userCode);
        console.log(`Inserted code snippet with ID: ${result.insertedId}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
}

run();
