"use client";
import Modal from "@/modals/Modal";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const ModalContext = React.createContext<null | {
    setModal: (modal: React.ReactNode) => void;
    closeModal: () => void;
}>(null);

export const useModal = () => {
    const context = React.useContext(ModalContext);
    if(!context) throw new Error('useModal must be used within a ModalProvider');

    return context;
}

export default function ModalProvider({ children }: {
    children: React.ReactNode;
}) {
    const [modal, setModal] = useState<null | React.ReactNode>(null);;

    const _setModal = (modal: React.ReactNode) => {
        setModal(modal);
        document.body.style.overflow = 'hidden';
    }
    const closeModal = () => {
        setModal(null);
        document.body.style.overflow = '';
    }

    const value = {
        setModal: _setModal,
        closeModal,
    };
    return(
        <ModalContext.Provider value={value}>
            {children}

            <div className="flex items-center justify-center z-50 fixed top-0 left-0 w-full h-full pointer-events-none">
                <AnimatePresence>
                    {modal && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ bounce: false, duration: .2 }}
                            className="bg-black/60 absolute top-0 left-0 w-full h-full pointer-events-auto"
                            onClick={closeModal}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {modal && (
                        <motion.div
                            initial={{ opacity: 0, scale: .8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: .8 }}
                            transition={{ bounce: false, duration: .2 }}
                            className="w-modal max-w-full pointer-events-auto"
                        >
                            <Modal>
                                {modal}
                            </Modal>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ModalContext.Provider>
    )
}