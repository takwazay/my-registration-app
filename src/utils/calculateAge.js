/**
 * Calculates the age in years of a person.
 * @param {object} p - An object representing a person with a birth Date parameter.
 * @returns {number} - The age in years of the person.
 * @throws {Error} - Throws an error for invalid arguments or dates.
 */
export function calculateAge(p) {
    if (!p) {
        throw new Error("Paramètre p manquant")
    }

    if (!(p instanceof Date)) {
        throw new Error("Le paramètre de naissance fourni doit être un objet Date");
    }
    if (p > Date.now())
        throw new Error("La date de naissance indiquée ne peut pas être dans le future");

    const dateDiff = new Date(Date.now() - p);
    const age = Math.abs(dateDiff.getUTCFullYear() - 1970);

    return age;
}

