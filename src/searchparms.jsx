import { useEffect, useState } from "react";
import Res from "./result";
import usebreedlist from "./usebreedlist";
import "./index.css";

const Search = () => {
  const branches = ["", "bird", "cat", "dog", "rabbit", "reptile"];

  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds] = usebreedlist(animal);
  const [pet, setpet] = useState([]);

  useEffect(() => {
    requestPets();
  }, [animal, breed]);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
    );
    const json = await res.json();
    setpet(json.pets);
  }

  return (
    <div className="search_params ">
      <form
        className="flex flex-col justify-center rounded-xl bg-[#79AC78] w-[700px]  "
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">Location</label>
        <input
          className="w-[40%]"
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />

        <label htmlFor="animal">
          Animal
          <select
            id="branch"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={breeds.length === 0}
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
          >
            {breeds.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
      {console.log(pet)}
      <Res pet={pet} />
    </div>
  );
};

export default Search;
