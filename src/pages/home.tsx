import { Link } from "react-router-dom"
import type { DataTypes } from "../types/dataType"



type HomeProps = {
    loader: boolean
    data: DataTypes[]
}

const Home = ({ data, loader }: HomeProps) => {


    return (<>

        <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
                <h2 className="text-[35px] font-bold">All Products</h2>
                <div className="mt-5 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {loader ? <div>loading..</div> : (
                        data.map((el) => (
                            <Link to={`/product/${el.id}`} key={el.id} className="bg-gray-100 hover:scale-105 duration-200 ease-in-out flex flex-col justify-between p-6 h-[425px] rounded-lg  ">
                                <div className="flex items-center  justify-center">
                                    <img alt="ecommerce" className="h-60 object-contain " src={el.image} />
                                </div>
                                <div className="mt-4 flex flex-col justify-between ">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{el.category}</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium line-clamp-2">{el.title}</h2>
                                    <div className="flex items-center mt-3 justify-between">
                                        <p className="mt-1 font-bold">&#36;{el.price}</p>
                                        <button className="inline-flex cursor-pointer text-white duration-150 transition ease-in-out hover:scale-110 items-center bg-green-400 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">Add to cart
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))

                    )}


                </div>
            </div>
        </section>
    </>)

}


export default Home