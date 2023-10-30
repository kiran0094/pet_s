import Pet from "./pet";

const Results = ({ pet }) => {
  console.log(pet);
  return (
    <div className="search">
      {!pet.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pet.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
