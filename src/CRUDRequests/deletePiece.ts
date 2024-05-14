import { ListOfPieces, Piece } from "../types";
import getPiecesList from "./getPiecesList";

//jsdoc
/**
 * Deletes a piece from the list of pieces
 * @param {Piece} piece - The piece to delete
 * @returns {ListOfPieces | []} - The new list of pieces
 */
const deletePiece = (piece: Piece): ListOfPieces | [] => {
    const piecesList = getPiecesList();
    if (!piecesList) return [];
    const newPiecesList = piecesList.filter(p => p !== piece);
    const stringifiedPiecesList = JSON.stringify(newPiecesList);
    localStorage.setItem('CR-piecesList', stringifiedPiecesList);
    return newPiecesList;
}

export default deletePiece;