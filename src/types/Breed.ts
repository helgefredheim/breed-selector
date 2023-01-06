export type BreedGroup =
  | "Toy"
  | "Hound"
  | "Terrier"
  | "Working"
  | "Mixed"
  | "Non-Sporting"
  | "Sporting"
  | "Herding";

export interface Breed {
  weight: { imperial: string; metric: string };
  height: { imperial: string; metric: string };
  id: number;
  name: string;
  bred_for: string;
  breed_group?: BreedGroup;
  life_span: string;
  temperament: string;
  origin: string;
  reference_image_id: string;
  image: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
}
