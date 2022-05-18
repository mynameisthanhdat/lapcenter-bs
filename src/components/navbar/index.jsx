import React from 'react'
import './styles.scss'

export default function Navbar() {
  return (
    <div className='d-flex justify-content-between navbar-container'>
        <div className="logoIcon">
            <div className='text-danger'>Lapcenter</div>
        </div>
        <div className="mainMenu">
            <ul className='d-flex'>
                <li>TRANG CHỦ</li>
                <li>GIỚI THIỆU</li>
                <li>LIÊN HỆ</li>
                <li>ĐĂNG NHẬP</li>
            </ul>
        </div>
    </div>
  )
}
