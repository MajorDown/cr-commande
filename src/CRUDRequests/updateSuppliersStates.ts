import { PiecesSuppliersStates } from "../types";

const updatePiecesSuppliersStates = (data: PiecesSuppliersStates) => {
    const stringifiedSuppliersStates = JSON.stringify(data);
    localStorage.setItem('CR-suppliersStates', stringifiedSuppliersStates);
}

export default updatePiecesSuppliersStates;