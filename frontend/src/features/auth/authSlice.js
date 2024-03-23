import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createUserAsync = createAsyncThunk(
    "users/createUser",
    async (userData) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { 'content-type': 'application/json' }
        })
        if (response.ok) return await response.json()
        else {
            let { message } = await response.json()
            throw new Error(message)
        }
    }
)

export const loginAsync = createAsyncThunk(
    "users/login",
    async (data) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        if (response.ok) return await response.json()
        else {
            let { message } = await response.json()
            throw new Error(message)
        }
    }
)

export const fetchUserDetails = createAsyncThunk(
    "users/getUserDetails",
    async (userId) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        if (response.ok) {
            return await response.json().then(res => res.data)
        } else {
            let error = await response.json(res => res.error)
            throw new Error(error)
        }
    }
)

export const addAddressAsync = createAsyncThunk(
    "addresses/addAddress",
    async (data) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            return await response.json().then(res => res.data)
        } else {
            const res = await response.json()
            throw new Error(res.message)
        }
    }
)

const authSlice = createSlice({
    name: "user",
    initialState: {
        user: (localStorage.getItem("user") && localStorage.getItem("user") !== "undefined") ? JSON.parse(localStorage.getItem("user")) : null,
        status: 'idle',
        message: ""
    },
    reducers: {
        deleteErrorMessage: (state) => {
            state.message = ""
        },
        logout: (state) => {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                localStorage.setItem('user', JSON.stringify(action.payload.user))
                localStorage.setItem('token', action.payload.token)
                state.user = action.payload.user
                state.message = ""
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.status = 'idle'
                state.user = null
                state.message = action.error.message
            })

            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                localStorage.setItem('user', JSON.stringify(action.payload.user))
                localStorage.setItem('token', action.payload.token)
                state.user = action.payload.user
                state.message = ""
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'idle'
                state.user = null
                state.message = action.error.message
            })

            .addCase(addAddressAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                state.user = action.payload
            })
            .addCase(addAddressAsync.pending, (state) => {
                state.status = "loading"
            })

            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "idle"
            })
            .addCase(fetchUserDetails.pending, (state, action) => {
                state.status = "pending"
            })
    }
})

export const { deleteErrorMessage, logout } = authSlice.actions
export default authSlice.reducer