# Tutor-Connect API Documentation

This **REST**ful api for an app where a student can book lessons with tutors who have registered to take subjects in different categories. It accepts raw JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

**Login Details for Admin:**   
username: john.doe  
password: root-admin01  

**Base URL: https://whispering-woodland-21852.herokuapp.com/api/v1**   

## Registration & Login

This is the API collection for users registration & login (Students & Tutors)

### Student Registration
POST `/student/register`   
**Headers**  
**Content-Type:**	  application/json  
**Body:** raw (application/json)

SAMPLE REQUEST
```
{
    "name": "Richard Tega",
    "username": "tega",
    "password": "Rouche01",
    "email": "tegamate@gmail.com"
}
```
SAMPLE RESPONSE - Status Code 200
```
{
    "status": true,
    "message": "student registered successfully, you can now login"
}
```

### Tutor Registration
POST `/tutor/register`  
**Headers**   
**Content-Type:** application/json  
**Body:** raw (application/json)

SAMPLE REQUEST
```
{
	"name": "Faith Emate",
	"username": "faithy",
	"password": "Rouche01",
	"email": "faith@emate.com"
}
```
SAMPLE RESPONSE - Status Code 200
```
{
    "status": true,
    "message": "tutor registered successfully, you can now login"
}
```

### Student Login
**You send:**  Your  login credentials.  
**You get:** An `API-Token` with wich you can make further actions as a student.

POST `/student/login`  
**Headers**  
**Content-Type:** application/json  
**Body:** raw (application/json)

SAMPLE REQUEST
```
{
    "username": "tega",
    "password": "Rouche01"
}
```
SAMPLE RESPONSE - Status Code 200
```
{
    "username": "tega",
    "role": "student",
    "email": "tegamate@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI1YmZmYzIzZDA3MDc0MjQwMzFiMGYiLCJuYW1lIjoiUmljaGFyZCBUZWdhIiwiZW1haWwiOiJ0ZWdhbWF0ZUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InRlZ2EiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU4ODk3MDUxOSwiZXhwIjoxNTg5MjI5NzE5fQ.fCBqrbYObvySSM87xwWH1KF29-dZJ_pJlNfS920XFRM"
}
```

### Tutor Login
**You send:**  Your  login credentials.  
**You get:** An `API-Token` with wich you can make further actions as a tutor.

POST `/tutor/login`  
**Headers**   
**Content-Type:**	  application/json  
**Body:** raw(application/json)

SAMPLE REQUEST
```
{
    "username": "faithy",
    "password": "Rouche01"
}
```
SAMPLE RESPONSE - Status Code 200
```
{
    "username": "faithy",
    "role": "tutor",
    "email": "faith@emate.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI1YzJmNjIzZDA3MDc0MjQwMzFiMTEiLCJuYW1lIjoiRmFpdGggRW1hdGUiLCJlbWFpbCI6ImZhaXRoQGVtYXRlLmNvbSIsInVzZXJuYW1lIjoiZmFpdGh5Iiwicm9sZSI6InR1dG9yIiwiaWF0IjoxNTg4OTcwODM5LCJleHAiOjE1ODkyMzAwMzl9.6Sc2PZ_kWt92bW4A70K7IY0wHYScRg1mvrFoCUg9uaE"
}
```

### Admin Login
**You send:**  Your  login credentials.  
**You get:** An `API-Token` with which you can make further actions as an admin.

POST `/admin/login`  
**Headers**  
**Content-Type:**	  application/json  
**Body:** raw(application/json)

SAMPLE REQUEST
```
{
    "username": "john.doe",
    "password": "root-admin01"
}
```
SAMPLE RESPONSE - Status Code 200
```
{
    "username": "john.doe",
    "role": "admin",
    "email": "johndoe@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI1YzJmNjIzZDA3MDc0MjQwMzFiMTEiLCJuYW1lIjoiRmFpdGggRW1hdGUiLCJlbWFpbCI6ImZhaXRoQGVtYXRlLmNvbSIsInVzZXJuYW1lIjoiZmFpdGh5Iiwicm9sZSI6InR1dG9yIiwiaWF0IjoxNTg4OTcwODM5LCJleHAiOjE1ODkyMzAwMzl9.6Sc2PZ_kWt92bW4A70K7IY0wHYScRg1mvrFoCUg9uaE"
}
```

