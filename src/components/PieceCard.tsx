import { Piece } from "../types";
import deletePiece from "../CRUDRequests/deletePiece";
import updatePiecesList from "../CRUDRequests/updatePiecesList";

export type PieceCardProps = {
    piece: Piece
    onEdit: (piece: Piece) => void
    onDelete: () => void;
    onActualise: () => void;
}

/**
 * composant pour afficher une carte de pièce
 * @param {PieceCardProps} props
 * @returns {JSX.Element}
 */
const PieceCard = (props : PieceCardProps) => {

    //fonction permettant de controler si le commandDate date de plus de 7 jours
    const isCommandDatTooOld = (date: Date): boolean => {
        const today = new Date();
        const commandeDate = new Date(date);
        const diffTime = Math.abs(today.getTime() - commandeDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 7;
    }

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
        return `le ${day}/${month}/${year}`;
    }

    // GERER SI LA COMMANDE EST PASSEE
    const handleOrdered = () => {
        let actualisedPiece = props.piece;
        actualisedPiece.isOrdered = !actualisedPiece.isOrdered;
        updatePiecesList(actualisedPiece);
        props.onActualise();
    }

    // GERER SI LA COMMANDE EST RECU
    const handleReceived = () => {
        let actualisedPiece = props.piece;
        actualisedPiece.isReceived = !actualisedPiece.isReceived;
        updatePiecesList(actualisedPiece);
        props.onActualise();
    }

    // GERER LA SUPPRESSION DE LA PIECE
    const handleDelete = () => {
        deletePiece(props.piece);
        props.onDelete();
    }
    
    return (
        <div 
            className={
                props.piece.isReceived ? "pieceCard isReceived" : "pieceCard" &&          
                isCommandDatTooOld(props.piece.commandeDate) ? "pieceCard tooOld" : "pieceCard"
            } 
            onDoubleClick={() => props.onEdit(props.piece)}
        >
            <div className={"pieceCardBtnsLeft"}>
                <button 
                    className={props.piece.isOrdered ? "orderedBtn ordered" : "orderedBtn"}
                    onClick={() => handleOrdered()}
                >
                    <img src="/icons/commanded.svg" alt="order" width={24} height={24}/>
                </button>
                <button 
                    className={props.piece.isReceived ? "receivedBtn received" : "receivedBtn"}
                    onClick={() => handleReceived()}
                >
                    <img src="/icons/received.svg" alt="receive" width={24} height={24}/>
                </button>
            </div>    
            <p className={"commandeDate"}>{getDateFormat(props.piece.commandeDate)}</p>
            <p className={"pieceMark"}>{props.piece.pieceMark}</p>
            <p className={"pieceModel"}>{props.piece.pieceModel}</p>
            <p className={"pieceRef"}>{props.piece.pieceRef} {props.piece.pieceColor && `(${props.piece.pieceColor})`}</p>
            <p className={"quantity"}>x{props.piece.quantity}</p>
            <p className={"isClientWaitingFor"}>
                {props.piece.isClientWaitingFor && (<>
                    {props.piece.isClientWaitingFor.supportNumber}: 
                    {props.piece.isClientWaitingFor.isDP && " DP"}
                    {props.piece.isClientWaitingFor.isSav && " SAV"}                
                    {props.piece.isClientWaitingFor.isSP && " SP"}
                    {props.piece.isClientWaitingFor.isResell && " Revente"}
                </>)}
                {!props.piece.isClientWaitingFor && "(pour stock)"}
            </p>
            <div className={"pieceCardInformations"}>
                {props.piece.moreInformation && <>
                    <img 
                        src="/icons/moreInfos.svg" 
                        alt="more info" 
                        width={16} 
                        height={16}
                    />
                    <p>{props.piece.moreInformation}</p>
                </>
                }
            </div>
            <button 
                className={"deleteBtn"}
                onClick={() => handleDelete()}
                >
                <img src="/icons/trash.svg" alt="delete" width={24} height={24}/>
            </button>
        </div>
    )
}

export {PieceCard};