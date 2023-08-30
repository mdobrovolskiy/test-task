import { useState } from 'react'
import './Product.sass'
import DeleteModal from '../DeleteModal/DeleteModal'
const Product = ({ item }) => {
  const [modalOpened, setModalOpened] = useState(false)

  const startGuarantee = item.guarantee.start.split(',')[0]
  const endGuarantee = item.guarantee.end.split(',')[0]
  const formattedPrice = item.price[0].value.toLocaleString(undefined, {
    style: 'currency',
    currency: item.price[0].symbol,
  })
  const formattedSecondPrice = item.price[0].value.toLocaleString(undefined, {
    style: 'currency',
    currency: item.price[1].symbol,
  })
  return (
    <div className="product-wrapper">
      <div className="product-content">
        {modalOpened && (
          <DeleteModal
            item={item}
            type="product"
            setModalOpened={setModalOpened}
          />
        )}
        <div className="product-status"></div>
        <div className="product-photo">
          <img className="product-item-photo" src={item.photo} alt="" />
        </div>
        <div className="product-name" title={item.title}>
          {item.title}
        </div>
        <div className="product-date">
          <div>
            <span>с </span>
            {startGuarantee}
          </div>
          <div>
            <span>по</span> {endGuarantee}
          </div>
        </div>
        <div className="product-new">{item.isNew ? 'Новый' : 'Б/У'}</div>
        <div className="product-price" title={formattedPrice}>
          <div className="second-price">{formattedSecondPrice}</div>
          <div className="main-price">{formattedPrice}</div>
        </div>
        <div className="product-collection" title={item.type}>
          {item.type}
        </div>
        <div className="product-created" title={item.order}>
          Order number: {item.order}
        </div>
      </div>{' '}
      <div className="product-delete" onClick={() => setModalOpened(true)}>
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/glyph-neue/64/delete-forever.png"
          alt="filled-trash"
        />
      </div>
    </div>
  )
}

export default Product
