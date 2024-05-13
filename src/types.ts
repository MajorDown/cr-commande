export type Piece = {
    commandeDate: Date,
    pieceMark: string,
    pieceModel: string,
    pieceRef: string,
    pieceColor?: string,
    quantity: number,
    supplier: string,
    isClientWaitingFor: false | {
        supportNumber: string,
        isDP: boolean,
        isSP: boolean
    }
    isOrdered: boolean,
    isReceived: boolean
    moreInformation? : string
}

export type ListOfPieces = Piece[];

export type PiecesSuppliersStates = {
    supplier: string,
    wantToDisplay: boolean
}[]