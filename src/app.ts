import * as rabbitMq from "./entity/rabbit-mq";
import { MongoDB } from "./entity/mongodb";
import { ProductQuantityAtLocationSchema } from "./schema";
import { ProductQuantityAtLocationRepository } from "./repository";
import { getProductQuantityAtLocationController, getAllProductQuantitiesAtLocationsController } from "./controller";

const RABBIT_MQ_IP =  "127.0.0.1" ;
const GET_QUANTITY_QUEUE = "getProductQuantityAtLocation";
const GET_QUANTITIES_QUEUE = "getAllProductQuantitiesAtLocations";
const MONGO_URI = "mongodb://127.0.0.1:27017/storage";

( async () => {
  const mongoDB = await MongoDB.create( MONGO_URI );
  mongoDB.addModel( "ProductQuantityAtLocation", ProductQuantityAtLocationSchema );
  const productQuantityAtLocationRepository = new ProductQuantityAtLocationRepository( mongoDB.models.ProductQuantityAtLocation );

  const rabbitMqConnection = new rabbitMq.Connection( RABBIT_MQ_IP );
  await rabbitMqConnection.open();

  const getQuantityQueue = new rabbitMq.Queue( rabbitMqConnection );
  const getAllQuantitiesQueue = new rabbitMq.Queue( rabbitMqConnection );
  await Promise.all( [
    getQuantityQueue.create(),
    getAllQuantitiesQueue.create(),
  ] );

  getQuantityQueue.setController( getProductQuantityAtLocationController( productQuantityAtLocationRepository ) );
  getQuantityQueue.listen( GET_QUANTITY_QUEUE );

  getAllQuantitiesQueue.setController( getAllProductQuantitiesAtLocationsController( productQuantityAtLocationRepository ) );
  getAllQuantitiesQueue.listen( GET_QUANTITIES_QUEUE );
} )();
