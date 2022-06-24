const response = require("./response.json");

export default function getWantedList() {
    let items = response.items.filter((itm) => {
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
    return items;
}