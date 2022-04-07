import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AuthContext from "../../../auth/authContext";
import LoginScreen from "../../../components/login/LoginScreen";
import types from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("test en <LoginScreen/>", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };
  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
  test("debe de hacer match with snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de realizar el dispathch y la navegacion", () => {
    const handleClick = wrapper.find("button").prop("onClick");
    handleClick();

    //dispatch(...{name:"Fernado"})
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: "Leonel",
      },
    });
    //mockNavigate = (/ , {replace: true})
    expect(mockNavigate).toHaveBeenCalledWith("/marvel", { replace: true });

    localStorage.setItem("lastPath", "/dc");

    handleClick();
    expect(mockNavigate).toHaveBeenCalledWith("/dc", {
      replace: true,
    });
  });
});
