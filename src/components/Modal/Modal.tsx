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
                    <div onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.93942 10.3536L3.29297 16L4.00008 16.7071L9.64652 11.0607L15.293 16.7071L16.0001 16L10.3536 10.3536L16.0001 4.70711L15.293 4L9.64652 9.64645L4.00008 4L3.29297 4.70711L8.93942 10.3536Z" fill="#222222"></path>
                        </svg>
                    </div>
                </div>
                <div className='modal-body'>
                    {content}
                </div>
                <div className='modal-footer'>
                    {btn1 && (
                        <div>
                            <button className='btn-secondary' onClick={onClose}>{btn1}</button>
                        </div>
                        
                    )}
                    {btn2 && (
                        <div>
                            <button className='btn-primary' onClick={onSave}>{btn2}</button>
                        </div>
                        
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default ModalMain