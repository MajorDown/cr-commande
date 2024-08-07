import { useEffect, useState } from "react";
import { PiecesSuppliers } from "../data";
import { ListOfPieces, Piece, PiecesSuppliersStates } from "../types";
import getPiecesSuppliersStates from "../CRUDRequests/getSuppliersStates";
import getPiecesList from "../CRUDRequests/getPiecesList";
import updatePiecesSuppliersStates from "../CRUDRequests/updateSuppliersStates";
import { PieceCard } from "./PieceCard";
import UIModal from "./UIModal";
import AddNewPiecesForm from "./AddNewPiecesForm";
import EditPiecesForm from "./EditPieceForm";

export type PiecesListProps = {
  listOfPieces : ListOfPieces;
}

/**
 * composant pour lister les pièces en commande
 * @param {PiecesListProps} props
 * @returns {JSX.Element}
 */
const PiecesLister = () => {
  const [piecesSuppliersStates, setPiecesSuppliersStates] = useState<PiecesSuppliersStates>();
  const [piecesListStates, setPiecesListStates] = useState<ListOfPieces | []>();
  const [wantRerenderSuppliers, setWantRerenderSuppliers] = useState<boolean>(true);
  const [wantNewPiece, setWantNewPiece] = useState<boolean>(false);
  const [defaultPieceMark, setDefaultPieceMark] = useState<string>("");
  const [wantEditPiece, setWantEditPiece] = useState<boolean>(false);
  const [pieceToEdit, setPieceToEdit] = useState<Piece | null>(null);
  const [wantToDisplayReceived, setWantToDisplayReceived] = useState<boolean>(false);
  const [needToRefresh, setNeedToRefresh] = useState<boolean>(false);

  // RECUPERER LES ETATS DES FOURNISSEURS
  useEffect(() => {
    if (wantRerenderSuppliers) {
      const suppliersData = getPiecesSuppliersStates();
      if (suppliersData) setPiecesSuppliersStates(suppliersData);
      else setPiecesSuppliersStates(PiecesSuppliers.map(supplier => ({supplier: supplier, wantToDisplay: true})));
      setWantRerenderSuppliers(false);
    }
  }, [wantRerenderSuppliers])
  
  // RECUPERER LA LISTE DES PIECES
  useEffect(() => {
    const piecesList = getPiecesList();
    if (piecesList) setPiecesListStates(piecesList);
    else setPiecesListStates([]);        
  }, [])

  // ACTUALISER LA LISTE DES PIECES APRES UN AJOUT
  useEffect(() => {
    if (needToRefresh) {
      const piecesList = getPiecesList();
      if (piecesList) setPiecesListStates(piecesList);
      else setPiecesListStates([]);        
      setNeedToRefresh(false);
    }
  }, [needToRefresh])

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
      .filter(piece => 
        piece.supplier === supplier && 
        piecesSuppliersStates?.find(s => s.supplier === supplier)?.wantToDisplay && 
        (wantToDisplayReceived || !piece.isReceived)
      )
      .map((piece, index) => (
        <PieceCard 
        piece={piece} 
        onEdit={(pieceToEdit) => handleEditPiece(pieceToEdit)} key={index}
        onDelete={() => setNeedToRefresh(true)} 
        onActualise={() => setNeedToRefresh(true)}
      />
      ));
  };

  const getFilteredPieceCount = (supplier: string) => {
    if (!piecesListStates) return 0;
    return piecesListStates
      .filter(piece => piece.supplier === supplier && !piece.isReceived)
      .length;
  };

  const handleNewPiece = (supplier: string) => {
    setWantNewPiece(true);
    setDefaultPieceMark(supplier);
  }

  const handleEditPiece = (piece: Piece) => {
    setWantEditPiece(true);
    setPieceToEdit(piece);
  }

  const handleRefresh = () => {
    setWantNewPiece(false);
    setWantEditPiece(false);
    setNeedToRefresh(true);
  }

  return (
    <div className={"piecesList"}>
      {wantNewPiece && <UIModal onClose={() => setWantNewPiece(false)}>
        <AddNewPiecesForm defaultPieceMark={defaultPieceMark} onCreate={() => handleRefresh()}/>
      </UIModal>}
      {wantEditPiece && pieceToEdit && <UIModal onClose={() => setWantEditPiece(false)}>
        <EditPiecesForm pieceToEdit={pieceToEdit} onEdit={() => handleRefresh()}/>        
      </UIModal>}        
      <div className={"piecesListOptions"}>
        <div className={"suppliersSelector"}>
          <p>affichage des fournisseurs :</p>
          {piecesSuppliersStates?.map((supplier, index) => (
            <button 
              className={supplier.wantToDisplay ? "supplierBtn active" : "supplierBtn"}
              key={index}
              onClick={() => handleSupplierStateChange(index)}
            >
              {supplier.supplier} ({getFilteredPieceCount(supplier.supplier)})
            </button>
          ))}
        </div>
        <div className={"wantDisplayReceived"}>
          <input 
            type="checkbox" 
            name="wantDisplayReceived" 
            id="wantDisplayReceived"
            checked={wantToDisplayReceived}
            onChange={() => setWantToDisplayReceived(!wantToDisplayReceived)}
          />
          <label htmlFor="wantDisplayReceived">Afficher les pièces reçues</label>
        </div>
      </div>
      <div className={"piecesListContent"}>
        {PiecesSuppliers.map(supplier => (
          piecesSuppliersStates?.find(s => s.supplier === supplier)?.wantToDisplay && (
            <div className={`supplierLister`} key={supplier}>
              <p className={"supplierName"}>
                {supplier}
                <button 
                  className={"addNewPiece"}
                  onClick={() => handleNewPiece(supplier)}
                >
                  <strong>+</strong>
                </button>
              </p>
              <ul>{renderPiecesListerBySupplier(supplier)}</ul>              
            </div>
          )
        ))}
      </div>
    </div>
  )}

export default PiecesLister;