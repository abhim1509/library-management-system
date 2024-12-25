import { Redis } from "ioredis";

export const initializeRedis = () => {
  this.redis = new Redis();
};

export const setRedisKey = (key, value, nx, px, ttl) => {
  return this.redis.set(key, value, nx, px, ttl);
};

export const getRedisKey = (key) => {
  return this.redis.get(key);
};

export const removeRedisKey = (key) => {
  return this.redis.del(key);
};
