import cors from 'cors'; 
import express from "express";
import schema from './schema';
import { createServer } from 'http';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import expressPlayGround from 'graphql-playground-middleware-express';
const app = express(); 

// Middlewares
app.use(cors());
app.use(compression());

// Apollo Server 
const apolloSv = new ApolloServer({
    schema, 
    introspection: true
}); 

apolloSv.applyMiddleware({app} as any); 

// Routes
app.get('/', expressPlayGround({
    endpoint: '/graphql'
}));

// server 
const httpServer = createServer(app as any); 

const PORT = 3000; 

httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${3000}`);
});