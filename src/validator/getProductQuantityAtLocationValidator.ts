import { GetProductQuantityAtLocationInputDataType } from "../type";

export function getProductQuantityAtLocationValidator( data: GetProductQuantityAtLocationInputDataType ) {
  if ( !data ) {
    return {
      error   : true,
      errorMsg: "missing object",
    };
  }
  if ( !data.storeLocationId ) {
    return {
      error   : true,
      errorMsg: "missing storeLocationId",
    };
  }
  if ( !data.productId ) {
    return {
      error   : true,
      errorMsg: "missing productId",
    };
  }

  return null;
}
