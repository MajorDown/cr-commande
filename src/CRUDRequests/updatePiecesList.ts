import { ListOfPieces, Piece } from "../types";
import getPiecesList from "./getPiecesList";

/**
 * Updates a piece in the list of pieces
 * @param {Piece} piece - The piece to update
 * @returns {ListOfPieces} - The new list of pieces
 */
const updatePiecesList = (piece: Piece): ListOfPieces => {
    const piecesList = getPiecesList();
    if (!piecesList) return [];
    const pieceToUpdate= piecesList.find(p => p.commandeDate === piece.commandeDate);
    if (!pieceToUpdate) return piecesList;
    else {
        const newPiecesList = piecesList.map(p => p === pieceToUpdate ? piece : p);
        const stringifiedPiecesList = JSON.stringify(newPiecesList);
        localStorage.setItem('CR-piecesList', stringifiedPiecesList);
        return newPiecesList;
    }
}

export default updatePiecesList;