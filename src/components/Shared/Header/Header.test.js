// import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import Header from "./Header";

describe("Header Component Tests", () => {
  // test("renders learn react link", () => {
  //   render(<App />);
  //   const linkElement = screen.getByText(/learn react/i);
  //   expect(linkElement).toBeInTheDocument();
  // });

  test("Header renders without crashing", () => {
    shallow(
      <Router>
        <Header />
      </Router>
    );
  });

  //   test("Renders Header", () => {
  //     const wrapper = shallow(
  //       <Router>
  //         <Header />
  //       </Router>
  //     );
  //     alert(wrapper.text());
  //     expect(wrapper.find("h1").text()).toEqual("Digital Trial Engagement");
  //     // expect(titleValue).toBeInTheDocument();
  //     // expect(wrapper.contains(welcome)).toEqual(true);
  //   });
});
