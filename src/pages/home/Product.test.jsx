import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Product } from "./Product";

vi.mock("axios");

describe("Product component", () => {
  let product;

  let loadCart;

  beforeEach(() => {
    product = {
      id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
      image: "images/products/women-sandal-heels-white-pink.jpg",
      name: "Women's Sandal Heels - Pink",
      rating: {
        stars: 4.5,
        count: 2286,
      },
      priceCents: 5300,
      keywords: ["womens", "shoes", "heels", "sandals"],
    };

    loadCart = vi.fn();
  });
  it("displays the product details correctly", () => {
    render(
      <Product
        product={product}
        loadCart={loadCart}
      />
    );

    expect(screen.getByText("Women's Sandal Heels - Pink")).toBeInTheDocument();
    expect(screen.getByText("$53.00")).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/women-sandal-heels-white-pink.jpg"
    );
    expect(screen.getByText("2286")).toBeInTheDocument();
    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      `images/ratings/rating-${product.rating.stars * 10}.png`
    );
  });

  it("adds a product to the cart", async () => {
    render(
      <Product
        product={product}
        loadCart={loadCart}
      />
    );

    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });

  it("selects a quantity properly", () => {
    render(
      <Product
        product={product}
        loadCart={loadCart}
      />
    );
    const quantitySelector = screen.getByTestId("quantity-selector");
    expect(quantitySelector).toHaveValue("1");
  });
});
