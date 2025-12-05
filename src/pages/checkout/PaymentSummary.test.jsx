import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";

describe("PaymentSummary", () => {
  let paymentSummary;
  let loadCart;

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
});
