import { useState } from 'react'
import './CollectionMiniItem.sass'
import DeleteModal from '../DeleteModal/DeleteModal'
const CollectionMiniItem = ({ item }) => {
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div className="col-mini-item">
      {modalOpened && (
        <DeleteModal
          item={item}
          type="product"
          setModalOpened={setModalOpened}
        />
      )}
      <div
        style={item.isNew ? {} : { backgroundColor: '#757575' }}
        className="col-item-status"
      ></div>
      <div className="col-item-photo">
        <img src={item.photo} alt="" />
      </div>
      <div className="col-item-name">
        <div>
          <span className="col-item-name-item">{item.title}</span>
        </div>
        <div className="col-item-name-additional">{item.serialNumber}</div>
      </div>
      <div
        style={item.isNew ? {} : { color: '#757575' }}
        className="col-item-status-name"
      >
        {item.isNew ? 'Новый' : 'Б/У'}
      </div>
      <div onClick={() => setModalOpened(true)} className="col-item-delete">
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/glyph-neue/64/delete-forever.png"
          alt="filled-trash"
        />
      </div>
    </div>
  )
}

export default CollectionMiniItem
