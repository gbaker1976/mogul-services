# Group Projects
Project related resources of the **Mogul API**

## Projects Collection [/projects]
### List all Projects [GET]
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

### Create an Project [POST]
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

## Project [/projects/{projectId}]
A single Project object with all its details

+ Parameters
    + projectId (required, number, `1`) ... Numeric `id` of the Project to perform action with. Has example value.

### Retrieve an Project [GET]
+ Response 200 (application/json)

    + Body

            {
                "id": 2,
                "username": "elephantking24",
                "firstName": "George",
                "lastName": "Fapgar"
            }

### Remove an Project [DELETE]
+ Response 204
