import "./NotFoundPage.css";
import { Header } from "../components/Header";
import NotFoundIcon from "../assets/images/not-found.png";

export function NotFoundPage({ cart }) {
  return (
    <>
      <link
        rel="icon"
        type="image/png"
        href="/warning-favicon.png"
      />
      <title>404 Page not Found</title>
      <Header cart={cart}/>
      <div className="not-found-container">
        <div className="not-found-content">
          <img src={NotFoundIcon} alt="Page not found" className="not-found-image" />
          <p className="not-found-text">404 Page Not Found</p>
        </div>
      </div>
    </>
  );
}