&nbsp;
## Category

This is the API collection for categories

### Retrieve all categories
GET `/categories`  
**Headers:**  
**auth-token:** (only logged in users perform the request with the token received on login)

SAMPLE RESPONSE - Status Code 200
```
[
  {
    "subjects": [],
    "_id": "5eb5b6d223d0707424031b0b",
    "name": "Primary",
    "description": "This is for primary school students",
    "__v": 0
  },
  {
    "subjects": [],
    "_id": "5eb5b6d223d0707424031b0c",
    "name": "JSS",
    "description": "This is for Junior secondary school students",
    "__v": 0
  },
  {
    "subjects": [],
    "_id": "5eb5b6d223d0707424031b0d",
    "name": "SSS",
    "description": "This is for Senior Secondary School Students",
    "__v": 0
  }
]
```

### Adding a subject to a category
POST `/category/:category_name/subject`  


**Headers:**  
**auth-token:** (only logged in admin can send request, with the token received on login)  
Content-Type: application/json  


**Path Variables:**  
category_name:  Name of category

SAMPLE REQUEST
```
    --request POST "/category/sss/subject"
```
```
{
	"title": "Algebra Mathematics",
	"detail": "Introduction to Algebra for Senior Students"
}
```
SAMPLE RESPONSE - Status Code 200
```
{
    "newSubject": {
        "tutors": [],
        "_id": "5eb5d4622a4ce77ff0a14a8f",
        "title": "Algebra Mathematics",
        "detail": "Introduction to Algebra for Senior Students",
        "__v": 0
    }
}
```

### Retrieve all subjects in a category
GET `/category/:category_name/subjects`  

**Headers:**  
**auth-token:** (only logged in users can use)  


**Path Variables:**  
category_name:  Name of category (Primary/JSS/SSS) 

SAMPLE REQUEST
```
    --request GET "/category/sss/subjects
```

SAMPLE RESPONSE - Status Code 200
```
[
    {
        "tutors": [],
        "_id": "5eb5d4622a4ce77ff0a14a8f",
        "title": "Algebra Mathematics",
        "detail": "Introduction to Algebra for Senior Students",
        "__v": 0
    },
    {
        "tutors": [],
        "_id": "5eb5d5952a4ce77ff0a14a91",
        "title": "Economics",
        "detail": "Macro & Micro Economics Concept",
        "__v": 0
    }
]
```

### Retrieve a subject in a category
GET `/category/:category_name/subject/:subject_id`  

**Headers:**  
**auth-token:** (only logged in users send this request)  

**Path Variables:**  
category_name:  Name of category  
subject_id: ID of the subject  

SAMPLE REQUEST
```
    --request GET "/category/primary/subject/5eb5cdd9fbd10c73243714a9"
```

SAMPLE RESPONSE - Status Code 200
```
{
    "tutors": [],
    "_id": "5eb5cdd9fbd10c73243714a9",
    "title": "Fine Arts",
    "detail": "Fine arts for primary school pupils",
    "__v": 0
}
```

### Update/Modify a subject in a category
PATCH `/category/:category_name/subject/:subject_id`  

**Headers:**  
**auth-token:** (only logged in admin can send request)  
**Content-Type:**	application/json  

**Path Variables:**  
category_name:  Name of category  
subject_id: ID of the subject   

SAMPLE REQUEST
```
    --request PATCH "/category/primary/subject/5eb5cdd9fbd10c73243714a9"
```
```
{
    "title": "Fine Arts & Design",
    "detail": "Introduction to Fine Arts & Design"
}
```

SAMPLE RESPONSE - Status Code 200
```
{
    "status": true,
    "message": "1 subject was modified successfully"
}
```

### Delete a subject in a category
DELETE `/category/:category_name/subject/:subject_id`  

**Headers:**  
**auth-token:** (only logged in admin can use)  


**Path Variables:**  
category_name:  Name of category  
subject_id: ID of the subject  

SAMPLE REQUEST
```
    --request DELETE "/category/sss/subject/5eb5d4622a4ce77ff0a14a8f"
```

