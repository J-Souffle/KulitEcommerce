import "./FooterCheckout.css";
import { useState } from "react";

function FooterCheckout() {
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return (
    <>
      <footer>
        <div className="footer-links">
          <button onClick={() => handleOpenModal("Refund Policy: Coming Soon!")}>Refund Policy</button>
          <button onClick={() => handleOpenModal("Privacy Policy: Coming Soon!")}>Privacy Policy</button>
          <button onClick={() => handleOpenModal("Terms Of Service: Coming Soon!")}>Terms Of Service</button>
        </div>
        {/* <div className="footer-social-media">
          <a href="https://www.instagram.com/kulitapparel?igsh=MWZ4YWI1cTljZmNteg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <IconBrandInstagram />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <IconBrandFacebook />
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <IconBrandTiktok />
          </a>
        </div> */}
        <div className="footer-info">
          <p>All Rights Reserved © 2024 Kulit</p>
        </div>
      </footer>

      {isModalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <div className="p-content">
              <p>{modalContent}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FooterCheckout;
