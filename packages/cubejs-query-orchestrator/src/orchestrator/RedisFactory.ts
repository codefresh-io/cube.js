import redis, { ClientOpts, RedisClient } from 'redis';
import { getEnv } from '@cubejs-backend/shared';
import { promisify } from 'util';
import fs from 'fs';
import AsyncRedisClient from './AsyncRedisClient';

export type RedisOptions = ClientOpts;

function decorateRedisClient(client: RedisClient): AsyncRedisClient {
  [
    'brpop',
    'del',
    'get',
    'hget',
    'rpop',
    'set',
    'zadd',
    'zrange',
    'zrangebyscore',
    'keys',
    'watch',
    'unwatch',
    'incr',
    'decr',
    'lpush',
  ].forEach(
    k => {
      client[`${k}Async`] = promisify(client[k]);
    }
  );

  return <AsyncRedisClient>client;
}

redis.Multi.prototype.execAsync = function execAsync() {
  return new Promise((resolve, reject) => this.exec((err, res) => (
    err ? reject(err) : resolve(res)
  )));
};

export async function createRedisClient(url: string, opts: ClientOpts = {}) {
  const options: ClientOpts = {
    url,
  };

  if (getEnv('redisTls')) {
    // codefresh code added for supporting mtls
    if (getEnv('redisCaPath') && getEnv('redisCertPath') && getEnv('redisKeyPath')) {
      options.tls = {
        ca: fs.readFileSync(getEnv('redisCaPath')),
        cert: fs.readFileSync(getEnv('redisCertPath')),
        key: fs.readFileSync(getEnv('redisKeyPath')),
        rejectUnauthorized: getEnv('redisRejectUnauthorized')
      };
    } else {
      options.tls = {};
    }
  }

  if (getEnv('redisPassword')) {
    options.password = getEnv('redisPassword');
  }

  return decorateRedisClient(
    redis.createClient({
      ...options,
      ...opts,
    })
  );
}
