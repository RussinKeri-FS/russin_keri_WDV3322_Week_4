const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Node JS Post API',
            version: '1.6.1',
            description: 'A post api wth json web token security',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./api/routes/*.js'],
};

module.exports = options;