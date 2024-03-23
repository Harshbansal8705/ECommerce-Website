import React from 'react'
import Layout from '../features/navbar/Layout'
import Cart from '../features/cart/Cart'
import ProtectedView from '../features/auth/components/ProtectedView'

export default function CartPage() {
    return (
        <Layout>
            <ProtectedView>
                <Cart />
            </ProtectedView>
        </Layout>
    )
}
