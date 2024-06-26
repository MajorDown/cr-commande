import { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import getPiecesList from '../CRUDRequests/getPiecesList';
import { ListOfPieces, Piece } from '../types';
import getCornerName from '../CRUDRequests/getCornerName';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: 20,
    fontSize: 12,
  },
  text: {
    fontSize: 12,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  supplierSection: {
    marginBottom: 20,
  },
  piecesList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  pieceLine: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
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
    setPiecesList(getPiecesList());
  }, []);

  const defineActualDate = () => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.title}>
          <Text style={styles.text}>{getCornerName()}</Text>
          <Text style={styles.text}>liste des pièces commandés au {defineActualDate()}</Text>
        </View>
        {piecesList && getUniqueSuppliers(piecesList).map(supplier => (
          <View key={supplier} style={styles.supplierSection}>
            <Text style={styles.text}>{supplier}</Text>
            <View style={styles.piecesList}>
              {piecesList.filter(piece => piece.supplier === supplier).map((piece, index) => (
                <View key={index} style={styles.pieceLine}>
                  <Text style={styles.text}>{new Date(piece.commandeDate).toLocaleDateString()}: </Text>
                  <Text style={styles.text}>{piece.pieceMark} {piece.pieceModel}</Text>
                  <Text style={styles.text}>{piece.pieceRef} x{piece.quantity}{piece.pieceColor ? `(${piece.pieceColor})` : ""}</Text>
                  <Text style={styles.text}>{piece.isOrdered ? "Commandé" : ""}{piece.isOrdered && piece.isReceived ? ", " : ""}{piece.isReceived ? "Reçu" : ""}</Text>
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
