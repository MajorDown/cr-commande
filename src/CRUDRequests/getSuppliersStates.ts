import { PiecesSuppliersStates } from "../types";

const getPiecesSuppliersStates: () => PiecesSuppliersStates | null = () => {
    const stringifiedSuppliersStates = localStorage.getItem('CR-suppliersStates');
    if (stringifiedSuppliersStates) {
        const parsedSuppliersStates = JSON.parse(stringifiedSuppliersStates) as PiecesSuppliersStates;
        return parsedSuppliersStates;
    }
    return null;
}

export default getPiecesSuppliersStates;