import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Timer from './models/Timer.js'; 
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully! ✅"))
  .catch((err) => console.log("MongoDB Connection Error: ❌", err));
const typeDefs = `#graphql
  type TimerRecord {
    id: ID
    duration: Int
    status: String
    createdAt: String
  }
  type Query {
    hello: String
    getTimers: [TimerRecord]
  }
  type Mutation {
    addTimer(duration: Int!, status: String!): TimerRecord
  }
`;
const resolvers = {
  Query: {
    hello: () => "MERN Stack Backend is Ready! ",
    getTimers: async () => {
      try {
        return await Timer.find().sort({ createdAt: -1 }); 
      } catch (error) {
        console.error("Error fetching timers:", error);
        return [];
      }
    },
  },
  Mutation: {
    addTimer: async (_, { duration, status }) => {
      try {
        const newTimer = new Timer({ duration, status });
        return await newTimer.save();
      } catch (error) {
        console.error("Error saving timer:", error);
        throw new Error("Failed to save timer record.");
      }
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(` Server ready at: ${url}`);