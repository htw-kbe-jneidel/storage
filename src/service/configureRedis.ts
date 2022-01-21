import { createClient } from "redis";
import mongoose from "mongoose";

export async function configureRedis() {
  const redis = createClient();
  await redis.connect();

  // from: https://epsagon.com/development/using-redis-to-optimize-mongodb-queries
  const { exec } = mongoose.Query.prototype;
  mongoose.Query.prototype.exec = async function exec() {
    const key = JSON.stringify( {
      ...this.getQuery(),
    } );

    const cacheValue = await redis.get( key );
    if ( cacheValue ) {
      const doc = JSON.parse( cacheValue );
      console.log( "Response from Redis" );
      return Array.isArray( doc )
        ? doc.map( d => new this.model( d ) )
        : new this.model( doc );
    }
    // @ts-ignore
    const result = await exec.apply( this, arguments );
    redis.set( key, JSON.stringify( result ) );
    console.log( "Response from MongoDB" );
    return result;
  };
}
