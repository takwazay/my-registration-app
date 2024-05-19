/**
 * Calcule l'âge à partir d'une date de naissance fournie.
 * @param {Date} p - La date de naissance.
 * @throws {Error} Si le paramètre `p` est manquant ou n'est pas un objet Date.
 * @throws {Error} Si la date de naissance indiquée est dans le futur.
 * @returns {number} L'âge calculé à partir de la date de naissance fournie.
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

