FORMAT: 1A
HOST: http://api.app.com

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
