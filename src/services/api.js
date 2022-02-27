import axios from "axios";

export const getItems = async () => {
    try {
        const {data} = await axios.get('https://621630187428a1d2a35e4ba5.mockapi.io/items/?page=1&limit=12')
        return data
    } catch (error) {
        console.log(error);
    }
    return []
};
