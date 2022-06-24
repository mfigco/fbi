// Note this function does not validate its arguments in any way. It is expected that the rest of the app does so.
export default async function getWantedList(sex, hair, eyes, page) {
    let FBIUrl = 'https://api.fbi.gov/wanted/v1/list?';
    if (sex !== "Any") {
        FBIUrl = `${FBIUrl}sex=${sex.toLowerCase()}&`
    }
    if (hair !== "Any") {
        FBIUrl = `${FBIUrl}hair=${hair.toLowerCase()}&`
    }
    if (eyes !== "Any") {
        FBIUrl = `${FBIUrl}eyes=${eyes.toLowerCase()}&`
    }
    FBIUrl = `${FBIUrl}page=${page}`;
    const response = await fetch(FBIUrl);
    // console.log(response);
    const json = await response.json();
    // console.log(json);
    let items = json.items;
    if (items === undefined || items.length === 0) {
        return [];
    }
    items = items.filter((itm) => {
        // check results are people through sex field, which seems to be the most consistent
        return ((itm.sex === "Male") || (itm.sex === "Female"));
    });
    items = items.map(itm => {
        return {
            name: itm.title,
            sex: itm.sex,
            eyes: itm.eyes,
            hair: itm.hair,
            image: itm.images[0].original
        }
    })
    // console.log(items);
    return items;  
}