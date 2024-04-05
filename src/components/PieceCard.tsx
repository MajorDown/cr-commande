import { useState } from "react";
import { Piece } from "../types";

export type PieceCardProps = {
    piece: Piece
}

const PieceCard = (props : PieceCardProps) => {
    const [isEditing, setIsEditing] = useState(false);

    // MISE EN FORME DE COMMANDEDATE AU FORMAT DD/MM/YY
    const getDateFormat = (date: Date) => {
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // DOUBLE CLICK SUR LA CARTE POUR MODIFIER LA PIECE
    
    return (
        <div className={"pieceCard"} onDoubleClick={() => setIsEditing(!isEditing)}>
            {!isEditing && <div className={"pieceInfos"}>
                <p className={"commandeDate"}>{getDateFormat(props.piece.commandeDate)}</p>
                <p className={"pieceMark"}>{props.piece.pieceMark}</p>
                <p className={"pieceRef"}>{props.piece.pieceRef}</p>
                <p className={"quantity"}>{props.piece.quantity}</p>
                <p className={"supplier"}>{props.piece.supplier}</p>
            </div>}
            {isEditing && <div className={"pieceInfos"}>
                <input type="date" />
                <input type="text" />
                <input type="text" />
                <input type="number" />
                <input type="text" />
            </div>}
            <input type="checkbox" />
            <button className={"delete"}>supprimer</button>
        </div>
  )
}

export {PieceCard};