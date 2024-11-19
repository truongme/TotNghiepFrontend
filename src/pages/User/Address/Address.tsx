import React from 'react'
import './styles.scss'
import { IoMdAdd } from "react-icons/io";

const Address = () => {
  return (
    <div className='address-container p-3'> 
      <div className='address-header'>
        <div>My Addresses</div>
        <button className='primary'>
          <IoMdAdd />
          Add New Address
        </button>
      </div>
      
      <hr />
    </div>
  )
}

export default Address