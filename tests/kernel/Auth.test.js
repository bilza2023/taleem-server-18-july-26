import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Auth", () => {

    // it("should authenticate a user token", async () => {

    //     const token = await kernel.user.login(
    //         "test@example.com",
    //         "12345678"
    //     );

    //     const user =
    //         await kernel.auth.authenticate(token);

    //     expect(user.email).toBe("test@example.com");

    // });

    it("should reject an invalid token", async () => {

        await expect(

            kernel.auth.authenticate(
                "invalid-token"
            )

        ).rejects.toThrow();

    });

});