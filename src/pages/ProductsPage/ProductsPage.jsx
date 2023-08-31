import React, { useMemo } from 'react'
import './ProductsPage.sass'
import Product from '../../components/Product/Product'
import Loader from '../../components/Loader/Loader'
import { useState, useEffect } from 'react'
const api = process.env.REACT_APP_API
const ProductsPage = () => {
  const [category, setCategory] = useState('название-убыв')

  const [type, setType] = useState('')
  const [typeModalOpened, setTypeModalOpened] = useState()

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [popUpOpened, setPopUpOpened] = useState(false)
  const typeEndPoint = useMemo(() => {
    if (type === 'none') {
      return ''
    } else if (type === 'Headphones') {
      return '&type=headphones'
    } else if (type === 'Tablets') {
      return '&type=tablets'
    }
  }, [type])
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
  const selectType = (cat) => {
    setType(cat)
    setTypeModalOpened(false)
  }
  const getProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${api}/items${endPoint}${typeEndPoint}`)
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
  }, [endPoint, typeEndPoint])
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
        <div className="filter-wrapper">
          <button
            onClick={() => setTypeModalOpened((state) => !state)}
            className="products-filter"
          >
            {type}
            <img
              width="64"
              height="64"
              src="https://img.icons8.com/sf-black/64/FFFFFF/down.png"
              alt="down"
            />
          </button>
          {typeModalOpened && (
            <div className="popUp type">
              <div className="filter-item" onClick={() => selectType('none')}>
                none
              </div>
              <div
                className="filter-item"
                onClick={() => selectType('Headphones')}
              >
                Headphones
              </div>

              <div
                onClick={() => selectType('Tablets')}
                className="filter-item"
              >
                Tablets
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
