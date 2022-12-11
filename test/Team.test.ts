import controller from '../src/Controllers/team';

describe("Team class correct data validation testing", () => {
    test("ValidateGuardPlayers", () => {
        var guardPlayers: number[] = [1, 2, 3, 4, 5];
        var results: string = controller.ValidateGuardPlayers(guardPlayers);

        expect(results).toBe("Valid");
    });

    test("ValidateFowardPlayers", () => {
        var fowardPlayers: number[] = [1, 2, 3, 4];
        var results: string = controller.ValidateFowardPlayers(fowardPlayers);

        expect(results).toBe("Valid");
    });

    test("ValidateCenterPlayers", () => {
        var centerPlayers: number[] = [5, 6];
        var results: string = controller.ValidateCenterPlayers(centerPlayers);

        expect(results).toBe("Valid");
    });
})

describe("Team class incorrect data validation testing", () => {
    test("ValidateGuardPlayers", () => {
        var guardPlayers: number[] = [1];
        var results: string = controller.ValidateGuardPlayers(guardPlayers);

        expect(results).not.toBe("Valid");
    });

    test("ValidateFowardPlayers", () => {
        var fowardPlayers: number[] = [1, 2, 3, 4, 6, 8];
        var results: string = controller.ValidateFowardPlayers(fowardPlayers);

        expect(results).not.toBe("Valid");
    });

    test("ValidateCenterPlayers", () => {
        var centerPlayers: number[] = [];
        var results: string = controller.ValidateCenterPlayers(centerPlayers);

        expect(results).not.toBe("Valid");
    });
})