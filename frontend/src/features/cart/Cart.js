import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteFromCart, updateCartAsyc } from './cartSlice'

export default function Cart() {
    const dispatch = useDispatch()
    const { items, state } = useSelector(state => state.cart)
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-left py-5 pl-5">Cart</h1>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                        {state === "loading" ? "Fetching items..." : items?.length > 0 ? items.map((item, productIdx) => (
                            <li key={productIdx} className="flex py-6">
                                <Link to={`/product/${item.product.id}`}>
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={item.product.thumbnail}
                                            alt={item.product.title}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                </Link>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <Link to={`/product/${item.product.id}`}>
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <div className='text-left'>
                                                    <h3>{item.product.title}</h3>
                                                    <p>{item.product.brand}</p>
                                                </div>
                                                <p className="ml-4">$ {item.product.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">Stock: {item.product.stock}</p>

                                        <div className="flex">
                                            <div className='mx-2'>
                                                <button id="decrement" className="bg-gray-300 px-3 py-1 rounded" onClick={() => {
                                                    dispatch(updateCartAsyc([item.user, item.id, item.quantity - 1]))
                                                }}>-</button>
                                                <input id="counter" className="mx-1 p-1 border border-gray-300 rounded text-center w-16" type="text" value={item.quantity} onChange={(e) => {
                                                    // count = e.target.value
                                                }} />
                                                <button id="increment" className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => {
                                                    dispatch(updateCartAsyc([item.user, item.id, item.quantity + 1]))
                                                }}>+</button>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    dispatch(deleteFromCart([item.user, item.id]))
                                                }}
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )) : <p>Cart is Empty!</p>}
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$ {items?.length > 0 ? Array.from(items).reduce((a, b) => a + b.product.price * b.quantity, 0) : 0}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 text-left">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                    {
                        items?.length ?
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Checkout
                        </Link>
                        :
                        <Link
                            to="/"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Go to Dashboard
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}
