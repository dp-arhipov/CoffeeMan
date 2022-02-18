import React from 'react';

export const initialState = {
    goods: [],
    markers: []
}

export function reducer(state, action) {
    const changeProp = (itemId, propName, propValue, array = state.markers) => {
        const newArray = array.map((item) => {
            if (item.id == itemId) return {
                ...item,
                [propName]: propValue
            }
            return item;
        });
        // console.log(newArray)
        return newArray;
    }

    switch (action.type) {
        case 'initGoods': {
            return {
                ...state,
                goods: action.payload
            }
        }

        case 'initMarkers': {
            const goods = action.payload;
            const markers = goods.map((item) => {
                return {
                    id: item.id,
                    inFavourite: false,
                    inCart: false,
                    inHistory: false
                }
            })
            console.log(markers)
            return {
                ...state,
                markers: markers
            }
        }

        case 'loadMarkers': {
            return {
                ...state,
                markers: action.payload
            }
        }

        case 'addItemInCart' : {
            const itemId = action.payload.id
            const markers = changeProp(itemId, 'inCart', true)
            return {
                ...state,
                markers
            }
        }

        case 'deleteItemFromCart' : {
            const itemId = action.payload.id
            const markers = changeProp(itemId, 'inCart', false)
            return {
                ...state,
                markers
            }
        }

        case 'addItemToFavourite' : {
            const itemId = action.payload.id
            const markers = changeProp(itemId, 'inFavourite', true)
            return {
                ...state,
                markers
            }
        }

        case 'deleteItemFromFavourite' : {
            const itemId = action.payload.id
            const markers = changeProp(itemId, 'inFavourite', false)
            return {
                ...state,
                markers
            }
        }

        case 'moveItemsToHistory' : {
            const markers = state.markers.map(item => {
                if (item.inCart == true) {
                    return {
                        ...item,
                        inCart: false,
                        inHistory: true
                    }
                }
                return item
            })
            return {
                ...state,
                markers
            }
        }
        default:
            return state;
    }
}


export const selectors = {
    goodsWithMarkers: (state) => {
        const goods = state.goods;
        const markers = state.markers;
        if (markers && goods && markers.length != 0 && goods.length != 0) {
            const goodsWithMarkersTemp = []
            goods.map((item) => {
                const index = item.id
                const itemMarkers = markers.find(markersItem => markersItem.id == index) || []
                goodsWithMarkersTemp.push({...item, ...itemMarkers})
            })
            return goodsWithMarkersTemp;
        } else return null

    }

}