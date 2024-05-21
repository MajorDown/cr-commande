import getPiecesList from "../CRUDRequests/getPiecesList";

const InOutManager = () => {
    // MISE EN FORME DE COMMANDEDATE AU FORMAT DD-MM-YY
    const getDateFormat = (date: Date): string => {
        // FONCTION POUR PADDING A 2 CHIFFRES
        const padToTwoDigits = (num: number): string => {
            return num.toString().padStart(2, '0');
        }
        const commandeDate = new Date(date);
        if (isNaN(commandeDate.getTime())) {
            return "Date Err"; // Gérer les dates invalides
        }
        let day = padToTwoDigits(commandeDate.getDate());
        let month = padToTwoDigits(commandeDate.getMonth() + 1);
        let year = commandeDate.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const handleExport = () => {
        console.log("exporting...");
        const piecesList = getPiecesList();
        // Demande à l'utilisateur de saisir le nom du fichier
        const fileName = prompt("Entrez le nom de votre atelier :", "nom-de-l'atelier");
        // Si l'utilisateur annule ou n'entre pas de nom, on ne fait rien
        if (!fileName) {
            return;
        }
        // Convert piecesList to JSON
        const json = JSON.stringify(piecesList, null, 2);
        // Create a Blob from the JSON string
        const blob = new Blob([json], { type: 'application/json' });
        // Create a link element
        const link = document.createElement('a');
        // Create an object URL for the Blob
        const url = URL.createObjectURL(blob);
        // Set the download attribute with a filename
        link.href = url;
        const date = new Date();
        const formattedDate = getDateFormat(date);
        link.download = `${fileName} - ${formattedDate}.json`;
        // Append the link to the document body
        document.body.appendChild(link);
        // Programmatically click the link to trigger the download
        link.click();
        // Clean up and remove the link
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const handleImport = () => {
        console.log("importing...");
    }

    return (
        <div id={"inOutManager"}>
            <button
                onClick={() => handleImport()}
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
