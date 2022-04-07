import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import SearchScreen from "../../../components/search/SearchScreen";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("pruebas en <SearchScreen/>", () => {
  test("debe de renderizarse el componente", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchScreen />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Buscar un heroe");
  });

  test('debe de mostrar a batman y el input con el valor del queryString"', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchScreen />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("input").prop("value")).toBe("batman");
  });

  test("debe de mostrar un error si no se encuentra el hero", () => {
    const q = "batman123";

    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${q}`]}>
        <SearchScreen />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("input").prop("value")).toBe(q);
    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      `No hay resultados: ${q}`
    );

    //No hay resultado batman123
  });

  test("debe de llamar el navigate a la nueva pantalla", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search`]}>
        <SearchScreen />
      </MemoryRouter>
    );

    wrapper.find("input").simulate("change", {
      target: {
        name: "searchText",
        value: "batman",
      },
    });

    wrapper.find("form").prop("onSubmit")({
      preventDefault: () => {},
    });

    expect(mockNavigate).toHaveBeenCalledWith("?q=batman");
  });
});
