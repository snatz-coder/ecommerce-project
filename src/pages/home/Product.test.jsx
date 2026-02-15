import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Product } from "./Product";
import  axios  from 'axios';

describe("Product Component", () => {
vi.mock('axios');
let product;

let loadCart;

beforeEach(() => {
   product = {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
            stars: 4.5,
            count: 87,
        },
        priceCents: 1090,
        keywords: ["socks", "sports", "apparel"],
    };
   loadCart = vi.fn()
})

  it("should render Product", () => {
    render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("product-image")
    ).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );

    expect(screen.getByTestId('product-rating')).toHaveAttribute('src', `images/ratings/rating-${product.rating.stars * 10}.png`);

    expect(screen.getByText(`${product.rating.count}`)).toBeInTheDocument();
  });

  it('should add the product to cart', async () => {
    render(<Product product={product} loadCart={loadCart}/>);

    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId('add-to-cart-button');
    await user.click(addToCartButton);
    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1
    });
    expect(loadCart).toHaveBeenCalled();

  })
});

