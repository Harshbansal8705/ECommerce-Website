import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync, deleteErrorMessage } from '../authSlice'

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const message = useSelector(state => state.auth.message)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector(state => state.auth.user)

    React.useEffect(() => {
        dispatch(deleteErrorMessage())
    }, [dispatch])

    if (user) {
        navigate(location.state.next)
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form noValidate className="space-y-6" method="POST" onSubmit={handleSubmit((data) => {
                    dispatch(loginAsync({email: data.email, password: data.password}))
                })}>
                    <div>
                        <label htmlFor="email" className="block text-sm text-left font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register("email", { required: "Email is required" })}
                            />
                        </div>
                        {errors.email && <p className='text-red-500'>*{errors.email.message}</p>}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register("password", { required: "Password is required" })}
                            />
                        </div>
                        {errors.password && <p>*{errors.password.message}</p>}
                    </div>

                    <div>
                        { message && <p className='text-red-600 text-sm'>*{message}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" state={location.state} >
                        Create an Account
                    </Link>
                </p>
            </div>
        </div>
    )
}
