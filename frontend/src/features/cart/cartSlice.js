const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchItemsAsync = createAsyncThunk(
    "cart/fetchItems",
    async (userId) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : null}`
                }
            })
            if (response.ok) {
                return await response.json()
            } else {
                response = await response.json()
                throw new Error(response.message)
            }
        } catch (e) {
            throw new Error("Couldn't fetch items")
        }
    }
)

export const addToCartAsync = createAsyncThunk(
    "cart/addToCart",
    async (data) => {
        return await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => response.json())
    }
)

export const updateCartAsyc = createAsyncThunk(
    "cart/updateCart",
    async ([userId, itemId, newValue]) => {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
            method: "PATCH",
            body: JSON.stringify({
                item: itemId,
                newData: {
                    quantity: newValue
                }
            }),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(response)
        if (response.ok) {
            return await response.json()
        } else {
            response = await response.json()
            throw new Error(response.error)
        }
    }
)

export const deleteFromCart = createAsyncThunk(
    "cart/deleteFromCart",
    async ([userId, itemId]) => {
        console.log("productId")
        console.log(itemId)
        console.log("productId")
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
            method: "DELETE",
            body: JSON.stringify({
                user: userId,
                cartItem: itemId
            }),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        if (response.ok) {
            let { data } = await response.json()
            return data;
        } else {
            throw new Error("Some Error Occurred!")
        }
    }
)

export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async (userId) => {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
            method: "delete",
            body: JSON.stringify({
                user: userId
            }),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        if (response.ok) {
            let { data } = await response.json()
            return data;
        } else {
            throw new Error("Some Error Occurred!")
        }
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        state: "idle",
        errorMessage: ""
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItemsAsync.fulfilled, (state, action) => {
            state.items = action.payload.data
            state.state = "idle"
        })
        builder.addCase(fetchItemsAsync.pending, (state) => {
            state.state = "loading"
        })
        builder.addCase(fetchItemsAsync.rejected, (state, action) => {
            state.state = "idle"
            state.items = []
            state.errorMessage = action.error.message
        })

        builder.addCase(addToCartAsync.fulfilled, (state, action) => {
            action.payload?.data ? console.log(true) : console.log(false)
            action.payload?.data && (state.items = action.payload.data)
        })

        builder.addCase(updateCartAsyc.fulfilled, (state, action) => {
            state.items = action.payload.data
        })
        builder.addCase(updateCartAsyc.rejected, (state) => {
            state.items = []
        })

        builder.addCase(deleteFromCart.fulfilled, (state, action) => {
            console.log(action.payload)
            state.items = action.payload
        })

        builder.addCase(clearCart.fulfilled, (state, action) => {
            state.items = action.payload
        })
    }
})

export default cartSlice.reducer