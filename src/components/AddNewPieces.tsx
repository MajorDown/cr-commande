import { CommonSuppliers } from "../data"

const AddNewPieces = () => {
  return (
    <form>
        <div className={"inputWrapper"}>
            <label htmlFor="pieceMark">Marque :</label>
            <select name="pieceMark" id="pieceMark">
                <option value={""}>Marque</option>
                {CommonSuppliers.map((supplier, index) => (
                <option key={index} value={supplier}>{supplier}</option>
                ))}
            </select>      
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="pieceModel">Modèle :</label>
            <input type="text" name="pieceModel" id="pieceModel" />
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="pieceRef">Référence :</label>
            <input type="text" name="pieceRef" id="pieceRef" />
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="quantity">Quantité :</label>
            <input 
                type="number"
                min={1}
                step={1} 
                name="quantity" 
                id="quantity" 
            />
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="isClientWaitingFor">numéro de commande :</label>
            <input 
                type="number" 
                min={0}
                step={1}
                name={"isClientWaitingFor"} 
                id={"isClientWaitingFor"} 
            />
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="isDP">DP ?</label>
            <input 
                type="checkbox" 
                name="isDP" 
                id="isDP" 
            />
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="isSP">SP ?</label>
            <input 
                type="checkbox" 
                name="isSP" 
                id="isSP" 
            />
        </div>
        <div className={"inputWrapper"}>
            <label htmlFor="moreInformation">Informations supplémentaires :</label>
            <textarea name="moreInformation" id="moreInformation"></textarea>
        </div>
        <button type="submit">Ajouter</button>
    </form>
  )
}

export default AddNewPieces