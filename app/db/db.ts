const { Pool } = require('pg');
require ('dotenv').config(); // load .env

const connectionPool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
});

// export connection pool to be used as module
export default connectionPool;