import { useState } from "react";
import getPiecesList from "../CRUDRequests/getPiecesList";
import {ListOfPieces} from "../types";
import setNewPiecesList from "../CRUDRequests/setNewPiecesList";

const InOutManager = () => {
    const [piecesList, setPiecesList] = useState<ListOfPieces>([]);

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
        console.log("exporting...");
        const piecesList = getPiecesList();
        const fileName = prompt("Entrez le nom de votre atelier :", "nom-de-l'atelier");
        if (!fileName) {
            return;
        }
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
                setPiecesList(json);
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

    return (
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
        </div>
    )
}

export default InOutManager;

