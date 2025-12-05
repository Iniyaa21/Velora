import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { HomePage } from "./HomePage";
import { before } from "node:test";

vi.mock("axios");

describe("HomePage component", () => {
  let loadCart;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
              id: "aad29d11-ea98-41ee-9285-b916638cac4a",
              image: "images/products/round-sunglasses-gold.jpg",
              name: "Round Sunglasses",
              rating: {
                stars: 4.5,
                count: 30,
              },
              priceCents: 3560,
              keywords: ["accessories", "shades"],
            },
            {
              id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
              image: "images/products/blackout-curtain-set-beige.jpg",
              name: "Blackout Curtains Set - Beige",
              rating: {
                stars: 4.5,
                count: 232,
              },
              priceCents: 4599,
              keywords: ["bedroom", "curtains", "home"],
            },
          ],
        };
      }
    });
  });

  it("displays the products correctly", async () => {
    render(
      <MemoryRouter>
        <HomePage
          cart={[]}
          loadCart={loadCart}
        />
      </MemoryRouter>
    );

    const productContainers = await screen.findAllByTestId("product-container");

    expect(productContainers.length).toBe(2);

    expect(
      within(productContainers[0]).getByText("Round Sunglasses")
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText("Blackout Curtains Set - Beige")
    ).toBeInTheDocument();
  });

  it("adds product to cart correctly", async () => {
    render(
      <MemoryRouter>
        <HomePage
          cart={[]}
          loadCart={loadCart}
        />
      </MemoryRouter>
    );

    const productContainers = await screen.findAllByTestId("product-container");

    const quantitySelector1 = within(productContainers[0]).getByTestId(
      "quantity-selector"
    );
    await user.selectOptions(quantitySelector1, "2");

    const quantitySelector2 = within(productContainers[1]).getByTestId(
      "quantity-selector"
    );
    await user.selectOptions(quantitySelector2, "3");

    const addToCartButton1 = within(productContainers[0]).getByTestId(
      "add-to-cart-button"
    );
    await user.click(addToCartButton1);

    const addToCartButton2 = within(productContainers[1]).getByTestId(
      "add-to-cart-button"
    );
    await user.click(addToCartButton2);

    expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
      productId: "aad29d11-ea98-41ee-9285-b916638cac4a",
      quantity: 2,
    });

    expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
      productId: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
      quantity: 3,
    });

    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});
