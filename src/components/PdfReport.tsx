import { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import getPiecesList from '../CRUDRequests/getPiecesList';
import { ListOfPieces, Piece } from '../types';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: 20
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  supplierSection: {
    marginBottom: 20,
  },
  supplierName: {
    fontSize: 18,
    marginBottom: 10,
  },
  piecesList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  pieceLine: {
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
  }
});

// Helper function to get unique suppliers
const getUniqueSuppliers = (pieces: ListOfPieces) => {
  const suppliers = pieces.map(piece => piece.supplier);
  return Array.from(new Set(suppliers));
};

// Create Document Component
const PdfReport = () => {
  const [piecesList, setPiecesList] = useState<ListOfPieces | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const pieces = await getPiecesList();
      setPiecesList(pieces);
    };
    
    fetchData();
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.title}>
          <Text>Section #1</Text>
        </View>
        {piecesList && getUniqueSuppliers(piecesList).map(supplier => (
          <View key={supplier} style={styles.supplierSection}>
            <Text style={styles.supplierName}>{supplier}</Text>
            <View style={styles.piecesList}>
              {piecesList.filter(piece => piece.supplier === supplier).map((piece, index) => (
                <View key={index} style={styles.pieceLine}>
                  <Text>{new Date(piece.commandeDate).toLocaleDateString()} :</Text>
                  <Text>{piece.pieceMark}, {piece.pieceModel}</Text>
                  <Text>{piece.pieceRef} x{piece.quantity}{piece.pieceColor ? `(${piece.pieceColor})` : ""}</Text>
                  <Text>{piece.isOrdered ? "Commandé" : ""}{piece.isOrdered && piece.isReceived ? ", " : ""}{piece.isReceived ? "Reçu" : ""}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default PdfReport;
