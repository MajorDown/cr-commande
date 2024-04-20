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

    // GERER SI LA COMMANDE EST PASSEE
    const handleOrdered = () => {}

    // GERER SI LA COMMANDE EST RECU
    const handleReceived = () => {}
    
    return (
        <div className={"pieceCard"} onDoubleClick={() => setIsEditing(!isEditing)}>
            <p className={"commandeDate"}>{getDateFormat(props.piece.commandeDate)}</p>
            <p className={"pieceMark"}>{props.piece.pieceMark}</p>
            <p className={"pieceModel"}>{props.piece.pieceModel}</p>
            <p className={"pieceRef"}>{props.piece.pieceRef}</p>
            <p className={"quantity"}>{props.piece.quantity}</p>
            {props.piece.isClientWaitingFor && 
                <p className={"isClientWaitingFor"}>
                    {props.piece.isClientWaitingFor.supportNumber} : 
                    {props.piece.isClientWaitingFor.isDP && "DP"}
                    {props.piece.isClientWaitingFor.isSP && "SP"}
                </p>}
            <button 
                className={props.piece.isOrdered ? "orderedBtn ordered" : "orderedBtn"}
                onClick={() => handleOrdered()}
            >
                <img src="/icons/commanded.svg" alt="order" width={24} height={24}/>
            </button>
            <button 
                className={"deleteBtn"}
                onClick={() => handleReceived()}
                >
                <img src="/icons/received.svg" alt="delete" width={24} height={24}/>
            </button>
        </div>
  )
}

export {PieceCard};