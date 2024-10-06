import React from 'react'
import './styles.scss'

interface ButtonCustomProps {
  label: string;
}

const ButtonCustom: React.FC<ButtonCustomProps> = (props) => {
    const { label, ...rest } = props
    
    return (
        <button type='submit' className='button-custom' {...rest}>
            {label}
        </button>
    )
}

export default ButtonCustom