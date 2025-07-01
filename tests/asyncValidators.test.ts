import {
  createUsernameAvailableValidator,
  createEmailDomainValidator,
} from "../src/utils/asyncValidators";

describe("Async Validators", () => {
  describe("createUsernameAvailableValidator", () => {
    it("returns null if username is available", async () => {
      const validator = createUsernameAvailableValidator(async () => true);
      const result = await validator("newuser");
      expect(result).toBeNull();
    });

    it("returns default message if username is not available", async () => {
      const validator = createUsernameAvailableValidator(async () => false);
      const result = await validator("admin");
      expect(result).toBe("Username is already taken");
    });

    it("returns custom message if provided", async () => {
      const validator = createUsernameAvailableValidator(async () => false, "Custom error");
      const result = await validator("admin");
      expect(result).toBe("Custom error");
    });

    it("returns null on error (fallback)", async () => {
      const validator = createUsernameAvailableValidator(async () => {
        throw new Error("fail");
      });
      const result = await validator("admin");
      expect(result).toBeNull();
    });
  });

  describe("createEmailDomainValidator", () => {
    it("returns null if email domain is allowed", async () => {
      const validator = createEmailDomainValidator(["example.com"]);
      const result = await validator("user@example.com");
      expect(result).toBeNull();
    });

    it("returns error if email domain is not allowed", async () => {
      const validator = createEmailDomainValidator(["mehek.dev"]);
      const result = await validator("user@spam.com");
      expect(result).toBe("Email domain is not allowed");
    });

    it("respects custom error message", async () => {
      const validator = createEmailDomainValidator(["mehek.dev"], "Domain blocked");
      const result = await validator("user@spam.com");
      expect(result).toBe("Domain blocked");
    });

    it("returns null if input has no @ (let pattern handle it)", async () => {
      const validator = createEmailDomainValidator(["example.com"]);
      const result = await validator("invalidemail");
      expect(result).toBeNull();
    });
  });
});
