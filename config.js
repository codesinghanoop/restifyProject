const dbName = 'restifydb'

export default {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    URI: process.env.MONGODB_URI || `mongodb+srv://codesingh:luvutildeath@restify-hd48p.gcp.mongodb.net/${dbName}?ssl=true`,
    JWT_SECRET: process.env.JWT_SECRET || 'CBAB340E4E'
}
