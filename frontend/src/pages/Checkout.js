import React from 'react'
import Layout from '../features/navbar/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart, updateCartAsyc } from '../features/cart/cartSlice'
import { useForm } from 'react-hook-form'
import { addAddressAsync, fetchUserDetails } from '../features/auth/authSlice'
import ProtectedView from '../features/auth/components/ProtectedView'
import { createOrderAsync } from '../features/order/orderSlice'

export default function Checkout() {
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset: reset2 } = useForm()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const { items, state } = useSelector(state => state.cart)

    React.useEffect(() => {
        dispatch(fetchUserDetails(user.id))
    }, [])

    return (
        <ProtectedView>
            <Layout>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className='lg:col-span-3'>
                        <div className="space-y-12">
                            <form noValidate method="POST" onSubmit={handleSubmit2(data => {
                                dispatch(addAddressAsync({
                                    userId: user.id,
                                    address: {
                                        name: data.fname + " " + data.lname,
                                        email: data.email,
                                        phone: data.phone,
                                        country: data.country,
                                        street: data.street,
                                        city: data.city,
                                        state: data.state,
                                        pinCode: data.pinCode
                                    }
                                }))
                            })}>
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="text-left mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="fname"
                                                    id="fname"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    required
                                                    {...register2("fname", { required: "First name is required" })}
                                                />
                                            </div>
                                            {errors2.fname && <p className='text-red-500 text-sm'>*{errors2.fname.message}</p>}
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="lname"
                                                    id="lname"
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    required
                                                    {...register2("lname", { required: "Last name is required" })}
                                                />
                                            </div>
                                            {errors2.lname && <p className='text-red-500 text-sm'>*{errors2.lname.message}</p>}
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    required
                                                    {...register2("email", { required: "Email is required" })}
                                                />
                                            </div>
                                            {errors2.email && <p className='text-red-500 text-sm'>*{errors2.email.message}</p>}
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Country
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="country"
                                                    name="country"
                                                    type="text"
                                                    autoComplete="country-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    required
                                                    {...register2("country", { required: "Country is required" })}
                                                />
                                            </div>
                                            {errors2.country && <p className='text-red-500 text-sm'>*{errors2.country.message}</p>}
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    autoComplete="phone"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    required
                                                    {...register2("phone", { required: "Phone Number is required" })}
                                                />
                                            </div>
                                            {errors2.phone && <p className='text-red-500 text-sm'>*{errors2.phone.message}</p>}
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="street"
                                                    id="street"
                                                    autoComplete="street-address"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    required
                                                    {...register2("street", { required: "Street Address is required" })}
                                                />
                                            </div>
                                            {errors2.street && <p className='text-red-500 text-sm'>*{errors2.street.message}</p>}
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    autoComplete="address-level2"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    required
                                                    {...register2("city", { required: "City is required" })}
                                                />
                                            </div>
                                            {errors2.city && <p className='text-red-500 text-sm'>*{errors2.city.message}</p>}
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="state"
                                                    id="state"
                                                    autoComplete="address-level1"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    required
                                                    {...register2("state", { required: "State / Province is required" })}
                                                />
                                            </div>
                                            {errors2.state && <p className='text-red-500 text-sm'>*{errors2.state.message}</p>}
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="pinCode"
                                                    id="pinCode"
                                                    autoComplete="postal-code"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    required
                                                    {...register2("pinCode", { required: "ZIM / Postal Code is required" })}
                                                />
                                            </div>
                                            {errors2.pinCode && <p className='text-red-500 text-sm'>*{errors2.pinCode.message}</p>}
                                        </div>
                                    </div>

                                    <div className='w-full text-right'>
                                        <button onClick={() => reset2(undefined, { keepErrors: false })} className='rounded-md m-5 px-3 py-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Reset</button>
                                        <button type='submit' className='rounded-md bg-indigo-600 m-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Add Address</button>
                                    </div>
                                </div>
                            </form>

                            <form noValidate method="POST" onSubmit={handleSubmit(data => {
                                dispatch(createOrderAsync({
                                    items: items.map(item => ({ product: item.product.id, quantity: item.quantity })),
                                    selectedAddress: user.addresses[data.address],
                                    paymentMethod: data.paymentMethod,
                                    user: user.id
                                }))
                                navigate("/")
                            })}>
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose from existing addresses
                                    </p>

                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <ul className="divide-y divide-gray-100">
                                                {user?.addresses?.map((address, ind) => (
                                                    <li key={ind} className="flex gap-x-6 py-5">
                                                        <input
                                                            type="radio"
                                                            name="address"
                                                            id={`address-${ind}`}
                                                            value={ind}
                                                            {...register("address", { required: "Please select address" })}
                                                        />
                                                        <label htmlFor={`address-${ind}`} className='flex justify-between w-full'>
                                                            <div className="flex min-w-0 gap-x-4 text-left">
                                                                <div className="min-w-0 flex-auto">
                                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                                                    <p className="ktruncate text-xs leading-5 text-gray-500">{address.city}, {address.state}</p>
                                                                </div>
                                                            </div>
                                                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                                <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
                                                                <p className="text-xs leading-5 text-gray-500">Pin Code: {address.pinCode}</p>
                                                            </div>
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                            {errors.address && <p className='text-red-500 text-sm'>*{errors.address.message}</p>}
                                        </fieldset>
                                    </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Payment Method</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Select a payment method
                                    </p>

                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <ul className="divide-y divide-gray-100">
                                                <li className="flex gap-x-6 py-1">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        id="cash"
                                                        className="my-1"
                                                        value="cash"
                                                        required
                                                        {...register("paymentMethod", { required: "Choose a Payment Method" })}
                                                    />
                                                    <label htmlFor="cash" className='flex justify-between w-full'>
                                                        <div>Cash</div>
                                                    </label>
                                                </li>
                                                <li className="flex gap-x-6 py-1">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        id="card"
                                                        className="my-1"
                                                        value="card"
                                                        required
                                                        {...register("paymentMethod", { required: "Choose a Payment Method" })}
                                                    />
                                                    <label htmlFor="card" className='flex justify-between w-full'>
                                                        <div>Card</div>
                                                    </label>
                                                </li>
                                            </ul>
                                            {errors.paymentMethod && <p className='text-red-500 text-sm'>*{errors.paymentMethod.message}</p>}
                                        </fieldset>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button
                                        disabled={user?.addresses?.length <= 0}
                                        type="submit"
                                        className={`rounded-md ${user?.addresses?.length > 0 ? "bg-indigo-600" : "bg-gray-400"} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white h-max">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-left pt-5 pl-5">Cart</h1>
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
                                <p>$262.00</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500 text-left">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <Link
                                    to="#"
                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Pay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </ProtectedView>
    )
}
