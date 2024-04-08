import { useEffect, useState } from "react";
import { PiecesSuppliers } from "../data";
import { Piece, ListOfPieces, PiecesSuppliersStates } from "../types";
import getPiecesSuppliersStates from "../CRUDRequests/getSuppliersStates";
import getPiecesList from "../CRUDRequests/getPiecesList";

export type PiecesListProps = {
  listOfPieces : ListOfPieces;
}

const PiecesLister = () => {
  const [piecesSuppliersStates, setPiecesSuppliersStates] = useState<PiecesSuppliersStates>();
  const [piecesListStates, setPiecesListStates] = useState<ListOfPieces | []>();

  useEffect(() => {
    const suppliersData = getPiecesSuppliersStates();
    if (suppliersData) setPiecesSuppliersStates(suppliersData);
    else setPiecesSuppliersStates(PiecesSuppliers.map(supplier => ({supplier, wantToDisplay: true})));
    const piecesList = getPiecesList();
    if (piecesList) setPiecesListStates(piecesList);
    else setPiecesListStates([]);    
  }, [piecesSuppliersStates, piecesListStates])

  const handleSupplierbtnClick = (index: number) => {
    if (!piecesSuppliersStates) return;
    let newPiecesSuppliersStates = [...piecesSuppliersStates];
    newPiecesSuppliersStates[index].wantToDisplay = !newPiecesSuppliersStates[index].wantToDisplay;
    setPiecesSuppliersStates(newPiecesSuppliersStates);
  }


  return (
    <div className={"piecesList"}>
      <div className={"piecesListOptions"}>
        <div className={"suppliersSelector"}>
          <p>affichage des fournisseurs :</p>
          {piecesSuppliersStates?.map((supplier, index) => (
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