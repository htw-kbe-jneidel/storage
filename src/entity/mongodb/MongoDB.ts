import * as mongoose from "mongoose";
import Mongoose from "mongoose";
// node v17 prefers ipv6
// configure mongo accordingly:
//   https://stackoverflow.com/a/69964742

export class MongoDB {
  private connection: mongoose.Connection;

  private constructor( conn: mongoose.Connection ) {
    this.connection = conn;
  }
  static async create( connectionURI: string ) {
    const conn = await Mongoose.createConnection( connectionURI ).asPromise();
    return new MongoDB( conn );
  }

  public models: any = {};
  addModel( name: string, schema: mongoose.Schema ) {
    const model = this.connection.model( name, schema );
    this.models[name] = model;
  }
}