SAMPLE RESPONSE - Status Code 200
```
{
    "status": true,
    "message": "Subject has been successfully deleted",
    "deletedSubject": {
        "tutors": [],
        "_id": "5eb5d4622a4ce77ff0a14a8f",
        "title": "Algebra Mathematics",
        "detail": "Introduction to Algebra for Senior Students",
        "__v": 0
    }
}
```

### Update a category
PATCH `/category/:category_name`  

**Headers:**  
**auth-token:** (only logged in admin can use)  
**Content-Type:**	application/json  


**Path Variables:**  
category_name:  Name of category  

SAMPLE REQUEST
```
    --request PATCH "/category/sss"
```
```
 {
    "name": "Tertiary",
    "description": "This is for higher level students"
 }   
```

SAMPLE RESPONSE - Status Code 200
```
{
    "status": true,
    "message": "1 category was modified successfully"
}
```

### Delete a category
DELETE `/category/:category_name`  

**Headers:**  
auth-token: (only logged in admin can use)  

**Path Variables:**  
category_name:  Name of category  

SAMPLE REQUEST
```
    --request DELETE "/category/tertiary"
```

SAMPLE RESPONSE - Status Code 200
```
{
    "status": true,
    "message": "Category deleted successfully",
    "deletedCategory": {
        "subjects": [
        "5eb5d4622a4ce77ff0a14a8f",
        "5eb5d5952a4ce77ff0a14a91"
        ],
        "_id": "5eb5b6d223d0707424031b0d",
        "name": "Tertiary",
        "description": "This is for higher level students",
        "__v": 2
    }
}
```

###  Search query for a subject using subject's title
GET `/subjects?title=economics ` 

**Headers:**  
auth-token (only logged in users can use)  

**Params:**  
title: subject's title

SAMPLE REQUEST 
```
    --request GET "/subjects?title=economics"
```
SAMPLE RESPONSE - Status Code 200
```
[
    {
        "tutors": [],
        "_id": "5eb5d5952a4ce77ff0a14a91",
        "title": "Economics",
        "detail": "Macro & Micro Economics Concept",
        "__v": 0
    }
]
```

&nbsp;
## Users

This is the API collection for users (admin, student & tutor)

### Retrieve the list of all tutors
GET `/tutors`  

**Headers:**  
auth-token: (only logged in admin can use)  

SAMPLE RESPONSE - Status Code 200
```
[
    {
        "subjects": [],
        "role": "tutor",
        "_id": "5eb5c1a023d0707424031b10",
        "email": "maggie@gmail.com",
        "username": "maggie",
        "name": "Margaret Tega"
    },
    {
        "subjects": [],
        "role": "tutor",
        "_id": "5eb5c2f623d0707424031b11",
        "email": "faith@emate.com",
        "username": "faithy",
        "name": "Faith Emate"
    }
]
```

### Search query for a tutor using tutor's firstname
GET `/tutor?firstname=faith`  

**Headers:**  
auth-token (only logged in users can send request) 


**Params:**  
firstname: tutor's first name

SAMPLE REQUEST
```
    --request GET "/tutor?firstname=faith"
```
SAMPLE RESPONSE - Status Code 200
```
[
    {
        "lessons": [],
        "subjects": [],
        "role": "tutor",
        "_id": "5eb5c2f623d0707424031b11",
        "email": "faith@emate.com",
        "username": "faithy",
        "name": "Faith Emate",
        "createdAt": "2020-05-08T20:37:10.304Z",
        "updatedAt": "2020-05-08T20:37:10.304Z",
        "__v": 0
    }
]
```

### Retrieve a tutor by using the tutor's ID
GET `/tutor/:tutor_id`  

**Headers:**  
**auth-token:** (only logged in admin can use) 

**Path Variables:**  
**tutor_id:** tutor's ID

SAMPLE REQUEST
```
    --request GET "/tutor/5eb5c1a023d0707424031b10"

```
SAMPLE RESPONSE - Status Code 200
```
{
    "subjects": [],
    "role": "tutor",
    "_id": "5eb5c1a023d0707424031b10",
    "email": "maggie@gmail.com",
    "username": "maggie",
    "name": "Margaret Tega"
}
```

