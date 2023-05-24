const SwaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NewsCityApi',
            version: '1.0.0'
        },
    },
    apis: ['./routes/source.js',
        './routes/channel.js',
        './routes/city.js',
        './routes/post.js',
        './routes/weather.js'],
    securityDefinitions: {
        apiKeyHeader: {
            type: "apiKey",
            in: "query",
            name: "api_key"
        }
    }
}

module.exports = SwaggerOptions
