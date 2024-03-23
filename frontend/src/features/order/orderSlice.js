import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createOrderAsync = createAsyncThunk(
    "order/createOrder",
    async (data) => {
        const response = await fetch("http://localhost:8000/orders", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            return await response.json().then(res => res.data)
        }
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        status: "idle",
        currentOrder: null,
        totalOrders: 0,
        orderPlaced: false,
    },
    reducers: {
        setOrderPlacedFalse: (state) => {
            state.orderPlaced = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrderAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.orders = [ ...state.orders, action.payload ]
        })
        builder.addCase(createOrderAsync.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(createOrderAsync.rejected, (state) => {
            state.status = "idle"
        })
    }
})

export const { setOrderPlacedFalse } = orderSlice.actions
export default orderSlice.reducer;