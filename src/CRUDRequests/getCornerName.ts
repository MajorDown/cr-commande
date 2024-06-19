/** 
 * obtiens le nom de l'atelier / corner stocké dans le local storage
 * @returns {string | null} The corner name or null if it doesn't exist
*/
const getCornerName = (): string | null => {
    const cornerName = localStorage.getItem('CR-cornerName');
    if (!cornerName || cornerName === "") return null;
    else return cornerName;
}

export default getCornerName;