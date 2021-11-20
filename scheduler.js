import * as https from "https";
import {EXTERNAL_API} from './config/variables';

const storeData = (redisClient) => {
    https.get(EXTERNAL_API, (res => {
        if (res.statusCode !== 200) {
            console.error('Did not get an OK from the server. Code: ', res.statusCode);
            return;
        }
        res.on('data', chunk => {
            for (const item of JSON.parse(chunk)) {
                redisClient.setex(`Test::${item.title}`, 30, JSON.stringify(item), (err, reply) => {
                    if (err) {
                        console.error(reply);
                    }
                })
            }
        })
    }))
}

export default storeData;