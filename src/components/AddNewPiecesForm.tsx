import { useState } from "react";
import { CommonSuppliers, PiecesSuppliers } from "../data";


type AddNewPiecesFormProps = {
    defaultPieceMark: string;
}

const AddNewPiecesForm = (props: AddNewPiecesFormProps) => {
    const [supplier, setSupplier] = useState<string>(props.defaultPieceMark);
    const [pieceMark, setPieceMark] = useState<string>("");
    const [pieceModel, setPieceModel] = useState<string>("");
    const [pieceRef, setPieceRef] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [isClientWaitingFor, setIsClientWaitingFor] = useState<boolean>(false);
    const [supportNumber, setSupportNumber] = useState<string>("");
    const [isDP, setIsDP] = useState<boolean>(false);
    const [isSP, setIsSP] = useState<boolean>(false);
    const [moreInformation, setMoreInformation] = useState<string>("");

  return (
    <form id={"addNewPieceForm"}>
        <div className={"inputWrapper"}>
            <label htmlFor="commandeDate">Fournisseur :</label>
            <select 
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
                type="text" 
                placeholder="écran complet, batterie..."
                name="pieceRef" 
                id="pieceRef" 
                value={pieceRef}
                onChange={(e) => setPieceRef(e.target.value)}
            />
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="quantity">Quantité :</label>
            <input 
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
                <label htmlFor="isDP">DP ?</label>
                <input 
                    type="checkbox" 
                    name="isDP" 
                    id="isDP" 
                    checked={isDP}
                    onChange={(e) => setIsDP(e.target.checked)}
                />
            </div>
            <div className={"inputWrapper"}>
                <label htmlFor="isSP">SP ?</label>
                <input 
                    type="checkbox" 
                    name="isSP" 
                    id="isSP" 
                    checked={isSP}
                    onChange={(e) => setIsSP(e.target.checked)}
                />
            </div>
        </>
        }
        <div className={"inputWrapper"}>
            <label htmlFor="moreInformation">Informations supplémentaires :</label>
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