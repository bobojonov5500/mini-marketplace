import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import APIService from '../services/api'
import type { DataTypes } from '../types/dataType'

export type CartProduct = DataTypes & {
    quantity: number
}

export const Product = () => {
    const { id } = useParams<{ id: string }>()

    const [loader, setLoader] = useState(false)
    const [item, setItem] = useState<DataTypes | null>(null)
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([])

    useEffect(() => {
        if (!id) return

        const fetchData = async () => {
            setLoader(true)
            try {
                const data = await APIService.getOneProduct(id)
                setItem(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoader(false)
            }
        }

        fetchData()
    }, [id])

    useEffect(() => {
        try {
            const stored = localStorage.getItem('cart')
            if (!stored) return

            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed)) {
                setCartProducts(parsed)
            }
        } catch (e) {
            console.error('Invalid cart data, clearing...', e)
            localStorage.removeItem('cart')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts))
    }, [cartProducts])

    const addToCart = (product: DataTypes) => {
        setCartProducts((prev) => {
            const exist = prev.find((p) => p.id === product.id)

            if (exist) {
                return prev.map((p) =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                )
            }

            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const increment = (id: number) => {
        setCartProducts((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, quantity: p.quantity + 1 } : p
            )
        )
    }

    const decrement = (id: number) => {
        setCartProducts((prev) =>
            prev
                .map((p) =>
                    p.id === id ? { ...p, quantity: p.quantity - 1 } : p
                )
                .filter((p) => p.quantity > 0)
        )
    }

    const cartItem = cartProducts.find((p) => p.id === item?.id)

    if (loader) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        )
    }

    if (!item) return null

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                        alt={item.title}
                        className="lg:w-1/2 w-full max-h-[500px] object-contain rounded"
                        src={item.image}
                    />

                    <div className="lg:w-1/2 w-full lg:pl-10 mt-6">
                        <h2 className="text-sm text-gray-500 tracking-widest">
                            {item.category}
                        </h2>
                        <h1 className="text-gray-900 text-3xl font-medium mb-2">
                            {item.title}
                        </h1>

                        <p className="leading-relaxed mb-6">{item.description}</p>

                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-gray-900">
                                ${item.price}
                            </span>

                            {cartItem ? (
                                <div className="flex items-center gap-3 ml-auto">


                                    <button
                                        onClick={() => decrement(cartItem.id)}

                                        type="button"
                                        id="decrement-button"
                                        data-input-counter-decrement="counter-input"
                                        className="inline-flex cursor-pointer py-5 h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gray-300 active:border-none bg-gray-100 hover:bg-gray-200 active:bg-[#6366F1]  "
                                    >
                                        <svg
                                            className="h-3 w-3 "
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 2"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 1h16"
                                            />
                                        </svg>
                                    </button>

                                    <span className="text-lg font-semibold">
                                        {cartItem.quantity}
                                    </span>



                                    <button
                                        onClick={() => increment(cartItem.id)}
                                        type="button"
                                        id="increment-button"
                                        data-input-counter-increment="counter-input"
                                        className="inline-flex py-5 h-8 w-8 cursor-pointer shrink-0 items-center justify-center rounded-md border border-gray-300 active:border-none bg-gray-100 hover:bg-gray-200 active:bg-[#6366F1]  "
                                    >
                                        <svg
                                            className="h-3 w-3  "
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 18"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 1v16M1 9h16"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => addToCart(item)}
                                    className="ml-auto text-white bg-indigo-500 py-2 px-6 rounded hover:bg-indigo-600"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
