import { ProductQuantityAtLocationRepository } from "../repository";
import { GetProductQuantityAtLocationInputDataType } from "../type";
import { getProductQuantityAtLocationValidator } from "../validator";

export function getProductQuantityAtLocationController( repository: ProductQuantityAtLocationRepository ) {
  return async ( data: GetProductQuantityAtLocationInputDataType ) => {
    const validationError = getProductQuantityAtLocationValidator( data );
    if ( validationError !== null )
      return validationError;

    const result = await repository.getProductQuantityAtLocation( data );

    if ( result == -1 ) {
      return {
        error   : true,
        errorMsg: "invalid productId or storeLocationId supplied",
      };
    } else {
      return {
        amount: result,
        error: false,
      }
    }
  };
}
