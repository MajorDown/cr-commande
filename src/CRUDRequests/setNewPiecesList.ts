import { ListOfPieces } from "../types";

const setNewPiecesList = (piecesList: ListOfPieces): ListOfPieces => {
    const stringifiedPiecesList = JSON.stringify(piecesList);
    localStorage.setItem('CR-piecesList', stringifiedPiecesList);
    return piecesList;
}

export default setNewPiecesList;