import "./Footer.css";
import { IconBrandInstagram, IconBrandFacebook, IconBrandTiktok } from "@tabler/icons-react";

function Footer() {
  return (
    <>
      <footer>
        <div className="footer-links">
          <button onClick={() => window.location.href = "#"}>About</button>
          <button onClick={() => window.location.href = "#"}>FAQs</button>
          <button onClick={() => window.location.href = "#"}>News</button>
          <button onClick={() => window.location.href = "#"}>Terms Of Service</button>
        </div>
        <div className="footer-social-media">
          <a href="https://www.instagram.com/kulitapparel?igsh=MWZ4YWI1cTljZmNteg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <IconBrandInstagram />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <IconBrandFacebook />
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <IconBrandTiktok />
          </a>
        </div>
        <div className="footer-info">
          <p>All Rights Reserved © 2024 Kulit</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
