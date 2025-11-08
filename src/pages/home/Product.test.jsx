import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Product } from "./Product";

describe("Product component", () => {
  it("displays the product details correctly", () => {
    const product = {
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

    //Creating a mock function
    const loadCart = vi.fn();

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
});
