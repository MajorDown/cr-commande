import { PiecesSuppliersData } from "../types";

/**
 * @returns 
 */

const getSuppliersData: () => PiecesSuppliersData | [] = () => {
    const stringifiedSuppliersData = localStorage.getItem('CR-suppliersData');
    if (stringifiedSuppliersData) {
        const parsedSuppliersData = JSON.parse(stringifiedSuppliersData) as PiecesSuppliersData;
        return parsedSuppliersData;
    }
    return [];
}

export default getSuppliersData;