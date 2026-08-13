import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import App from "../App";
import userEvent from "@testing-library/user-event";

vi.mock("axios"); 
// real axios use nahi kr rhe, use a fake axios key instead

describe("App", () => {
  it("displays photos returned by the API", async () => {

    axios.get.mockResolvedValue({
      data: [
        {
          author: "Alice",
          download_url: "https://example.com/alice.jpg",
          url: "https://example.com/alice"
        },
        {
          author: "Bob",
          download_url: "https://example.com/bob.jpg",
          url: "https://example.com/bob"
        }
      ]
    });

    render(<App />);
    // app ko fake browser me daal rahe hai

    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows an error message when the API fails", async () => {
  axios.get.mockRejectedValue(new Error("API failed"));

  render(<App />);

  expect(await screen.findByText("Failed to load photos")).toBeInTheDocument();
});

it("moves to the next page when Next is clicked", async () => {
  axios.get.mockResolvedValue({
    data: [],
  });

  const user = userEvent.setup();

  render(<App />);

  const nextButton = screen.getByRole("button", { name: "Next" });

  expect(screen.getByText("Page 1")).toBeInTheDocument();

  await user.click(nextButton);

  expect(screen.getByText("Page 2")).toBeInTheDocument();
});

it("does not go below page 1 when Prev is clicked", async () => {
  axios.get.mockResolvedValue({
    data: [],
  });

  const user = userEvent.setup();

  render(<App />);

  const prevButton = screen.getByRole("button", { name: "Prev" });

  expect(screen.getByText("Page 1")).toBeInTheDocument();

  await user.click(prevButton);

  expect(screen.getByText("Page 1")).toBeInTheDocument();
});

it("requests the correct API page after clicking Next", async () => {
  axios.get.mockResolvedValue({
    data: [],
  });

  const user = userEvent.setup();

  render(<App />);

  const nextButton = screen.getByRole("button", { name: "Next" });

  await user.click(nextButton);

  expect(axios.get).toHaveBeenCalledWith(
    "https://picsum.photos/v2/list?page=2&limit=18"
  );
});
});