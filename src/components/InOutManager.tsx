import { useState } from "react";
import { PDFViewer } from '@react-pdf/renderer';
import getCornerName from "../CRUDRequests/getCornerName";
import getPiecesList from "../CRUDRequests/getPiecesList";
import setNewPiecesList from "../CRUDRequests/setNewPiecesList";
import UIModal from "./UIModal";
import PdfReport from "./PdfReport";



/**
 * composant pour gérer l'import et l'export de la liste de pièces
 * @returns {JSX.Element}
 */
const InOutManager = () => {
    const [wantExportToPdf, setWantExportToPdf] = useState<boolean>(false);

    // MISE EN FORME DE COMMANDEDATE AU FORMAT DD-MM-YY
    const getDateFormat = (date: Date): string => {
        // FONCTION POUR PADDING A 2 CHIFFRES
        const padToTwoDigits = (num: number): string => {
            return num.toString().padStart(2, '0');
        }
        const commandeDate = new Date(date);
        if (isNaN(commandeDate.getTime())) {
            return "Date Err";
        }
        let day = padToTwoDigits(commandeDate.getDate());
        let month = padToTwoDigits(commandeDate.getMonth() + 1);
        let year = commandeDate.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const handleExport = () => {
        const piecesList = getPiecesList();
        const fileName = getCornerName();
        const json = JSON.stringify(piecesList, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        const date = new Date();
        const formattedDate = getDateFormat(date);
        link.download = `${fileName} - ${formattedDate}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                console.log("imported pieces:", json);
                setNewPiecesList(json);                
            } catch (error) {
                console.error("Error reading the file:", error);
                window.alert("Erreur lors de la lecture du fichier");
            }
        };
        reader.readAsText(file);
        // rafraichissement de la page
        window.location.reload();
    }

    return (<>
        {wantExportToPdf && <UIModal onClose={() => setWantExportToPdf(false)}>
            <button>Exporter en PDF</button>
            <PDFViewer>
                <PdfReport />
            </PDFViewer>
        </UIModal>}
        <div id={"inOutManager"}>
            <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
                id="fileInput"
            />
            <button
                onClick={() => document.getElementById('fileInput')?.click()}
            >
                importer
                <img src="/icons/import.svg" alt="import" width={24} height={24} />
            </button>
            <button
                onClick={() => handleExport()}
            >
                exporter
                <img src="/icons/export.svg" alt="export" width={24} height={24} />
            </button>
            <button
                onClick={() => setWantExportToPdf(true)}            
            >
                <img src="/icons/pdf.svg" alt="to pdf" width={24} height={24} />
            </button>
        </div>
    </>)
}

export default InOutManager;

