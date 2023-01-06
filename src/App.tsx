import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Breed, BreedGroup } from "./types/Breed";
import { FetchState } from "./types/types";
import { Select } from "./Select";
import { getJson } from "./api";

const DEFAULT_BREED_COLOR = "#CCC";

const breedGroupColors: Record<BreedGroup, string> = {
  Toy: "#FBD960",
  Hound: "#AAE9A0",
  Terrier: "#99DAFF",
  Working: DEFAULT_BREED_COLOR,
  Mixed: DEFAULT_BREED_COLOR,
  "Non-Sporting": DEFAULT_BREED_COLOR,
  Sporting: DEFAULT_BREED_COLOR,
  Herding: DEFAULT_BREED_COLOR,
};

const useBreeds = (): { breeds: Breed[]; fetchState: FetchState } => {
  const [fetchState, setFetchState] = useState<FetchState>("INITIAL");
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const fetchBreeds = useCallback(async () => {
    try {
      setFetchState("FETCHING");
      const data = await getJson<Breed[]>("https://api.thedogapi.com/v1/breeds");
      setBreeds(data);
      setFetchState("FETCHED");
    } catch (e) {
      setFetchState("ERROR");
    }
  }, []);

  useEffect(() => {
    fetchBreeds();
  }, []);

  return { breeds, fetchState };
};

interface ItemProps {
  breed: Breed;
}

const BreedItem = ({ breed }: ItemProps) => {
  return (
    <div className="breed">
      <div
        className="breed__icon"
        style={{
          background: breed.breed_group ? breedGroupColors[breed.breed_group] : DEFAULT_BREED_COLOR,
        }}></div>
      <div className="breed__text">
        <strong className="breed__name">{breed.name}</strong>
        <span className="breed__temperament">{breed.temperament}</span>
      </div>
    </div>
  );
};

function App() {
  const [value, setValue] = useState<Breed | undefined>(undefined);
  const { breeds, fetchState } = useBreeds();

  const sortedBreeds = useMemo(() => {
    return [...breeds].sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
  }, [breeds]);

  return (
    <div className="app">
      {fetchState === "INITIAL" || fetchState === "FETCHING" ? (
        <span>Vent litt...</span>
      ) : fetchState === "ERROR" ? (
        <span>Det oppstod en feil...</span>
      ) : (
        <Select
          value={value?.name}
          items={sortedBreeds}
          onChange={setValue}
          id="breeds"
          label="Hunderase"
          placeholder="Velg hunderase"
          renderItem={(breed: Breed) => <BreedItem key={breed.id} breed={breed} />}
        />
      )}
    </div>
  );
}

export default App;
