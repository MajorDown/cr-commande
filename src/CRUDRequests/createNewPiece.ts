import { ListOfPieces, Piece } from "../types"
import getPiecesList from "./getPiecesList";

/**
 * Create a new piece and add it to the list of pieces
 * @param {Piece} newPiece - The new piece to add
 * @returns {ListOfPieces} - The updated list of pieces
 */
const createNewPiece = (newPiece: Piece): ListOfPieces => {
    let piecesList: ListOfPieces = getPiecesList();
    if (!piecesList) piecesList = [newPiece];
    else piecesList.push(newPiece);
    localStorage.setItem('CR-piecesList', JSON.stringify(piecesList));
    return piecesList;
}

export default createNewPiece;