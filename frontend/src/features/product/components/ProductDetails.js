import React from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartAsync } from '../../cart/cartSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails({ product }) {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [inCart, setInCart] = React.useState(false)
    const cart = useSelector(state => state.cart.items)

    React.useEffect(() => {
        if (user) {
            fetch("http://localhost:8000/productInCart", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    userId: user.id,
                    productId: product.id
                })
            }).then(async response => {
                if (response.ok) {
                    setInCart(await response.json().then(res => res.data))
                }
            })
        }
    }, [user, cart])

    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li>
                            <div className="flex items-center">
                                <p className="mr-2 text-sm capitalize font-medium text-gray-900">
                                    {product.category}
                                </p>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <p className="mr-2 text-sm capitalize font-medium text-gray-900">
                                    {product.brand}
                                </p>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li className="text-sm">
                            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.title}
                            </a>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            src={product.images[0]}
                            alt={product.images[0]}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                                src={product.images[1]}
                                alt={product.images[1]}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                                src={product.images[2]}
                                alt={product.images[2]}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                    <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                        <img
                            src={product.images[3]}
                            alt={product.images[3]}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">$ {product.price}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                Math.round(product.rating) > rating ? 'text-gray-900' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{product.rating} out of 5 stars</p>
                                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {product.rating} stars
                                </p>
                            </div>
                        </div>

                        {!inCart ? 
                        <button
                            onClick={() => {
                                user ? dispatch(addToCartAsync({
                                    user: user ? user.id : null,
                                    product: product.id,
                                    quantity: 1
                                })) : navigate("/login", {
                                    state: {
                                        next: location.pathname
                                    }
                                })
                            }}
                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Add to Cart
                        </button>
                        :
                        <Link
                            to="/cart"
                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Go to Cart
                        </Link>}
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
