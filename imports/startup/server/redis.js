import {RedisOplog} from 'meteor/cultofcoders:redis-oplog';

// RedisOplog init
RedisOplog.init({
    redis: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
    },
    debug: false, // default is false,
    overridePublishFunction: true // default is true, replaces .publish with .publishWithRedis, set to false if you don't want to override it
});