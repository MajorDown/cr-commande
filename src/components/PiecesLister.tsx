import { useEffect, useState } from "react";
import { PiecesSuppliers } from "../data";
import { ListOfPieces, PiecesSuppliersStates } from "../types";
import getPiecesSuppliersStates from "../CRUDRequests/getSuppliersStates";
import getPiecesList from "../CRUDRequests/getPiecesList";
import updatePiecesSuppliersStates from "../CRUDRequests/updateSuppliersStates";

export type PiecesListProps = {
  listOfPieces : ListOfPieces;
}

const PiecesLister = () => {
  const [piecesSuppliersStates, setPiecesSuppliersStates] = useState<PiecesSuppliersStates>();
  const [piecesListStates, setPiecesListStates] = useState<ListOfPieces | []>();
  const [wantRerenderSuppliers, setWantRerenderSuppliers] = useState(false);

  // RECUPERER LES ETATS DES FOURNISSEURS
  useEffect(() => {
    if (wantRerenderSuppliers) {
      const suppliersData = getPiecesSuppliersStates();
      if (suppliersData) setPiecesSuppliersStates(suppliersData);
      else setPiecesSuppliersStates(PiecesSuppliers.map(supplier => ({supplier, wantToDisplay: true})));
      setWantRerenderSuppliers(false);
    }
  }, [wantRerenderSuppliers])
  
  // RECUPERER LA LISTE DES PIECES
  useEffect(() => {
    const piecesList = getPiecesList();
    if (piecesList) setPiecesListStates(piecesList);
    else setPiecesListStates([]);        
  }, [])

  // GESTION DE L'AFFICHAGE DES FOURNISSEURS
  const handleSupplierStateChange = (index: number) => {
    if (!piecesSuppliersStates) return;
    let newPiecesSuppliersStates = [...piecesSuppliersStates];
    newPiecesSuppliersStates[index].wantToDisplay = !newPiecesSuppliersStates[index].wantToDisplay;
    setPiecesSuppliersStates(newPiecesSuppliersStates);
    updatePiecesSuppliersStates(newPiecesSuppliersStates);
    setWantRerenderSuppliers(true);
  }

  // RENDER LA LISTE DES PIECES PAR FOURNISSEUR
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
              onClick={() => handleSupplierStateChange(index)}
            >
              {supplier.supplier}
            </button>
          ))}
        </div>
      </div>
      <div className={"piecesListContent"}>
        {PiecesSuppliers.map(supplier => (
          piecesSuppliersStates?.find(s => s.supplier === supplier)?.wantToDisplay && (
            <div className={`supplierLister`} key={supplier}>
              <p className={"supplierName"}>{supplier}</p>
              <ul>{renderPiecesListerBySupplier(supplier)}</ul>              
            </div>
          )
        ))}
      </div>
    </div>
  )}

export default PiecesLister;