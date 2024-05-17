import { ListOfPieces, Piece } from "../types";
import getPiecesList from "./getPiecesList";

/**
 * Updates a piece in the list of pieces
 * @param {Piece} piece - The piece to update
 * @returns {ListOfPieces} - The new list of pieces
 */
const updatePiecesList = (piece: Piece): ListOfPieces => {
    const piecesList = getPiecesList();
    // Si piecesList est vide, on ajoute la pièce
    if (!piecesList || piecesList.length === 0) {
        const newPiecesList = [piece];
        localStorage.setItem('CR-piecesList', JSON.stringify(newPiecesList));
        return newPiecesList;
    }
    // Sinon, on cherche la pièce à modifier
    const newPiecesList = piecesList.map(p => {
        if (p.commandeDate === piece.commandeDate) {
            return piece; // Mise à jour de la pièce
        } else {
            return p; // Retour de la pièce existante inchangée
        }
    });
    localStorage.setItem('CR-piecesList', JSON.stringify(newPiecesList));
    return newPiecesList;
}

export default updatePiecesList;
