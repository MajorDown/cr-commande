export type Piece = {
    commandeDate: Date,
    pieceMark: string,
    pieceModel: string,
    pieceRef: string,
    quantity: number,
    supplier: string,
    isClientWaitingFor: false | {
        supportNumber: number,
        isDP: boolean,
        isSP: boolean
    }
    isOrdered: boolean,
    isReceived: boolean
}

export type ListOfPieces = Piece[];

export type PiecesSuppliersStates = {
    supplier: string,
    wantToDisplay: boolean
}[]