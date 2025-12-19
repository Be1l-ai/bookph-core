import fs from "fs";

import logger from "./logger";

/** Critical logger for server-side only - guarantees log execution
 * Use for critical errors that must be recorded even under high load
 * Server-side only - do not import in client code
 */
export const criticalLogger = logger.getSubLogger({
  name: "critical",
  overwrite: {
    transportJSON: (logObj) => {
      const logString = JSON.stringify(logObj);
      const buffer = Buffer.from(logString + "\n");

      try {
        fs.writeSync(process.stdout.fd, buffer);
      } catch (error) {
        console.log(`[BookPH Logger] Critical: File write failed - ${error}`);
        console.log(logString);
      }
    },
  },
});