### Delete / Deactivate a Tutor 
DELETE `/tutor/:tutor_id`  

**Headers:**  
**auth-token:** (only logged in admin can use) 


**Path Variables:**  
**tutor_id:** tutor's ID

SAMPLE REQUEST
```
    --request DELETE "/tutor/5eb5c2f623d0707424031b11"

```
SAMPLE RESPONSE - Status Code 200
```
{
    "status": false,
    "message": "Tutor has been successfully deativated",
    "deactivatedTutor": {
        "lessons": [],
        "subjects": [],
        "role": "tutor",
        "_id": "5eb5c2f623d0707424031b11",
        "email": "faith@emate.com",
        "username": "faithy",
        "name": "Faith Emate",
    }
}
```

### A Tutor registration to take / teach a subject
POST `/tutor/register-subject`  

**Headers:**  
**auth-token:** (only logged in tutor can send request)   
**Content-Type:** application/json  

SAMPLE REQUEST
```
{
    "categoryName": "primary",
    "subjectTitle": "fine arts & design"
}
```
SAMPLE RESPONSE - Status Code 200
```
{
    "status": true,
    "message": "You have registered to take a subject successfully!"
}
```

### A Tutor retrieves all subjects taken by him/her
GET `/tutor/registered/subjects`  

**Headers:**  
**auth-token:** (only logged in tutor can use) 

SAMPLE RESPONSE - Status Code 200
```
[
    {
        "tutors": [
        "5eb5c2f623d0707424031b11"
        ],
        "_id": "5eb5cdd9fbd10c73243714a9",
        "title": "Fine Arts & Design",
        "detail": "Introduction to Fine Arts & Design",
        "__v": 1
    },
    {
        "tutors": [
        "5eb5c2f623d0707424031b11"
        ],
        "_id": "5eb64231170e3d74249c052e",
        "title": "Basic Science",
        "detail": "Introduction to sciences for the Juniors",
        "__v": 1
    }
]
```

### A Tutor can update the subject being taught by him/her
PATCH `/tutor/subject/:subject_id`  

**Headers:**  
**auth-token:** (only logged in tutor can use)   
**Content-Type:** application/json 


**Path Variables:**  
subject_id: subject's ID

SAMPLE REQUEST
```
    --request PATCH "/tutor/subject/5eb64231170e3d74249c052e"
```
```
{
    "title": "Basic Science for Juniors"
}
```
SAMPLE RESPONSE - Status Code 200
```
{
    "status": true,
    "message": "1 subject was modified successfully"
}
```

### A Tutor can delete a subject that is taken by him/her
DELETE `/tutor/subject/:subject_id`  

**Headers:**  
**auth-token:** (only logged in tutor can send request) 


**Path Variables:**  
**subject_id:** subject's ID

SAMPLE REQUEST
```
    --request DELETE "/tutor/subject/5eb5cdd9fbd10c73243714a9"
```
SAMPLE RESPONSE - Status Code 200
```
{
    "status": true,
    "message": "Subject has been successfully deleted",
    "deletedSubject": {
        "tutors": [
        "5eb5c2f623d0707424031b11"
        ],
        "_id": "5eb5cdd9fbd10c73243714a9",
        "title": "Fine Arts & Design",
        "detail": "Introduction to Fine Arts & Design",
        "__v": 1
    }
}
```

### Retrieve all the Tutors taking a Subject in a Category
GET `/category/:category_name/:subject_id/tutors`  

**Headers:**  
**auth-token:** (only logged in student can send request) 


**Path Variables:**  
**subject_id:** subject's ID  
**category_name:** The name of the category

SAMPLE REQUEST
```
    --request GET "/category/primary/5eb64c4bebe4ed75c48c6d5e/tutors"
```
SAMPLE RESPONSE - Status Code 200
```
[
    {
        "lessons": [],
        "subjects": [
        "5eb5cdd9fbd10c73243714a9",
        "5eb64231170e3d74249c052e",
        "5eb64c4bebe4ed75c48c6d5e"
        ],
        "role": "tutor",
        "_id": "5eb5c2f623d0707424031b11",
        "isAdmin": false,
        "email": "faith@emate.com",
        "username": "faithy",
        "name": "Faith Emate"
    },
    {
        "lessons": [],
        "subjects": [
        "5eb64c4bebe4ed75c48c6d5e"
        ],
        "role": "tutor",
        "_id": "5eb5c1a023d0707424031b10",
        "isAdmin": false,
        "email": "maggie@gmail.com",
        "username": "maggie",
        "name": "Margaret Tega"
    }
]
```

