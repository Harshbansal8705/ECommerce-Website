import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, StarIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../productSlice'
import { useSearchParams } from 'react-router-dom'

const sortOptions = ['Most Popular', 'Price: Low to High', 'Price: High to Low']
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function updateSearchParams(searchParams, option, value) {
    let prevParams = Array.from(searchParams)
    let idx = prevParams.findIndex((e) => {
        return (e[0] === option)
    })

    if (idx >= 0) {
        prevParams[idx] = [option, value]
    } else {
        prevParams.push([option, value])
    }
    return prevParams
}

export default function ProductList() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const dispatch = useDispatch()
    const { products, totalItems, fetching, filters, sort, limit } = useSelector(state => state.product)
    const [pages, setPages] = React.useState(Math.ceil(totalItems / limit))
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    let selectedSort = "";
    switch (sort) {
        case "popularity":
            selectedSort = "Most Popular"
            break;
        case "price-low-to-high":
            selectedSort = "Price: Low to High"
            break;
        case "price-high-to-low":
            selectedSort = "Price: High to Low"
            break;
        default:
            break;
    }

    React.useEffect(() => {
        dispatch(fetchAllProducts(Array.from(searchParams.entries())))
    }, [searchParams, dispatch])
    React.useEffect(() => {
        setPages(totalItems > 1 ? Math.ceil(totalItems / limit) : 1)
    }, [products, limit, totalItems])

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <MobileFilterDialog filters={filters} mobileFiltersOpen={[mobileFiltersOpen, setMobileFiltersOpen]} setSearchParams={setSearchParams} />

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <DesktopFilters selectedSort={selectedSort} setMobileFiltersOpen={setMobileFiltersOpen} setSearchParams={setSearchParams} />

                    <ProductsGrid filters={filters} products={products} fetching={fetching} setSearchParams={setSearchParams} />

                    {/* Pagination */}
                    <Pagination pages={pages} page={page} limit={limit} totalItems={totalItems} setSearchParams={setSearchParams} />
                </main>
            </div>
        </div>
    )
}

