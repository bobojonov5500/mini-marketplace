import { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/cart'
import Home from './pages/home'
import APIService from './services/api'
import type { DataTypes } from './types/dataType'
import { Product } from './pages/product'


function App() {
  const [data, setData] = useState<DataTypes[]>([])
  const [loader, setLoader] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true)
      try {
        const data = await APIService.getAllProducts()
        if (data.length) {
          setData(data)
        }
        setLoader(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      <div className='md:pt-20 pt-45'>

        <Routes>
          <Route path='/' element={<Home data={data} loader={loader} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:id' element={<Product />} />
        </Routes>
      </div>
    </>
  )
}

export default App
