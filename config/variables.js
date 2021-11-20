import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8000;
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const EXTERNAL_API = 'https://daily1stocknews.com/test/test_data.php';

export {
    PORT,
    REDIS_HOST,
    REDIS_PORT,
    EXTERNAL_API,
}