## Lessons

This is the API collection for lessons

### Booking a Lesson by Student
POST `/lesson`  

**Headers:**  
**auth-token:** (only logged in student can use)   
**Content-Type:** application/json  

SAMPLE REQUEST
```
{
    "topic": "Matter and its states",
    "duration": "1 hour",
    "subject": "Basic Science"
}
```
SAMPLE RESPONSE - Status Code 200
```
{
    "_id": "5eb65020ebe4ed75c48c6d63",
    "topic": "Matter and its states",
    "duration": "1 hour",
    "subject": "Basic Science",
    "createdAt": "2020-05-09T06:39:28.656Z",
    "updatedAt": "2020-05-09T06:39:28.656Z",
    "__v": 0
}
```

### Retrieve all Lessons
GET `/lessons`  

**Headers:**  
**auth-token:** (only logged in admin can use)  

SAMPLE RESPONSE - Status Code 200
```
[
    {
        "_id": "5eb65020ebe4ed75c48c6d63",
        "topic": "Matter and its states",
        "duration": "1 hour",
        "subject": "Basic Science",
        "createdAt": "2020-05-09T06:39:28.656Z",
        "updatedAt": "2020-05-09T06:39:28.656Z",
        "__v": 0
    },
    {
        "_id": "5eb650d9ebe4ed75c48c6d65",
        "topic": "Introduction to Alphabets",
        "duration": "30 minutes",
        "subject": "Verbal Reasoning",
        "createdAt": "2020-05-09T06:42:33.708Z",
        "updatedAt": "2020-05-09T06:42:33.708Z",
        "__v": 0
    }
]
```

### Retrieve a Lesson
GET `/lesson/:lesson_id`  

**Headers:**  
**auth-token:** (only logged in admin can use) 


**Path Variables:**  
**lesson_id:** lesson's ID 

SAMPLE REQUEST
```
    --request GET "/lesson/5eb650d9ebe4ed75c48c6d65"
```
SAMPLE RESPONSE - Status Code 200
```
{
    "_id": "5eb650d9ebe4ed75c48c6d65",
    "topic": "Introduction to Alphabets",
    "duration": "30 minutes",
    "subject": "Verbal Reasoning",
    "createdAt": "2020-05-09T06:42:33.708Z",
    "updatedAt": "2020-05-09T06:42:33.708Z",
    "__v": 0
}
```

### Update or Modify a Lesson.
PATCH `/lesson/:lesson_id`  

**Headers:**  
**auth-token:** (only logged in admin can use)   
**Content-Type:**	application/json


**Path Variables:**  
lesson_id: lesson's ID

SAMPLE REQUEST
```
    --request PATCH "/lesson/5eb650f9ebe4ed75c48c6d66"
```
```
{
    "topic": "Matter & its states Part 2"
}
```
SAMPLE RESPONSE - Status Code 200
```
{
    "status": true,
    "message": "1 lesson was modified successfully"
}
```

### Delete a Lesson
DELETE `/lesson/:lesson_id`  

**Headers:**  
**auth-token:** (only logged in admin can use) 

**Path Variables:**  
**lesson_id:** lesson's ID  

SAMPLE REQUEST
```
    --request DELETE "/lesson/5eb650d9ebe4ed75c48c6d65"
```
SAMPLE RESPONSE - Status Code 200
```
{
    "status": true,
    "message": "Lesson has been successfully deleted",
    "deletedSubject": {
        "_id": "5eb650d9ebe4ed75c48c6d65",
        "topic": "Introduction to Alphabets",
        "duration": "30 minutes",
        "subject": "Verbal Reasoning",
        "createdAt": "2020-05-09T06:42:33.708Z",
        "updatedAt": "2020-05-09T06:42:33.708Z",
        "__v": 0
    }
}
```