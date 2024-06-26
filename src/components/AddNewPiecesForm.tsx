import { FormEvent, useState } from "react";
import { CommonSuppliers, PiecesSuppliers, PiecesPrincipalTypes } from "../data";
import { Piece } from "../types";
import createNewPiece from "../CRUDRequests/createNewPiece";


type AddNewPiecesFormProps = {
    defaultPieceMark: string;
    onCreate: () => void;
}

/**
 * formulaire pour ajouter une nouvelle pièce en commande
 * @param {AddNewPiecesFormProps} props
 * @returns {JSX.Element}
 */
const AddNewPiecesForm = (props: AddNewPiecesFormProps) => {
    const [supplier, setSupplier] = useState<string>(props.defaultPieceMark);
    const [pieceMark, setPieceMark] = useState<string>("");
    const [pieceModel, setPieceModel] = useState<string>("");
    const [pieceRef, setPieceRef] = useState<string>("");
    const [pieceColor, setPieceColor] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [isClientWaitingFor, setIsClientWaitingFor] = useState<boolean>(false);
    const [supportNumber, setSupportNumber] = useState<string>("");
    const [isDP, setIsDP] = useState<boolean>(false);
    const [isSP, setIsSP] = useState<boolean>(false);
    const [isSav, setIsSav] = useState<boolean>(false);
    const [moreInformation, setMoreInformation] = useState<string>("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        let newPiece: Piece = {
            commandeDate: new Date(),
            pieceMark: pieceMark,
            pieceModel: pieceModel,
            pieceRef: pieceRef,
            pieceColor: pieceColor,
            quantity: quantity,
            supplier: supplier,
            isClientWaitingFor: isClientWaitingFor ? {
                supportNumber: supportNumber,
                isDP: isDP,
                isSP: isSP,
                isSav: isSav
            } : false,
            isOrdered: false,
            isReceived: false,
            moreInformation: moreInformation
        }
        const request = createNewPiece(newPiece);
        if (!request) alert("Erreur lors de l'ajout de la pièce");
        else props.onCreate();
    }

  return (
    <form id={"addNewPieceForm"} onSubmit={(event: FormEvent) => handleSubmit(event)}>
        <h2>Ajouter une nouvelle pièce en commande</h2>
        <div className={"inputWrapper"}>
            <label htmlFor="commandeDate">Fournisseur :</label>
            <select
                required
                name="supplier" 
                id="supplier"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
            >
                <option value={""}>Fournisseur</option>
                {PiecesSuppliers.map((supplier, index) => (<option key={index} value={supplier}>{supplier}</option>))}
            </select>
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="pieceMark">Marque :</label>
            <select 
                required
                name="pieceMark" 
                id="pieceMark"
                value={pieceMark}
                onChange={(e) => setPieceMark(e.target.value)}
            >
                <option value={""}>Marque</option>
                {CommonSuppliers.map((supplier, index) => (<option key={index} value={supplier}>{supplier}</option>))}
            </select>      
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="pieceModel">Modèle :</label>
            <input 
                required
                type="text" 
                placeholder="A40, IPhone 11..."
                name="pieceModel" 
                id="pieceModel" 
                value={pieceModel}
                onChange={(e) => setPieceModel(e.target.value)}
            />
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="pieceRef">Référence :</label>
            <input
                required 
                type="text" 
                placeholder="écran complet, batterie..."
                name="pieceRef" 
                id="pieceRef" 
                value={pieceRef}
                onChange={(e) => setPieceRef(e.target.value)}
                list={"piecePrincipalsRefList"}
            />
            <datalist id={"piecePrincipalsRefList"}>
                {PiecesPrincipalTypes.map((type, index) => (<option key={index} value={type}></option>))}
            </datalist>
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="pieceColor">Couleur (facultatif):</label>
            <input 
                type="text" 
                name="pieceColor" 
                id="pieceColor"
                value={pieceColor}
                onChange={(e) => setPieceColor(e.target.value)}
            />
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="quantity">Quantité :</label>
            <input 
                required
                type="number"
                min={1}
                step={1} 
                name="quantity" 
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="isClientWaitingFor">En attente pour client(s):</label>
            <input 

                type="checkbox" 
                name="isClientWaitingFor" 
                id="isClientWaitingFor" 
                checked={isClientWaitingFor}
                onChange={(e) => setIsClientWaitingFor(e.target.checked)}
            />
        </div>
        {isClientWaitingFor && <>
            <div className={"inputWrapper"}>
                <label htmlFor="supportNumber">numéro de commande :</label>
                <input 
                    type="text"
                    name={"supportNumber"} 
                    id={"supportNumber"} 
                    value={supportNumber}
                    onChange={(e) => setSupportNumber(e.target.value)}
                />
            </div>
            <div className={"inputWrapper"}>
                <label htmlFor="isDP">Le client a déjà payé (DP) ?</label>
                <input 
                    type="checkbox" 
                    name="isDP" 
                    id="isDP" 
                    checked={isDP}
                    onChange={(e) => setIsDP(e.target.checked)}
                />
            </div>
            <div className={"inputWrapper"}>
                <label htmlFor="isSP">S'agit-il d'un SAV ?</label>
                <input 
                    type="checkbox" 
                    name="isSav" 
                    id="isSav" 
                    checked={isSav}
                    onChange={(e) => setIsSav(e.target.checked)}
                />
            </div>
            <div className={"inputWrapper"}>
                <label htmlFor="isSP">L'appareil est sur place dans l'atelier (SP) ?</label>
                <input 
                    type="checkbox" 
                    name="isSP" 
                    id="isSP" 
                    checked={isSP}
                    onChange={(e) => setIsSP(e.target.checked)}
                />
            </div>
        </>}
        <div className={"inputWrapper"}>
            <label htmlFor="moreInformation">Informations supplémentaires (facultatif):</label>
            <textarea 
                rows={5}
                cols={30}
                name="moreInformation" 
                id="moreInformation"
                value={moreInformation}
                onChange={(e) => setMoreInformation(e.target.value)}
            ></textarea>
        </div>
        <button className={"submitBtn"} type="submit">Ajouter</button>
    </form>
  )
}

export default AddNewPiecesForm;