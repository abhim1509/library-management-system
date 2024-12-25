import { Redis } from "ioredis";
let redis;
export const initializeRedis = () => {
  redis = new Redis();
};

export const setRedisKey = (key, value, nx, px, ttl) => {
  return redis.set(key, value, nx, px, ttl);
};

export const getRedisKey = (key) => {
  return redis.get(key);
};

export const removeRedisKey = (key) => {
  return redis.del(key);
};
