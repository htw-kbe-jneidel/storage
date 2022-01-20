import { Types } from "mongoose";
import { GetProductQuantityAtLocationInputDataType } from "../type";

export class ProductQuantityAtLocationRepository {
  private model: any;
  constructor( modelInQuestion: any ) {
    this.model = modelInQuestion;
  }

  async getProductQuantityAtLocation( data: GetProductQuantityAtLocationInputDataType ): Promise<number> {
    const dataAsObjectIds = {
      productId      : new Types.ObjectId( data.productId ),
      storeLocationId: new Types.ObjectId( data.storeLocationId ),
    };

    const results = await this.model.find( dataAsObjectIds ).select( { amount: 1, _id: 0 } ) ;
    if ( results.length != 1 )
      return -1;

    return results[0].amount;
  }

  async getAllProductQuantitiesAtLocations(): Promise<any[]> {
    const results = await this.model.find( {} )
      .select( { storeLocationId: 1, productId: 1, amount: 1, _id: 0 } );

    return results;
  }

}
