import React from 'react';
import { useNavigate } from 'react-router-dom' 
import iconCart from '../../assets/imgs/shopping-cart.png'
import iconHistory from '../../assets/imgs/history.png'
import './styles.scss'

const MyCartIcon = () => {
  const navigate = useNavigate();
  return(
    <div>
      {/* MY CART ICON */}
      <div className='myCart' onClick={() => navigate('/myCarts')}>
        <img src={iconCart} alt='' width={32} height={32}/>
      </div>
      {/* MY HISTORY ICON */}
      <div className='myHistory' onClick={() => navigate('/myCarts')}>
        <img src={iconHistory} alt='' width={32} height={32}/>
      </div>
    </div>
  )
}

export default MyCartIcon