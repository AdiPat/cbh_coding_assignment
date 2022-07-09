const crypto = require("crypto");

/**
 * 
 * Refactoring explanation
 * - Added a seperate method (getInitialCandidateValue) to set initial value of candidate. 
 * - In getInitialCandidateValue we remove the nested if-else and make the method terminate early if event doesn't exist.
 * - With just 2 if statements followed by a return, readability is improved because the termination of the method is clearly highlighted.
 * - Added a seperate method to normalize candidate value called `normalizeCandidateValue()`.
 * - In this method, we again remove the nested if statements to improve readability. 
 * - This is cleaner and more readable because we've adopted 'seperation of concerns'. 
 * - Each method does 1 thing only and as it is within 10 lines, it's more readable.
 * - As a result of removing the nested if conditions, the code is easier to trace.
 * - As we've named the new methods as per what they do, a developer can easily understand what's going on.
 *  
 */

const getInitialCandidateValue = (event) => {
  if (!event) {
    return undefined;
  }

  if (event?.partitionKey) {
    return event.partitionKey;
  }

  const data = JSON.stringify(event);
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

const normalizeCandidateValue = (candidate) => {
  const TRIVIAL_PARTITION_KEY = "0";

  if (!candidate) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (typeof candidate !== "string") {
    return JSON.stringify(candidate);
  }

  return candidate;
}

exports.deterministicPartitionKey = (event) => {
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = getInitialCandidateValue(event);
  candidate = normalizeCandidateValue(candidate);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};