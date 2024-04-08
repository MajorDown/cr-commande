import { useEffect, useState } from "react";
import { PiecesSuppliers } from "../data";
import { Piece, ListOfPieces } from "../types";

export type PiecesListProps = {
  listOfPieces : ListOfPieces;
}

type PiecesSupplierStateProps = {
  supplier: string,
  wantToDisplay: boolean
}[]

const PiecesLister = () => {
  const [piecesSuppliersState, setPiecesSuppliersState] = useState<PiecesSupplierStateProps>();

  useEffect(() => {

  }, [])

  const handleSupplierbtnClick = (index: number) => {
    if (!piecesSuppliersState) return;
    let newPiecesSuppliersState = [...piecesSuppliersState];
    newPiecesSuppliersState[index].wantToDisplay = !newPiecesSuppliersState[index].wantToDisplay;
    setPiecesSuppliersState(newPiecesSuppliersState);
  }


  return (
    <div className={"piecesList"}>
      <div className={"piecesListOptions"}>
        <div className={"suppliersSelector"}>
          <p>affichage des fournisseurs :</p>
          {piecesSuppliersState?.map((supplier, index) => (
            <button 
              className={"supplierBtn"}
              key={index}
              onClick={() => handleSupplierbtnClick(index)}
            >
              {supplier.supplier}
            </button>
          ))}
        </div>
      </div>
    </div>
  )}

export default PiecesLister;