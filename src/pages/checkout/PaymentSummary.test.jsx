import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";

vi.mock("axios");

describe("PaymentSummary", () => {
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(async () => {
    paymentSummary = {
      totalItems: 3,
      productCostCents: 9833,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 10332,
      taxCents: 1033,
      totalCostCents: 11365,
    };

    loadCart = vi.fn();

    user = userEvent.setup();
  });

  it("displays payment amount correctly", () => {
    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Items (3):")).toBeInTheDocument();
    expect(screen.getByText("Shipping & handling:")).toBeInTheDocument();
    expect(screen.getByText("Total before tax:")).toBeInTheDocument();
    expect(screen.getByText("Estimated tax (10%):")).toBeInTheDocument();
    expect(screen.getByText("Order total:")).toBeInTheDocument();

    expect(
      screen.getByTestId("payment-summary-product-cost")
    ).toHaveTextContent("$98.33");
    expect(
      screen.getByTestId("payment-summary-shipping-cost")
    ).toHaveTextContent("$4.99");
    expect(
      screen.getByTestId("payment-summary-total-before-tax")
    ).toHaveTextContent("$103.32");
    expect(
      screen.getByTestId("payment-summary-tax")
    ).toHaveTextContent("$10.33");
    expect(
      screen.getByTestId("payment-summary-total")
    ).toHaveTextContent("$113.65");
  });

  it("places an order", async () => {
    function Location() {
        const location = useLocation(); 
        return <div data-testid="url-path">{location.pathname}</div>
    }
    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart}
        />
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId("place-order-button"); 
    await user.click(placeOrderButton); 

    expect(axios.post).toHaveBeenCalledWith("/api/orders"); 
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId("url-path")).toHaveTextContent("/orders");
  });
});
