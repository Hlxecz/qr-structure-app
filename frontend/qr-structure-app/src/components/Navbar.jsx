import { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar() {
  useEffect(() => {
    const navbarShrink = () => {
      const navbar = document.body.querySelector("#mainNav");
      if (!navbar) return;
      if (window.scrollY === 0) {
        navbar.classList.remove("navbar-shrink");
      } else {
        navbar.classList.add("navbar-shrink");
      }
    };

    navbarShrink();
    document.addEventListener("scroll", navbarShrink);

    const navbarToggler = document.querySelector(".navbar-toggler");
    const responsiveNavItems = document.querySelectorAll(
      "#navbarResponsive .nav-link"
    );

    responsiveNavItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (
          window.getComputedStyle(navbarToggler).display !== "none" &&
          navbarToggler.classList.contains("collapsed") === false
        ) {
          navbarToggler.click();
        }
      });
    });

    return () => {
      document.removeEventListener("scroll", navbarShrink);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" to="/qr">Architen</Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          메뉴 <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="#page-top">소개</a></li>
            <li className="nav-item"><a className="nav-link" href="#write-section">답변하기</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">연락처</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
