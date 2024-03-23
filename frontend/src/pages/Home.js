import React from 'react'
import Layout from '../features/navbar/Layout'
import ProductList from '../features/product/components/ProductList'
import { useDispatch } from 'react-redux'
import { setOrderPlacedFalse } from '../features/order/orderSlice';

export default function Home() {
    const dispatch = useDispatch();
    dispatch(setOrderPlacedFalse())
    return (
        <>
            <Layout>
                <ProductList />
            </Layout>
        </>
    )
}
