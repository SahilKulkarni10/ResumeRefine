import { MongoClient } from "mongodb";

declare global {
  // Ensures that _mongoClientPromise is available globally in TypeScript
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGODB_URI!; // Ensure this URI is stored in an environment variable for security
const options = {}; // Add any MongoDB client options here if needed

// Check if the MONGODB_URI environment variable is set
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// Handle MongoDB connection based on the environment
if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export the client promise for use throughout the application
export default clientPromise;
