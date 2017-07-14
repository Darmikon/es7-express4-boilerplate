import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerDocument from './swagger.json';

export default function (app) {
  const options = {
    swaggerDefinition: {
      info: {
        title: 'API', // Title (required)
        version: '1.0.0', // Version (required)
        termsOfService: '...',
        contact: {
          email: 'dev@gmail.com'
        }
      },
      tags: [
        {
          name: 'pet',
          description: 'Title for pet ENDPOINT',
          externalDocs: {
            description: 'Find out more',
            url: 'http://swagger.io'
          }
        }
      ],
    },
    apis: [
      './src/module/swagger/swagger.yaml',
      './src/routes/*.js', // Path to the API docs from root
      './src/module/swagger/parameters.yaml'
    ],
  };
  //  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpec = swaggerJSDoc(options);
  app.use('/swagger-demo', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
