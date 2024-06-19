import { PiecesSuppliersStates } from "../types";

/**
 * Met à jour les états des fournisseurs dans le local storage
 * @param {PiecesSuppliersStates} data - Les états des fournisseurs
 */
const updatePiecesSuppliersStates = (data: PiecesSuppliersStates) => {
    const stringifiedSuppliersStates = JSON.stringify(data);
    localStorage.setItem('CR-suppliersStates', stringifiedSuppliersStates);
}

export default updatePiecesSuppliersStates;