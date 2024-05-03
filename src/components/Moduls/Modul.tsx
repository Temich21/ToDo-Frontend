import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

interface ParticipantsModalProps {
    children: React.ReactNode
    onClose: () => void
}

const ParticipantsModal = ({ children, onClose }: ParticipantsModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = (e: React.MouseEvent) => {
        if (modalRef.current && modalRef.current === e.target) {
            onClose()
        }
    }

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='mt-10 flex flex-col gap-2 w-[95%] lg:w-full lg:max-w-[40rem]'>
                <motion.button
                    whileHover={{
                        rotate: '180deg'
                    }}
                    initial={{
                        rotate: '0deg'
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                    }}
                    className='place-self-end'
                    onClick={onClose}
                >
                    <FontAwesomeIcon className="w-8 h-8" icon={faXmark} />
                </motion.button>
                <div className='bg-white p-3'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ParticipantsModal