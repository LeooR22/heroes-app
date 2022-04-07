import { MemoryRouter, Route, Routes } from "react-router-dom";
import { mount } from "enzyme";
import HeroScreen from "../../../components/hero/HeroScreen";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("pruebas en <HeroScreen/>", () => {
  test("no debe de mostrar el heroScreen si no hay un heroe el URL", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <Routes>
          <Route path="/hero" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    // console.log(wrapper.html());

    expect(wrapper.find("h1").text().trim()).toBe("No hero page");
  });

  test("debe de mostrar un heroe si el parametro existe y lo encuentra", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:heroeId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    console.log(wrapper.html());

    expect(wrapper.find(".row").exists()).toBe(true);
  });

  test("debe de regresar a la pantalla anterior", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:heroeId" element={<HeroScreen />} />
        </Routes>
      </MemoryRouter>
    );

    wrapper.find("button").prop("onClick")();

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("debe de mostrar el No hero page si no tenemos u heroe", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider123123123"]}>
        <Routes>
          <Route path="/hero/:heroeId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    console.log(wrapper.html());

    expect(wrapper.find("h1").text().trim()).toBe("No hero page");
  });
});
