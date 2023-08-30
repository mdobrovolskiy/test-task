import React from 'react'
import './NavigationMenu.sass'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const NavigationMenu = () => {
  const location = useLocation()
  console.log(location.pathname === 'products')
  return (
    <div className="menu">
      <div className="avatar">
        <div className="avatar-item">
          <img
            src="https://media.istockphoto.com/id/500520915/photo/handsome-young-man-with-beard-smiling.jpg?s=170667a&w=0&k=20&c=EM7Ep7axpuuW24cqJwjm-ZKkV-5RrAb4fpHU81T3RQE="
            alt=""
          />
          <div className="avatar-settings">
            <img
              src="https://img.icons8.com/fluency-systems-filled/48/settings.png"
              alt="settings"
            />
          </div>
        </div>
      </div>
      <div
        className={`nav-item ${
          location.pathname === '/' ? 'active-section' : ''
        }`}
      >
        <Link to={'/'}>ЗАКАЗЫ</Link>
      </div>
      <div
        className={`nav-item ${
          location.pathname === '/products' ? 'active-section' : ''
        }`}
      >
        <Link to={'/products'}>ПРОДУКТЫ</Link>
      </div>
      <div className="nav-item">ГРУППЫ</div>

      <div className="nav-item">ПОЛЬЗОВАТЕЛИ</div>
      <div className="nav-item">НАСТРОЙКИ</div>
    </div>
  )
}

export default NavigationMenu
