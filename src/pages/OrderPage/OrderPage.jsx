import React from 'react'
import './OrderPage.sass'
import Order from '../../components/Order/Order'
import { useState } from 'react'
import { useEffect } from 'react'
import Loader from '../../components/Loader/Loader'
import { useSelector } from 'react-redux'
import MiniCollection from '../../components/MiniCollection/MiniCollection'
const api = process.env.REACT_APP_API
const OrderPage = () => {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const collectionOpened = useSelector(
    (s) => s.collectionSlice.collectionOpened
  )

  const getOrdersData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${api}/orders`)
      const json = await response.json()
      setOrders(json)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getOrdersData()
  }, [])
  return (
    <div className="order-container">
      <div
        className={`order-wrapper ${
          collectionOpened ? 'collectionOpened' : ''
        }`}
      >
        <div>
          <h1>Приходы</h1>
        </div>
        <div className="order-main-wrapper">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="item-wrapper">
              {orders.map((item) => (
                <Order
                  key={item.id}
                  item={item}
                  collectionOpened={collectionOpened}
                />
              ))}
            </div>
          )}
          {collectionOpened && <MiniCollection />}
        </div>
      </div>
    </div>
  )
}

export default OrderPage
