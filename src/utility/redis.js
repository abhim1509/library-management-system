import { redis } from "./redisClient.js";

export const setRedisKey = function (key, value, nx, px, ttl) {
  console.log("Inside setRedisKey");
  return redis.set(key, value, nx, px, ttl);
};

export const getRedisKey = function (key) {
  console.log("Inside getRedisKey");
  return redis.get(key);
};

export const removeRedisKey = function (key) {
  console.log("Inside removeRedisKey");
  return redis.del(key);
};
