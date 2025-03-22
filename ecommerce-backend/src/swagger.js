import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import expressListEndpoints from "express-list-endpoints";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'API JoryanBags',
        version: '1.0.0',
        description: 'Documentación generada automáticamente con Swagger y express-list-endpoints',
        },
        servers: [
        {
            url: `${process.env.SERVER_URL}${process.env.SERVER_PORT}`,
            description: 'API'
        },
        ],
    },
    apis: [], 
};

const swaggerSpec = swaggerJsdoc(options);

function generateDocs(app) {
    const routes = expressListEndpoints(app);
  
    const paths = {};
    routes.forEach((route) => {
      const path = route.path;
      if (!paths[path]) {
        paths[path] = {};
      }
  
      route.methods.forEach((method) => {
        paths[path][method.toLowerCase()] = {
          summary: `Ruta detectada automáticamente (${method.toUpperCase()})`,
          responses: {
            200: {
              description: 'Respuesta exitosa',
            },
          },
        };
      });
    });
      
    swaggerSpec.paths = paths;
  }

function setupSwagger(app) {
    app.use('/swagger', swaggerUiExpress.serve, (req, res) => {
        generateDocs(app);
        swaggerUiExpress.setup(swaggerSpec)(req, res);
    });
}

export default setupSwagger;