function MobileFilterDialog({ filters, mobileFiltersOpen: [mobileFiltersOpen, setMobileFiltersOpen], setSearchParams }) {
    return (
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>
                                {Object.keys(filters).map((section) => (
                                    <Disclosure as="div" key={section} className="border-t border-gray-200 px-4 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-6">
                                                        {filters[section].map((option, optionIdx) => (
                                                            <div key={optionIdx} className="flex items-center">
                                                                <input
                                                                    id={`filter-mobile-${section}-${optionIdx}`}
                                                                    name={`${section}[]`}
                                                                    defaultValue={option[section]}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    onChange={(e) => {
                                                                        setSearchParams((prevParams) => {
                                                                            let params = Array.from(prevParams)
                                                                            if (option.checked) {
                                                                                let idx = params.findIndex((e) => {
                                                                                    return ((e[0] === section) && (e[1] === option[section]))
                                                                                })
                                                                                if (idx >= 0) {
                                                                                    params.splice(idx, 1)
                                                                                }
                                                                            } else {
                                                                                params.push([section, option[section]])
                                                                            }
                                                                            return updateSearchParams(params, 'page', 1);
                                                                        })
                                                                    }}
                                                                />
                                                                <label
                                                                    htmlFor={`filter-mobile-${section}-${optionIdx}`}
                                                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                >
                                                                    {option[section]}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

function DesktopFilters({ selectedSort, setMobileFiltersOpen, setSearchParams }) {
    return (
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

            <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            Sort
                            <ChevronDownIcon
                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                            />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1 cursor-default">
                                {sortOptions.map((option, ind) => (
                                    <Menu.Item key={option}>
                                        {({ active }) => (
                                            <div
                                                onClick={() => {
                                                    setSearchParams((prevParams) => {
                                                        let sorting = (ind === 0) ? "popularity" : (ind === 1) ? "price-low-to-high" : (ind === 2) ? "price-high-to-low" : ""
                                                        let params = updateSearchParams(prevParams, 'sort', sorting)
                                                        return updateSearchParams(params, 'page', 1)
                                                    })
                                                }}
                                                className={classNames(
                                                    (selectedSort === sortOptions[ind]) ? 'font-medium text-gray-900' : 'text-gray-500',
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                {option}
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>

                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}

function ProductsGrid({ filters, products, fetching, setSearchParams }) {
    return (
        <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
                Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>
                    {Object.keys(filters).map((section) => (
                        <Disclosure as="div" key={section} className="border-b border-gray-200 py-6">
                            {({ open }) => (
                                <>
                                    <h3 className="-my-3 flow-root">
                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900 capitalize">{section}</span>
                                            <span className="ml-6 flex items-center">
                                                {open ? (
                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                ) : (
                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                )}
                                            </span>
                                        </Disclosure.Button>
                                    </h3>
                                    <Disclosure.Panel className="pt-6">
                                        <div className="space-y-4">
                                            {filters[section].map((option, optionIdx) => (
                                                <div key={optionIdx} className="flex items-center">
                                                    <input
                                                        id={`filter-${section}-${optionIdx}`}
                                                        name={`${section}[]`}
                                                        defaultValue={option[section]}
                                                        type="checkbox"
                                                        checked={option.checked}
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        // onChange={(e) => dispatch(filterProducts([section, optionIdx, e.target]))}
                                                        onChange={(e) => {
                                                            setSearchParams((prevParams) => {
                                                                let params = Array.from(prevParams)
                                                                if (option.checked) {
                                                                    let idx = params.findIndex((e) => {
                                                                        return ((e[0] === section) && (e[1] === option[section]))
                                                                    })
                                                                    if (idx >= 0) {
                                                                        params.splice(idx, 1)
                                                                    }
                                                                } else {
                                                                    params.push([section, option[section]])
                                                                }
                                                                return updateSearchParams(params, 'page', 1);
                                                            })
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={`filter-${section}-${optionIdx}`}
                                                        className="ml-3 text-sm text-gray-600"
                                                    >
                                                        {option[section]}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                    {/* Your content */}
                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                {products.length > 0 ? products.map((product, productInd) => {
                                    return (
                                        <Link to={`/product/${product.id}`} key={productInd}>
                                            <div key={product.id} className="group relative">
                                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                    <img
                                                        src={product.thumbnail}
                                                        alt={product.description}
                                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                    />
                                                </div>
                                                <div className="mt-4 flex justify-between">
                                                    <div>
                                                        <h3 className="text-sm text-gray-700">
                                                            <span aria-hidden="true" className="absolute inset-0" />
                                                            {product.title}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                                        <h3 className="text-sm text-gray-700 flex items-center">
                                                            <span aria-hidden="true" className="absolute inset-0" />
                                                            {product.rating} <StarIcon className='w-4 inline' />
                                                        </h3>
                                                    </div>
                                                    <div className='text-right'>
                                                        <p className="text-sm font-medium text-gray-900">$ {product.price}</p>
                                                        <p className="text-sm font-medium text-gray-900">{product.discountPercentage}% Discount</p>
                                                        <p className="text-sm font-medium text-gray-800">{product.stock} in Stock</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }) : (fetching ? <div>Fetching products...</div> : <div>No Products Found</div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Pagination({ pages, page, limit, totalItems, setSearchParams }) {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <div
                    onClick={() => {
                        setSearchParams(prevParams => updateSearchParams(prevParams, 'page', page > 1 ? page - 1 : 1))
                    }}
                    className={`${page === 1 ? 'invisible' : ''} relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer`}
                >
                    Previous
                </div>
                <div
                    onClick={() => {
                        setSearchParams(prevParams => updateSearchParams(prevParams, 'page', page === pages ? pages : page + 1))
                    }}
                    className={`${page === pages ? 'invisible' : ''} relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer`}
                >
                    Next
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to <span className="font-medium">{page * limit > totalItems ? totalItems : page * limit}</span> of
                        <span className="font-medium">{` ${totalItems > 0 ? totalItems : 0}`}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <div
                            onClick={() => {
                                setSearchParams(prevParams => updateSearchParams(prevParams, 'page', 1))
                            }}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div
                            onClick={() => {
                                setSearchParams(prevParams => updateSearchParams(prevParams, 'page', page > 1 ? page - 1 : 1))
                            }}
                            className={`${page === 1 ? 'hidden' : ''} relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer`}
                        >
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        {
                            Array.from({ length: 5 }, (_, ind) => {
                                return (
                                    (page + ind - 2 > 0 && page + ind - 2 <= pages) ?
                                        <span key={ind}
                                            onClick={() => setSearchParams(prevParams => updateSearchParams(prevParams, 'page', page + ind - 2))}
                                            aria-current="page"
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${ind === 2 ? "bg-indigo-600 text-white focus-visible:outline-indigo-600 cursor-default" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 cursor-pointer"}`}
                                        >
                                            {page + ind - 2}
                                        </span> : ''
                                )
                            })
                        }
                        <div
                            onClick={() => {
                                setSearchParams(prevParams => updateSearchParams(prevParams, "page", page === pages ? pages : page + 1))
                            }}
                            className={`${page === pages ? 'hidden' : ''} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer`}
                        >
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div
                            onClick={() => {
                                setSearchParams(prevParams => updateSearchParams(prevParams, "page", pages))
                            }}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}