import React, { useState } from 'react'
import './MiniCollection.sass'
import CollectionMiniItem from '../CollectionMiniItem/CollectionMiniItem'
import { useDispatch, useSelector } from 'react-redux'
import { handleCollection } from '../../redux/slices/collectionSlice'
import { useEffect } from 'react'
import Loader from '../Loader/Loader'
const api = process.env.REACT_APP_API
const MiniCollection = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const currentCollectionId = useSelector(
    (state) => state.collectionSlice.currentCollectionId
  )
  const handleCloseCollection = () => {
    dispatch(handleCollection({ opened: false, currentCollectionId: null }))
  }
  const getCollectionData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${api}/items?order=${currentCollectionId}`)
      const json = await response.json()
      const filteredResult = json.filter(
        (item) => item.order === currentCollectionId // mockAPI filter setting didnt work for some reason
      )
      setProducts(filteredResult)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getCollectionData()
  }, [currentCollectionId])
  useEffect(() => {}, [])
  if (isLoading) {
    return (
      <div className="mini-main">
        <Loader />
      </div>
    )
  }
  return (
    <div className="mini-main">
      <div onClick={handleCloseCollection} className="mini-close">
        <img
          src="https://img.icons8.com/ios-glyphs/30/737373/delete-sign.png"
          alt="delete-sign"
        />
      </div>
      <div className="mini-wrapper">
        <div className="mini-order-title">
          <span>ITEM NAME</span>
        </div>
        <div className="mini-add">Add product</div>
      </div>
      <div className="mini-wrapper-products">
        {products.map((item) => (
          <CollectionMiniItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default MiniCollection
