import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/*.route.ts'];

swaggerAutogen(outputFile, endpointsFiles);