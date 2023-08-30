import './App.css'
import Header from './components/Header/Header'
import NavigationMenu from './components/NavigationMenu/NavigationMenu'
import { Route, Routes } from 'react-router-dom'
import OrderPage from './pages/OrderPage/OrderPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
function App() {
  return (
    <div className="App">
      <Header />
      <NavigationMenu />
      <div className="container">
        <Routes>
          <Route path="/" element={<OrderPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
