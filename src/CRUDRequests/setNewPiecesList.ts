import { ListOfPieces } from "../types";

/**
 * Met à jour la liste des pièces dans le local storage
 * @param {ListOfPieces} piecesList - La nouvelle liste de pièces
 * @returns {ListOfPieces} - La nouvelle liste de pièces
 */
const setNewPiecesList = (piecesList: ListOfPieces): ListOfPieces => {
    const stringifiedPiecesList = JSON.stringify(piecesList);
    localStorage.setItem('CR-piecesList', stringifiedPiecesList);
    return piecesList;
}

export default setNewPiecesList;