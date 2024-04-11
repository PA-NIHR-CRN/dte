import { renderHook } from "./test-utils";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("ScrollToTop", () => {
  it("scrolls to top when pathname changes", () => {
    const scrollToSpy = jest
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/old-path" });

    const { rerender } = renderHook(() => ScrollToTop());

    (useLocation as jest.Mock).mockReturnValue({ pathname: "/new-path" });
    rerender();

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });

  it("does not scroll to top when pathname remains the same", () => {
    const scrollToSpy = jest
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/same-path" });

    const { rerender } = renderHook(() => ScrollToTop());

    (useLocation as jest.Mock).mockReturnValue({ pathname: "/same-path" });
    rerender();

    scrollToSpy.mockReset();

    rerender();

    expect(scrollToSpy).not.toHaveBeenCalled();
  });
});
