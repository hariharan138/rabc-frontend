import React, { useState, useEffect } from 'react'
import { Plus, Minus, HandHeart, SendHorizontal, LogOut, Search } from 'lucide-react'

import './User.css'

const Users = () => {
  const [count, setCount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isVeg, setIsVeg] = useState(true)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filterText, setFilterText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [filterText, products])

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setError(error.message)
      setIsLoading(false)
    }
  }

  const filterProducts = () => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(filterText.toLowerCase()) ||
      product.category.toLowerCase().includes(filterText.toLowerCase())
    )
    setFilteredProducts(filtered)
  }

  const incrementCount = () => {
    setCount(prevCount => prevCount + quantity)
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10)
    setQuantity(isNaN(value) ? 0 : value)
  }

  const toggleVeg = () => {
    setIsVeg(prev => !prev)
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        <div className="header-actions">
          <input type="search" placeholder="Search Trust..." className="search-input" />
          <button className="logout-button">Logout<LogOut className="button-icon" /></button>
        </div>
      </header>
          
      <main className="dashboard-content">
        <div className="card-grid">
          <div className="card">
            <div className="card-header">
              <h2>Total Trust</h2>
              <HandHeart className="card-icon" />
            </div>
            <div className="card-content">
              <div className="card-value">{count}</div>
              <p className="card-subtext">Active Trust in the system</p>
            </div>
            <div className="quantity-control">
              <label htmlFor="quantity" className="quantity-label">Quantity:</label>
              <div className="quantity-input-wrapper">
                <button className="quantity-button" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
                  <Minus className="button-icon" />
                </button>
                <input
                  type="number"
                  id="quantity"
                  className="quantity-input"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button className="quantity-button" onClick={() => setQuantity(prev => prev + 1)}>
                  <Plus className="button-icon" />
                </button>
              </div>
            </div>
            <div className="toggle-control">
              <label htmlFor="veg-toggle" className="toggle-label">
                {isVeg ? 'Veg' : 'Non-veg'}
                <div className={`toggle-switch ${isVeg ? 'veg' : 'non-veg'}`} onClick={toggleVeg}>
                  <input
                    type="checkbox"
                    id="veg-toggle"
                    checked={isVeg}
                    onChange={toggleVeg}
                    className="toggle-input"
                  />
                  <button className="toggle-slider">Switch</button>
                </div>
              </label>
            </div>
            <button className="increment-button" onClick={incrementCount}>
              Send Food Availability
              <SendHorizontal className="button-icon" />
            </button>
          </div>

          <div className="card products-card">
            <div className="card-header">
              <h2>Products</h2>
              <Search className="card-icon" />
            </div>
            <div className="card-content">
              <input
                type="text"
                placeholder="Filter products by name or category..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="filter-input"
              />
              {isLoading && <p>Loading products...</p>}
              {error && <p className="error-message">Error: {error}</p>}
              {!isLoading && !error && (
                <div className="products-list">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="product-item">
                      <img src={product.image} alt={product.title} className="product-image" />
                      <div className="product-details">
                        <h3>{product.title}</h3>
                        <p>${product.price.toFixed(2)}</p>
                        <p className="product-category">{product.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Users

