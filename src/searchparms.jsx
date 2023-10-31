import { useEffect, useState } from "react";
import Res from "./result";
import { useQuery } from "@tanstack/react-query";
import usebreedlist from "./usebreedlist";
import fetchsearch from "./feachsearch";
import "./index.css";

const Search = () => {
  const branches = ["", "bird", "cat", "dog", "rabbit", "reptile"];
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = usebreedlist(animal);
  const [pet, setpet] = useState([]);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search_params ">
      <form
        className="flex flex-col justify-center rounded-xl bg-[#79AC78] w-[700px]  "
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="location">Location</label>
        <input
          className="w-[40%]"
          name="location"
          id="location"
          placeholder="location"
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
          <select id="breed" disabled={breeds.length === 0} name="breed">
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
