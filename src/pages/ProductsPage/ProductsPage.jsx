import React, { useMemo } from 'react'
import './ProductsPage.sass'
import Product from '../../components/Product/Product'
import Loader from '../../components/Loader/Loader'
import { useState, useEffect } from 'react'
const api = process.env.REACT_APP_API
const ProductsPage = () => {
  const [category, setCategory] = useState('название-убыв')
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [popUpOpened, setPopUpOpened] = useState(false)

  const endPoint = useMemo(() => {
    if (category === 'название-убыв') {
      return '?sortBy=title&order=desc'
    } else if (category === 'название-возр') {
      return '?sortBy=title&order=asc'
    } else if (category === 'дата-убыв') {
      return '?sortBy=date&order=desc'
    } else {
      return '?sortBy=date&order=asc'
    }
  }, [category])
  const selectFilter = (cat) => {
    setCategory(cat)
    setPopUpOpened(false)
  }
  const getProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${api}/items${endPoint}`)
      const json = await response.json()
      setProducts(json)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getProducts()
  }, [endPoint])
  return (
    <div className="products-wrapper">
      <div className="products-top">
        <h1>Продукты</h1>
        <div className="filter-wrapper">
          <button
            onClick={() => setPopUpOpened((state) => !state)}
            className="products-filter"
          >
            {category}
            <img
              width="64"
              height="64"
              src="https://img.icons8.com/sf-black/64/FFFFFF/down.png"
              alt="down"
            />
          </button>
          {popUpOpened && (
            <div className="popUp">
              <div
                className="filter-item"
                onClick={() => selectFilter('название-убыв')}
              >
                название-убыв
              </div>
              <div
                onClick={() => selectFilter('название-возр')}
                className="filter-item"
              >
                название-возр
              </div>

              <div
                onClick={() => selectFilter('дата-убыв')}
                className="filter-item"
              >
                дата-убыв
              </div>
              <div
                onClick={() => selectFilter('дата-возр')}
                className="filter-item"
              >
                дата-возр
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          products.map((item) => <Product key={item.id} item={item} />)
        )}
      </div>
    </div>
  )
}

export default ProductsPage
