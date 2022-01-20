# storage

## Queues

### getProductQuantityAtLocation

Get the quantity of products available at a given store location.

Input:
```
{
  productId:string,
  storeLocationId:string
}
```

Reponse sucess:
```
{
  amount:number,
  error:boolean
}
```

Reponse error:
```
{
  error:boolean,
  errorMsg:string
}
```


### getAllProductQuantitiesAtLocations

Get all product location combinations.

Input: none

Output:
```
{
  productId:string,
  storeLocationId:string,
  amount:string,
}[]
```
