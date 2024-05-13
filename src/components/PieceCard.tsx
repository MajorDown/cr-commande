import { useState } from "react";
import { Piece } from "../types";

export type PieceCardProps = {
    piece: Piece
}

const PieceCard = (props : PieceCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
       
    // MISE EN FORME DE COMMANDEDATE AU FORMAT DD/MM/YY
    const getDateFormat = (date: Date): string => {
        // FONCTION POUR PADDING A 2 CHIFFRES
        const padToTwoDigits = (num: number): string => {
            return num.toString().padStart(2, '0');
        }
        const commandeDate = new Date(date);
        if (isNaN(commandeDate.getTime())) {
            return "Date Err"; // Gérer les dates invalides
        }
        let day = padToTwoDigits(commandeDate.getDate());
        let month = padToTwoDigits(commandeDate.getMonth() + 1);
        let year = commandeDate.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // GERER SI LA COMMANDE EST PASSEE
    const handleOrdered = () => {}

    // GERER SI LA COMMANDE EST RECU
    const handleReceived = () => {}
    
    return (
        <div className={"pieceCard"} onDoubleClick={() => setIsEditing(!isEditing)}>
            <div className={"pieceCardBtns"}>
                <button 
                    className={props.piece.isOrdered ? "orderedBtn ordered" : "orderedBtn"}
                    onClick={() => handleOrdered()}
                >
                    <img src="/icons/commanded.svg" alt="order" width={24} height={24}/>
                </button>
                <button 
                    className={props.piece.isReceived ? "receivedBtn received" : "receivedBtn"}
                    onClick={() => handleOrdered()}
                >
                    <img src="/icons/received.svg" alt="receive" width={24} height={24}/>
                </button>
            </div>    
            <p className={"commandeDate"}>{getDateFormat(props.piece.commandeDate)}</p>
            <p className={"pieceMark"}>{props.piece.pieceMark}</p>
            <p className={"pieceModel"}>{props.piece.pieceModel}</p>
            <p className={"pieceRef"}>{props.piece.pieceRef}</p>
            <p className={"quantity"}>x{props.piece.quantity}</p>
            {props.piece.isClientWaitingFor && 
                <p className={"isClientWaitingFor"}>
                    {props.piece.isClientWaitingFor.supportNumber}:  
                    {props.piece.isClientWaitingFor.isDP && " DP"}
                    {props.piece.isClientWaitingFor.isSP && " SP"}
                </p>
            }
            <div className={"pieceCardBtns"}>
                <button 
                    className={"deleteBtn"}
                    onClick={() => handleReceived()}
                    >
                    <img src="/icons/trash.svg" alt="delete" width={24} height={24}/>
                </button>
            </div> 
        </div>
  )
}

export {PieceCard};