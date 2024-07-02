import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { ApplicationContext } from "../../providers/ApplicationProvider";

import "./UnlockFeatureModal.css"
import { Link } from "react-router-dom";

export default function UnlockFeatureModal({ show }) {
    const { setShowUnlockFeatureModal } = useContext(ApplicationContext)

    return (
        <>
            <Modal animation={show} className="UnlockFeatureModal" show={show} centered onHide={() => setShowUnlockFeatureModal(false)}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Login to unlock more features.</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div className="px-5 py-3 pb-2">
                        <h3 className="text-center mb-3">Unlock all features of transfer.zip</h3>
                        <div className="mb-4">
                            <ul className="text-body-secondary">
                                <li><b>Relay</b> - Use Quick Share even when peer-to-peer is blocked</li>
                                <li><b>Transfers</b> - Store files permanently and share them</li>
                                <li>Customize your transfers</li>
                                <li>Remove all ads</li>
                                <li><Link to={"/about"}>Much more...</Link></li>
                            </ul>
                        </div>
                        <div className="d-flex flex-row gap-2 justify-content-center">
                            <Link onClick={() => setShowUnlockFeatureModal(false)} to={"/signup"} className="btn btn-primary rounded-pill px-5">Sign up</Link>
                            <Link onClick={() => setShowUnlockFeatureModal(false)} to={"/login"} className="btn btn-outline-primary rounded-pill px-5">Login</Link>
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <button onClick={onCancel} className="btn btn-primary">Ok</button>
                </Modal.Footer> */}
            </Modal>
        </>

    )
}