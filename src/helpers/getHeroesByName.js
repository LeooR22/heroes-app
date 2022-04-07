import { heroes } from "../data/heroes";

const getHeroesByName = (name = "") => {
  name = name.toLowerCase().trim();

  if (!name.trim()) {
    return [];
  }

  return heroes.filter((hero) => hero.superhero.toLowerCase().includes(name));
};

export default getHeroesByName;
