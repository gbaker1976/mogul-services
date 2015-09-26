FORMAT: 1A
HOST: http://api.mogul.io

# mogul
Mogul API (Zartan).

# Group Accounts
Account related resources of the **Mogul API**

## Accounts Collection [/accounts]
### List all Accounts [GET]
+ Response 200 (application/json)

        {
            "entities": [{
                "id": 1,
                "username": "elephantking24",
                "firstName": "George",
                "lastName": "Fapgar"
                }, {
                "id": 2,
                "username": "purplejack04",
                "firstName": "Lorena",
                "lastName": "Blobbit"
            }]
        }

### Create an Account [POST]
+ Request (application/json)

        {
            "username": "elephantking24",
            "firstName": "George",
            "lastName": "Fapgar"
        }

+ Response 201 (application/json)

        {
            "id": 3,
            "username": "elephantking24",
            "firstName": "George",
            "lastName": "Fapgar"
        }

## Account [/accounts/{accountId}]
A single Account object with all its details

+ Parameters
    + accountId (required, number, `1`) ... Numeric `id` of the Account to perform action with. Has example value.

### Retrieve an Account [GET]
+ Response 200 (application/json)

    + Body

        {
            "id": 2,
            "username": "elephantking24",
            "firstName": "George",
            "lastName": "Fapgar"
        }

### Remove an Account [DELETE]
+ Response 204

# Group Projects
Project related resources of the **Mogul API**

## Projects Collection [/projects]
### List all Projects [GET]
+ Response 200 (application/json)

    {
        "entities": [{
            "id": 1,
            "name": "Polish Destro's Face"
        }]
    }

### Create a Project [POST]
+ Request (application/json)

    {
        "id": 1,
        "name": "Polish Destro's Face"
    }

+ Response 201 (application/json)

    {
        "id": 1,
        "name": "Polish Destro's Face"
    }

## Project [/projects/{projectId}]
A single Project object with all its details

+ Parameters
    + projectId (required, number, `1`) ... Numeric `id` of the Project to perform action with. Has example value.

### Retrieve a Project [GET]
+ Response 200 (application/json)

    + Body

        {
            "id": 1,
            "name": "Polish Destro's Face"
        }

### Remove a Project [DELETE]
+ Response 204

# Group Project Items
Project Item related resources of the **Mogul API**

## Project Items Collection [/projects/{projectId}/items]

+ Parameters
    + projectId (required, number, `1`) ... Numeric `id` of the Project to perform action with. Has example value.

### List all Project Items [GET]
+ Response 200 (application/json)

    {
        "entities": [
            {
                "id": 1,
                "name": "Get an industrial face polisher",
                "description": "Something very descriptive...",
                "type": 1,
                "subtype": 1,
                "priority": 1,
                "attachments": [],
                "links": []
            }
        ]
    }

### Create a Project Item [POST]
+ Request (application/json)

    {
        "id": 1,
        "name": "Get an industrial face polisher",
        "description": "Something very descriptive...",
        "type": 1,
        "subtype": 1,
        "priority": 1,
        "attachments": [],
        "links": []
    }

+ Response 201 (application/json)

    {
        "id": 1,
        "name": "Get an industrial face polisher",
        "description": "Something very descriptive...",
        "type": 1,
        "subtype": 1,
        "priority": 1,
        "attachments": [],
        "links": []
    }

## Project Item [/projects/{projectId}/items/{itemId}]
A single Project Item with all its details

+ Parameters
    + projectId (required, number, `1`) ... Numeric `id` of the Project to perform action with. Has example value.
    + itemId (required, number, `1`) ... Numeric `id` of the Project Item to perform action with. Has example value.

### Retrieve a Project Item [GET]
+ Response 200 (application/json)

    + Body

        {
            "id": 1,
            "name": "Get an industrial face polisher",
            "description": "Something very descriptive...",
            "type": 1,
            "subtype": 1,
            "priority": 1,
            "attachments": [],
            "links": []
        }

### Remove a Project Item [DELETE]
+ Response 204

# Group Tasks
Task related resources of the **Mogul API**

## Tasks Collection [/projects/{projectId}/items/{itemId}/tasks]

+ Parameters
    + projectId (required, number, `1`) ... Numeric `id` of the Project to perform action with. Has example value.
    + itemId (required, number, `1`) ... Numeric `id` of the Project Item to perform action with. Has example value.

### List all Tasks [GET]
+ Response 200 (application/json)

    {
        "entities": [{
            "id": 1,
            "name": "Get an industrial face polisher",
            "status": 1
        }]
    }

### Create a Task [POST]
+ Request (application/json)

    {
        "id": 1,
        "name": "Get an industrial face polisher",
        "status": 1
    }

+ Response 201 (application/json)

    {
        "id": 1,
        "name": "Get an industrial face polisher",
        "status": 1
    }

## Task [/projects/{projectId}/items/{itemId}/tasks/{taskId}]
A single Task object with all its details

+ Parameters
    + projectId (required, number, `1`) ... Numeric `id` of the Project. Has example value.
    + itemId (required, number, `1`) ... Numeric `id` of the Project Item. Has example value.
    + taskId (required, number, `1`) ... Numeric `id` of the Task to perform action with. Has example value.

### Retrieve a Task [GET]
+ Response 200 (application/json)

    + Body

        {
            "id": 1,
            "name": "Get an industrial face polisher",
            "status": 1
        }


### Remove a Task [DELETE]
+ Response 204
