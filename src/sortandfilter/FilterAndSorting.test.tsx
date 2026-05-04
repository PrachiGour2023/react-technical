import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import FilterAndSorting from "./FilterAndSorting";

describe("FilterAndSorting Component", () => {
  const mockProducts = [
    {
      id: 1,
      title: "Essence Mascara Lash Princess",
      price: 9.99,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      category: "beauty",
      availabilityStatus: "In Stock",
    },
    {
      id: 2,
      title: "iPhone 15",
      price: 999,
      thumbnail: "iphone.jpg",
      category: "smartphones",
      availabilityStatus: "Low Stock",
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      // Initial API
      if (
        url ===
        "https://dummyjson.com/products?limit=0"
      ) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              products: mockProducts,
            }),
        } as Response);
      }

      // Filtered API
      if (
        url ===
        "https://dummyjson.com/products?limit=0&sortBy=price&order=desc"
      ) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              products: [
                mockProducts[1],
                mockProducts[0],
              ],
            }),
        } as Response);
      }

      return Promise.reject(
        new Error("Invalid API")
      );
    }) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders heading", () => {
    render(<FilterAndSorting />);

    expect(
      screen.getByText("Product List")
    ).toBeInTheDocument();
  });

  test("fetches and renders products", async () => {
    render(<FilterAndSorting />);

    expect(
      await screen.findByText(
        "Essence Mascara Lash Princess"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("iPhone 15")
    ).toBeInTheDocument();

    expect(
      screen.getByText("beauty")
    ).toBeInTheDocument();

    expect(
      screen.getByText("smartphones")
    ).toBeInTheDocument();
  });

  test("renders product prices", async () => {
    render(<FilterAndSorting />);

    expect(
      await screen.findByText("$9.99")
    ).toBeInTheDocument();

    expect(
      screen.getByText("$999")
    ).toBeInTheDocument();
  });

  test("renders stock status", async () => {
    render(<FilterAndSorting />);

    expect(
      await screen.findByText("In Stock")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Low Stock")
    ).toBeInTheDocument();
  });

  test("renders product images", async () => {
    render(<FilterAndSorting />);

    const images =
      await screen.findAllByRole("img");

    expect(images).toHaveLength(2);

    expect(images[0]).toHaveAttribute(
      "src",
      mockProducts[0].thumbnail
    );
  });

  test("renders filter dropdowns", () => {
    render(<FilterAndSorting />);

    const selects =
      screen.getAllByRole("combobox");

    expect(selects).toHaveLength(2);
  });

  test("changes sortBy dropdown value", async () => {
    render(<FilterAndSorting />);

    const sortBySelect =
      screen.getAllByRole("combobox")[0];

    await userEvent.selectOptions(
      sortBySelect,
      "price"
    );

    expect(sortBySelect).toHaveValue(
      "price"
    );
  });

  test("changes sortOrder dropdown value", async () => {
    render(<FilterAndSorting />);

    const sortOrderSelect =
      screen.getAllByRole("combobox")[1];

    await userEvent.selectOptions(
      sortOrderSelect,
      "desc"
    );

    expect(sortOrderSelect).toHaveValue(
      "desc"
    );
  });

  test("renders apply filter button", () => {
    render(<FilterAndSorting />);

    expect(
      screen.getByRole("button", {
        name: /apply filter/i,
      })
    ).toBeInTheDocument();
  });

  test("calls filtered API on apply filter click", async () => {
    render(<FilterAndSorting />);

    await screen.findByText(
      "Essence Mascara Lash Princess"
    );

    const sortBySelect =
      screen.getAllByRole("combobox")[0];

    const sortOrderSelect =
      screen.getAllByRole("combobox")[1];

    await userEvent.selectOptions(
      sortBySelect,
      "price"
    );

    await userEvent.selectOptions(
      sortOrderSelect,
      "desc"
    );

    const button =
      screen.getByRole("button", {
        name: /apply filter/i,
      });

    await userEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products?limit=0&sortBy=price&order=desc"
      );
    });
  });

  test("handles API failure gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error("API Failed")
    );

    const consoleSpy = jest.spyOn(
      console,
      "log"
    );

    render(<FilterAndSorting />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});