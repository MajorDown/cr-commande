import { ListOfPieces, Piece } from "../types";
import getPiecesList from "./getPiecesList";


/**
 * Deletes a piece from the list of pieces
 * @param {Piece} piece - The piece to delete
 * @returns {ListOfPieces | []} - The new list of pieces
 */
const deletePiece = (piece: Piece): ListOfPieces | [] => {
    console.log("function : deletePiece");
    const piecesList = getPiecesList();
    if (!piecesList) return [];
    console.log("piecesList :", piecesList);
    const newPiecesList = piecesList.filter(p => p.commandeDate !== piece.commandeDate);
    console.log("newPiecesList :", newPiecesList);

    const stringifiedPiecesList = JSON.stringify(newPiecesList);
    localStorage.setItem('CR-piecesList', stringifiedPiecesList);

    return newPiecesList;
}

export default deletePiece;
