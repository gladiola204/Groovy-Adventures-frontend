import { createSlice } from "@reduxjs/toolkit";
import { AddToBasketAction, FilterToursAction, GetTourAction, GetToursAction, ITourState, RemoveFromBasketAction, SetBasketAction, UpdateBasketAction } from "./tourSlice.interface";
import { RootState } from '../../store';
import addCommonAsyncThunksMatchers from '../../utils/addCommonAsyncThunksMatchers';
import tourThunks from "./tourThunks";


const initialState: ITourState = {
    tour: null,
    tours: [],
    filteredTours: [],
    hasMoreFilteredTours: true,
    isError: false,
    errorMessage: '',
    isSuccess: false,
    basket: [],
    fetched: false,
};
  
const tourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {
        ADD_TO_BASKET(state, action: AddToBasketAction) {
            state.basket = [...state.basket, action.payload];
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        REMOVE_FROM_BASKET(state, action: RemoveFromBasketAction) {
            const updatedBasket = state.basket.filter(value => value.id !== action.payload);
            state.basket = updatedBasket;
            localStorage.setItem('basket', JSON.stringify(updatedBasket));
        },
        SET_BASKET(state, action: SetBasketAction) {
            state.basket = action.payload;
        },
        UPDATE_BASKET(state, action: UpdateBasketAction) {
            const { id, numberOfTravellers } = action.payload;

            const updatedBasket = state.basket.map((product) => {
                if(product.id === id) {
                    product.numberOfTravellers = numberOfTravellers;
                }
                return product;
            });

            state.basket = updatedBasket;
            localStorage.setItem('basket', JSON.stringify(updatedBasket));
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(tourThunks.getTour.fulfilled, (state, action: GetTourAction) => {
            state.tour = action.payload.data;
        })
        .addCase(tourThunks.filterTours.fulfilled, (state, action: FilterToursAction) => {
            state.filteredTours = action.payload.data.filteredTours;
            state.hasMoreFilteredTours = action.payload.data.remainingCount === 0 ? false : true;
        })
        .addCase(tourThunks.getTours.fulfilled, (state, action: GetToursAction) => {
            state.tours = action.payload.data;
        })
        addCommonAsyncThunksMatchers<ITourState>(builder, 'tours/')
    }
})

export const { ADD_TO_BASKET, REMOVE_FROM_BASKET, SET_BASKET, UPDATE_BASKET } = tourSlice.actions;
export const selectTourState = (state: RootState) =>  state.tour;


export default tourSlice.reducer;