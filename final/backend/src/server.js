import { createPubSub, createSchema, createYoga } from 'graphql-yoga'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'
import { createServer } from 'node:http'
import * as fs from 'fs'

import { GraphQLServer, PubSub } from 'graphql-yoga';
// import db from './db';
import { CampusModel, CourseModel } from './models/course'
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import Campus from './resolvers/Campus'
import Courses from './resolvers/Courses'
import Course from './resolvers/Course'
import Semester from './resolvers/Semester'
import ChatBox from './resolvers/ChatBox';

// const pubsub = new PubSub();
const pubsub = createPubSub();

// const server = new GraphQLServer({
//   typeDefs: './src/schema.graphql',
//   resolvers: {
//     Query,
//     Mutation,
//     Subscription,
//     User,
//     Post,
//     Comment
//   },
//   context: {
//     db,
//     pubsub
//   },
// });

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync('./src/schema.graphql', 'utf-8' ),
    resolvers: {
      Query,
      Mutation,
      Subscription,
      Campus,
      Courses,
      Course,
      Semester,
      ChatBox
    }
  }),
  context: {
    CampusModel,
    CourseModel,
    pubsub
  },
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
  landingPage: false
})

const server = createServer(yoga)
// server.listen({ port: process.env.PORT | 4000 }, () => {
//   console.log(`The server is up on port ${process.env.PORT | 4000}!`);
// });

const wsServer = new WebSocketServer({
  server: server,
  path: yoga.graphqlEndpoint,
})

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload
        })

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe
        }
      }

      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    },
  },
  wsServer,
)

export default server
