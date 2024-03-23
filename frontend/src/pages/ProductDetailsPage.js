import React from 'react'
import Layout from '../features/navbar/Layout'
import ProductDetails from '../features/product/components/ProductDetails'
import { useParams } from 'react-router-dom'

export default function ProductDetailsPage() {
    let { id } = useParams()
    const [product, setProduct] = React.useState(undefined)
    const [loading, setLoadingStatus] = React.useState(false)
    React.useEffect(() => {
        setLoadingStatus(true)
        fetch(`http://localhost:8000/products/${id}`)
            .then(response => response.json())
                .then(data => {
                    setProduct(data)
                    setLoadingStatus(false)
                }
            )
    }, [])
    return (
        <Layout>
            {loading ? <h2>Loading...</h2> :
                product && ((product.message && <h2>Product Not Found</h2>) || <ProductDetails product={product} />)}
        </Layout>
    )
}
