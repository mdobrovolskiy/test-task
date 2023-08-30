import React from 'react'
import './Order.sass'
import { useDispatch, useSelector } from 'react-redux'
import { handleCollection } from '../../redux/slices/collectionSlice'
import { useState } from 'react'
import DeleteModal from '../DeleteModal/DeleteModal'
const options = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}
const options2 = {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
}
const Order = ({ item, collectionOpened }) => {
  const [modalOpened, setModalOpened] = useState(false)
  const currentCollectionId = useSelector(
    (state) => state.collectionSlice.currentCollectionId
  )
  const dispatch = useDispatch()
  const mainTime = new Date(item.date).toLocaleString('ru-RU', options)
  const additionalTime = new Date(item.date).toLocaleString('ru-RU', options2)
  const handleCollectionSize = () => {
    if (!collectionOpened) {
      dispatch(
        handleCollection({
          opened: true,
          currentCollectionId: item.id,
        })
      )
    } else {
      dispatch(
        handleCollection({
          opened: true,
          currentCollectionId: item.id,
        })
      )
    }
  }
  const closeCollection = () => {
    dispatch(
      handleCollection({
        opened: false,
        currentCollectionId: null,
      })
    )
  }
  return (
    <div className="order-main">
      <div className="order-name">
        <span title={item.title}>{item.title}</span>
      </div>
      {modalOpened && (
        <DeleteModal item={item} type="order" setModalOpened={setModalOpened} />
      )}

      <div className="order-stats">
        <div className="order-count">
          <div className="order-toggle" onClick={handleCollectionSize}>
            <div className="btn-item">
              <div className="btn-dot"></div>
              <div className="btn-long-item"></div>
            </div>
            <div className="btn-item">
              <div className="btn-dot"></div>
              <div className="btn-long-item"></div>
            </div>
            <div className="btn-item">
              <div className="btn-dot"></div>
              <div className="btn-long-item"></div>
            </div>
          </div>
          <div className="order-count-info">
            <div className="order-count-quantity">{item.count}</div>
            <div className="order-count-items">Продукта</div>
          </div>
        </div>
        <div className="order-date">
          <div className="order-additional-time">{additionalTime}</div>
          <div>{mainTime}</div>
        </div>
        <div className="order-price">
          <div className="order-additional-price">{item.totalPrice} USD</div>
          <div>{item.totalPrice * 40} UAH</div>
        </div>
        <div className="order-delete">
          <img
            onClick={() => setModalOpened(true)}
            width="30"
            height="30"
            src="https://img.icons8.com/glyph-neue/64/delete-forever.png"
            alt="filled-trash"
          />
        </div>
      </div>
      <div
        onClick={closeCollection}
        style={
          collectionOpened && currentCollectionId === item.id
            ? {}
            : { visibility: 'hidden' }
        }
        className="order-current-item"
      >
        <img
          src="https://img.icons8.com/ios-filled/50/FFFFFF/chevron-right.png"
          alt=""
        />
      </div>
    </div>
  )
}

export default Order
