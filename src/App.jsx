import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { Routes, Route } from "react-router";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./App.css";

export function App() {
  return (
    <>
      <Routes>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path="checkout"
          element={<CheckoutPage />}
        />
        <Route
          path="orders"
          element={<OrdersPage />}
        />
        <Route
          path="tracking"
          element={<TrackingPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </>
  );
}

