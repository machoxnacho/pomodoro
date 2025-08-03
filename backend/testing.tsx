<div className="home-controls">
            <div className="coin-display">
              <img
              src={coinIcon}
              alt="Coin"
              className="coin-icon"
              onClick={() => setShowShopMenu(true)}
              style={{ cursor: 'pointer' }}
              />
              <span className="coint-count">{coins}</span>
            </div>
            <div>
            <button className='image-button' onClick={() => setShowCollectionMenu(true)}>
              <img src={menuIcon} alt="Menu" className='menu-icon' />
            </button>
            </div>
          </div>

.image-button {
  display: flex;
  align-items: center;
  gap: 6px;
  position: absolute;
  left: 1px; 
  top: 4px;
  font-weight: bold;
  font-size: 1.2rem;
  background: transparent;
  border: none;
}

.image-button:hover {
  transform: scale(1.1);
  cursor: pointer;
}
