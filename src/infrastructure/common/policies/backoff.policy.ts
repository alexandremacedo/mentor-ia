import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class BackoffPolicy {
  async execute<T>(
    fn: () => Promise<T>,
    options?: { retries?: number; initialDelayMs?: number; factor?: number; }
  ): Promise<T> {
    const retries = options?.retries ?? 2;
    const initialDelay = options?.initialDelayMs ?? 200;
    const factor = options?.factor ?? 2;

    let attempt = 0;
    let delay = initialDelay;

    while (true) {
      Logger.log("BackoffPolicy.execute", `attempt: ${attempt}, delay: ${delay}`)

      try {
        return await fn();
      } catch (error) {
        attempt++;

        if (attempt > retries) {
          Logger.error("BackoffPolicy.execute", `attempt: ${attempt}, delay: ${delay}, message: ${error.message}`)
          throw error;
        }

        await new Promise(res => setTimeout(res, delay));
        delay *= factor;
      }
    }
  }
}