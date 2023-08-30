import React from 'react'
import './DeleteModal.sass'
const api = process.env.REACT_APP_API

const DeleteModal = ({ item, type, setModalOpened }) => {
  const deleteOrder = async () => {
    await fetch(`${api}/orders/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setModalOpened(false)
  }
  const deleteItem = async () => {
    await fetch(`${api}/items/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setModalOpened(false)
  }
  const handleRequest = () => {
    if (type === 'order') {
      deleteOrder()
    } else {
      deleteItem()
    }
  }
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div onClick={() => setModalOpened(false)} className="modal-close">
          <img
            src="https://img.icons8.com/ios-glyphs/30/737373/delete-sign.png"
            alt="delete-sign"
          />
        </div>
        <div className="top-modal">
          <h2>
            Вы уверены, что хотите удалить этот{' '}
            {type === 'order' ? 'приход' : 'продукт'}?
          </h2>
          {type === 'order' ? (
            <div className="selected-item">
              <div>{item.title}</div>
              <div>Количество {item.count}</div>
              <div>{item.date}</div>
              <div>{item.totalPrice} $</div>
            </div>
          ) : (
            <div className="selected-item">
              <div>{item.title}</div>
              <div>
                <img src={item.photo} alt="" />
              </div>
              <div>{item.serialNumber}</div>
              <div>{item.isNew ? 'Новый' : 'Б/У'}</div>
            </div>
          )}
        </div>

        <div className="bottom-modal">
          <div className="confirm">
            <div className="cancel">
              <button onClick={() => setModalOpened(false)}>Cancel</button>
            </div>
            <div className="confirm-item">
              <button onClick={handleRequest}>
                <img
                  src="https://img.icons8.com/ios-filled/50/FA5252/waste.png"
                  alt=""
                />{' '}
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
