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
    // console.log(FBIUrl);
    const response = await fetch(FBIUrl);
    // console.log(response);
    const json = await response.json();
    // console.log(json);
    let items = json.items;
    if (!Array.isArray(items) || items.length === 0) {
        return [];
    }
    items = items.filter((itm) => {
        // check results are people through sex field, which seems to be the most consistent. 
        // Results must also have an alias, mostly to ensure they are criminals
        return ((itm.sex === "Male") || (itm.sex === "Female")) && 
        ((Array.isArray(itm.aliases) && itm.aliases.length !== 0));
    });
    items = items.map(itm => {
        return {
            name: itm.title,
            alias: itm.aliases[0],
            sex: itm.sex,
            hair: itm.hair,
            eyes: itm.eyes,
            image: itm.images[0].original
        }
    })
    // console.log(items);
    return items;  
}