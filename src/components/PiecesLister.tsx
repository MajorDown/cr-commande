import { useEffect, useState } from "react";
import { PiecesSuppliers } from "../data";
import { ListOfPieces, PiecesSuppliersStates } from "../types";
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

  const renderPiecesListerBySupplier = (supplier: string) => {
    if (!piecesListStates) return null;
    return piecesListStates
      .filter(piece => piece.supplier === supplier && piecesSuppliersStates?.find(s => s.supplier === supplier)?.wantToDisplay)
      .map((piece, index) => (
        <div key={index}>
          {piece.pieceMark} - {piece.pieceModel} - {piece.quantity}
        </div>
      ));
  };

  return (
    <div className={"piecesList"}>
      <div className={"piecesListOptions"}>
        <div className={"suppliersSelector"}>
          <p>affichage des fournisseurs :</p>
          {piecesSuppliersStates?.map((supplier, index) => (
            <button 
              className={supplier.wantToDisplay ? "supplierBtn active" : "supplierBtn"}
              key={index}
              onClick={() => handleSupplierbtnClick(index)}
            >
              {supplier.supplier}
            </button>
          ))}
        </div>
      </div>
      <div className={"piecesListContent"}>
        <div className={"mobilaxLister"}>{renderPiecesListerBySupplier("Mobilax")}</div>
        <div className={"utopyaLister"}>{renderPiecesListerBySupplier("Utopya")}</div>
        <div className={"crdLister"}>{renderPiecesListerBySupplier("CRD")}</div>
        <div className={"ebayLister"}>{renderPiecesListerBySupplier("Ebay")}</div>
        <div className={"aliExpressLister"}>{renderPiecesListerBySupplier("AliExpress")}</div>
        <div className={"touchedeclavierLister"}>{renderPiecesListerBySupplier("Touchedeclavier")}</div>
        <div className={"macInfoLister"}>{renderPiecesListerBySupplier("MacInfo")}</div>
        <div className={"othersLister"}>{renderPiecesListerBySupplier("autres")}</div>
      </div>
    </div>
  )}

export default PiecesLister;