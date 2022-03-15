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
                    inHistory: false,
                    amount:0
                }
            })
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

        case 'deleteItemFromCart' : {
            const itemId = action.payload.id
            const markers = changeProp(itemId, 'amount', 0)
            return {
                ...state,
                markers
            }
        }

        case 'increaseItemAmount' : {
            const itemId = action.payload.id
            const amount = selectors.getItem(state,itemId).amount;
            const markers = changeProp(itemId, 'amount', amount+1)
            return {
                ...state,
                markers
            }
        }

        case 'decreaseItemAmount' : {
            const itemId = action.payload.id
            const amount = selectors.getItem(state,itemId).amount;
            let markers=[];
            if(amount>0) {
                markers = changeProp(itemId, 'amount', amount - 1)
            }else{
                markers = changeProp(itemId, 'amount', 0)
            }
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
                if (item.amount > 0) {
                    return {
                        ...item,
                        amount: 0,
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

    },
     getItem:(state, itemId)=>{
         return state.markers.find(item=>item.id==itemId)
    }

}