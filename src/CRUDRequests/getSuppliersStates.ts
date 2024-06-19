import { PiecesSuppliersStates } from "../types";

/**
 * récupère les états des fournisseurs stockés dans le local storage
 * @returns {PiecesSuppliersStates | null} - Les états des fournisseurs stockés dans le local storage
 */
const getPiecesSuppliersStates: () => PiecesSuppliersStates | null = () => {
    const stringifiedSuppliersStates = localStorage.getItem('CR-suppliersStates');
    if (stringifiedSuppliersStates) {
        const parsedSuppliersStates = JSON.parse(stringifiedSuppliersStates) as PiecesSuppliersStates;
        return parsedSuppliersStates;
    }
    return null;
}

export default getPiecesSuppliersStates;