const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a hash when event has no partition key but other field. ", () => {
    const event = {
      key: "value"
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(typeof trivialKey).toEqual("string");
    expect(trivialKey?.length).toBeGreaterThan(10);
  });

  it("Returns partition key if provided in the event. ", () => {
    const event = {
      partitionKey: "1234567890"
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toEqual(event.partitionKey);
  });

  it("Returns partition key as string if provided in the event. ", () => {
    const event = {
      partitionKey: 123467890,
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toStrictEqual(String(event.partitionKey));
  });



});
