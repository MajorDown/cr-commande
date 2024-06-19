/**
 * modifie le nom de l'atelier / corner dans le local storage
 * @param cornerName 
 */
const setCornerName = (cornerName : string) => {
    localStorage.setItem('CR-cornerName', cornerName);
}

export default setCornerName;