import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async (params) => {
        let url = `http://localhost:8000/products${(params && params.length > 0) ? "?"+params.map(param => `${param[0]}=${param[1]}`).join("&") : ""}`;
        let response = await (fetch(url))
        let [products, brands, categories, sort] = await response.json().then(data => [data.products, data.brands, data.categories, data.sort])
        let totalItems = response.headers.get("X-Total-Count")
        return {products, brands, categories, totalItems, sort}
    }
)

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        totalItems: 0,
        fetching: false,
        limit: 10,
        filters: {
            category: [],
            brand: []
        },
        sort: ""
    },
    reducers: {
        filterProducts: (state, action) => {
            let [section, optionIdx, target] = action.payload
            state.filters[section][optionIdx].checked = target.checked
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.products = action.payload.products;
            state.filters.brand = action.payload.brands;
            state.filters.category = action.payload.categories;
            state.totalItems = Number(action.payload.totalItems);
            state.sort = action.payload.sort;
            state.fetching = false;
        })
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.fetching = true;
        })
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.products = []
            state.filters.brand = []
            state.filters.category = []
        })
    }
})

export const { filterProducts } = productSlice.actions
export default productSlice.reducer