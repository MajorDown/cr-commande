const getCornerName = (): string | null => {
    const cornerName = localStorage.getItem('CR-cornerName');
    if (!cornerName || cornerName === "") return null;
    else return cornerName;
}

export default getCornerName;