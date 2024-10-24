import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Login from './Login';
import auth from '../auth/auth';

const Header = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const loginCheck = () => {
        if (auth.loggedIn()) {
            setLoggedIn(true);
        }
    };

    useEffect(() => {
        console.log(loggedIn);
        loginCheck();
    }, [])


    const openModal = () => {
        setModalVisible(true); // Open modal
    };

    const closeModal = () => {
        setModalVisible(false); // Close modal
    };
    return (
        <>
            <header className="column align-center">
                <h1>
                    <span>dic</span>
                    <span>•</span>
                    <span>tion</span>
                    <span>•</span>
                    <span>ar</span>
                    <span>•</span>
                    <span>y</span>
                    <span style={{ fontStyle: 'italic', fontSize: '32px', marginLeft: '2px' }}>DASH</span>
                </h1>

                {
                    !loggedIn ? (
                        <div>

                        <button 
                        id='modalBUtotn'
                        onClick={openModal}
                        >
                            Login
                        </button>
                        {modalVisible && ( // Conditional rendering of the modal
                                <div className="modal">
                                    <div className="modal-content">
                                        <span className="close" onClick={closeModal}>&times;</span> {/* Close button */}
                                        <Login />
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <li className='nav-item'>
                            <button type='button' onClick={() => {
                                auth.logout();
                            }}>Logout</button>
                        </li>
                    )
                }
            </header>

        </>
    )
}

export default Header;