# MovieService

There are 2 models with a total of 6 endpoints - POST, GET, DELETE for each model.

## Endpoints

### Create Actor

POST /api/actors/

Body:

```  
{
	"Name": "Errol Flynn"  
}
```

Validations:

 - Name is not null

Returns:

200 - Id (UUID) of created Actor  
400 - Validation error

Example 200 response:

```
"107f636c-48a8-11ea-b77f-2e728ce88125"
```

### Get Actor

GET /api/actors/{id}

Returns:

200 - Actor with Id {id}  
404 - Actor not found

Example 200 response:

```
{
	"Id": "55066710-48a8-11ea-aaef-0800200c9a66",
	"Name": "Humphrey Bogart"
}
```

### Delete Actor

DELETE /api/actors/{id}

Returns:

204 - Deleted  
404 - Actor not found

### Create Movie

POST /api/movies/

Body:

```
{
	"Title": "MyTitle",
	"Year": 2001,
	"Actors": [
		"596e1e57-1c36-4605-917f-7d557a80aff0",
		"67c9ae83-a95d-4a58-99ef-723d1d019b78",
		"67bd7fd0-31c3-435b-be84-c7af446df46f"
	]
}
```

Validations:

 - Title is not null
 - Year is positive integer
 - All Ids in Actors exist

Returns:

200 - Id of created Movie  
400 - Validation error

Example 200 response:

```
"9819ca9c-48a8-11ea-b77f-2e728ce88125"
```

### Get Movie

GET /api/movies/{id}

Returns:

200 - Movie with Id {id}  
404 - Movie not found

Example 200 response:

```
{
	"Id": "b5fe19d8-07d4-4852-a72a-2197db70e7c8",
	"Title": "Amazing movie",
	"Year": 2002
	"Actors": [
		"596e1e57-1c36-4605-917f-7d557a80aff0",
		"67c9ae83-a95d-4a58-99ef-723d1d019b78",
		"67bd7fd0-31c3-435b-be84-c7af446df46f"
	]
}
```

### Delete Movie

DELETE /api/movies/{id}

Returns:

204 - Deleted 
404 - Actor not found