import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { Routes, Route } from "react-router";
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
      </Routes>
    </>
  );
}

