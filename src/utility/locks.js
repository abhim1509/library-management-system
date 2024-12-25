import { removeRedisKey, setRedisKey } from "./redis.js";

export const acquireLock = async (resource, ttl = 3000) => {
  let tryCount = 1;
  while (true) {
    tryCount++;

    const acquired = await setRedisKey(
      `lock:${resource}`,
      "locked",
      "NX",
      "PX",
      ttl
    );

    if (acquired || tryCount === 100) {
      return;
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
  }
};

export const releaseLock = async (key) => {
  return await removeRedisKey(`lock:${key}`);
};
