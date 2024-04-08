export type Piece = {
    commandeDate: Date,
    pieceMark: string,
    pieceModel: string,
    pieceRef: string,
    quantity: number,
    supplier: string,
    isOrdered: boolean,
    isReceived: boolean
}

export type ListOfPieces = Piece[];

export type PiecesSuppliersData = {
    supplier: string,
    wantToDisplay: boolean
}[]