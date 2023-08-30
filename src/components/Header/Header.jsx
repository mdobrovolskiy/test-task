import React from 'react'
import './Header.sass'
const Header = () => {
  return (
    <div className="header-main">
      <div className="header-item">
        <div className="logo">
          <div>
            <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="" />
          </div>
          <div className="logo-text">INVENTORY</div>
        </div>
        <div className="search">
          <input type="text" placeholder="Поиск" />
        </div>
      </div>
      <div className="profileDate">
        <div className="current-day">Today</div>
        <div className="current-date">12 MAR, 2017, 17:20</div>
      </div>
    </div>
  )
}

export default Header
