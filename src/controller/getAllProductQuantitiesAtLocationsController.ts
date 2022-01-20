import { ProductQuantityAtLocationRepository } from "../repository";

export function getAllProductQuantitiesAtLocationsController( repository: ProductQuantityAtLocationRepository ) {
  return async () => {
    const result = await repository.getAllProductQuantitiesAtLocations();
    return result;
  };
}
