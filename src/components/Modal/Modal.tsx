import React, { useEffect, useState } from 'react'
import './styles.scss'
import { FaXmark } from "react-icons/fa6";

interface ModalMainProps {
    onClose?: () => void;
    title: string;
    content: any;
    btn1?: string;
    btn2?: string;
    onSave?: () => void;
}

const ModalMain: React.FC<ModalMainProps> = ({title, content,btn1,btn2,onClose, onSave }) => {

    return (
        <div className='modal-container'>
            <div className='modal-box-small'>
                <div className='modal-header'>
                    <div className='modal-title'>{title}</div>
                    <div onClick={onClose}><FaXmark /></div>
                </div>
                <div className='modal-body'>
                    {content}
                </div>
                <div className='modal-footer'>
                    {btn1 && (
                        <button className='delete' onClick={onClose}>{btn1}</button>
                    )}
                    {btn2 && (
                        <button className='edit' onClick={onSave}>{btn2}</button>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default ModalMain