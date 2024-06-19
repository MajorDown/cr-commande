import { ListOfPieces } from "../types";

/**
 * récupère la liste des pièces stockée dans le local storage
 * @returns {ListOfPieces | []} - The list of pieces stored in the local storage
 */

const getPiecesList = (): ListOfPieces => {
    const stringifiedPiecesList = localStorage.getItem('CR-piecesList');
    if (stringifiedPiecesList) {
        const parsedPiecesList = JSON.parse(stringifiedPiecesList) as ListOfPieces;
        return parsedPiecesList;
    }
    return [];
}

export default getPiecesList;