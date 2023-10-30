import { useQuery } from "@tanstack/react-query";
import BreedList from "./breedlist";

export default function useBreedList(animal) {
  const results = useQuery(["breeds", animal], BreedList);

  return [results?.data?.breeds ?? [], results.status];
}
