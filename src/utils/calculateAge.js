/**
 * Calculates the age in years of a person.
 * @param {object} p - An object representing a person with a birth Date parameter.
 * @returns {number} - The age in years of the person.
 * @throws {Error} - Throws an error for invalid arguments or dates.
 */
export function calculateAge(p) {
    if (!p) {
        throw new Error("Missing param p")
    }

    if (!(p instanceof Date)) {
        throw new Error("The provided birth param must be a Date object");
    }
    if (p > Date.now())
        throw new Error("The provided birth date cannot be in the future");

    const dateDiff = new Date(Date.now() - p);
    const age = Math.abs(dateDiff.getUTCFullYear() - 1970);

    return age;
}

