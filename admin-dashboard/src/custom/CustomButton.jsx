import React from 'react'

const CustomButton = ({title, variant, type, disabled = false, onClick, customStyle}) => {
  return (
    <button type={type} className={`${variant} ${customStyle}`} disabled={disabled} onClick={onClick}>{title}</button>
  )
}

export default CustomButton