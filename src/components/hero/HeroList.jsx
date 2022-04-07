import React, { useMemo } from "react";
import getHeroByPublisher from "../../helpers/getHeroByPublisher";
import HeroCard from "./HeroCard";

const HeroList = ({ publisher }) => {
  // console.log(publisher);
  const heroes = useMemo(() => getHeroByPublisher(publisher), [publisher]);
  // const heroes = getHeroByPublisher(publisher);

  return (
    <div className="animate__animated animate_fadeIn row rows-cols-2 row-cols-md-5 g-3">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};

export default HeroList;
