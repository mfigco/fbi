import fetch from "node-fetch";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const getCriminal = async (sex, hair, eyes) => {
    let fbiUrl = 'https://api.fbi.gov/wanted/v1/list?';

    if (sex != 'any') {
        fbiUrl += ('sex=' + sex + '&');
    }
    if (hair != 'any') {
        fbiUrl += ('hair=' + hair + '&');
    }
    if (eyes != 'any') {
        fbiUrl += ('eyes=' + eyes + '&');
    }
    //console.log(fbiUrl);
    const api = await fetch(fbiUrl);
    const data = await api.json();
    const arr = data.items;

    shuffleArray(arr);
    console.log(arr[1].nationality);
    return arr;
};

const shiftCriminal = (array) => {
    let firstCriminal = array[0];
    array.shift();
    return [firstCriminal, array];
}




console.log(getCriminal('male','blond','blue'));
console.log(shiftCriminal([1,2,3,4]));