import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

import HeroCard from "../hero/HeroCard";
import { useForm } from "../../hooks/useForm";
import getHeroesByName from "../../helpers/getHeroesByName";

const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);

  // console.log(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = formValues;

  // const heroesFilter = getHeroesByName(q);
  const heroesFilter = useMemo(() => getHeroesByName(q), [q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Busquedas</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="form-control"
              autoComplete="off"
              type="text"
              placeholder="Buscar un heroe"
              name="searchText"
              value={searchText}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-outline-primary mt-3 w-100"
              type="submit"
            >
              Buscar...
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Resultados</h4>
          <hr />

          {q === "" ? (
            <div className="alert alert-info">Buscar un heroe</div>
          ) : (
            heroesFilter.length === 0 && (
              <div className="alert alert-danger">No hay resultados: {q}</div>
            )
          )}

          {heroesFilter.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchScreen;
