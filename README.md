# Tutor-Connect API

This **REST**ful api for an app where a student can book lessons with tutors who have registered to take subjects in different categories. It accepts raw JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

**Login Details for Admin:**   
username: john.doe  
password: root-admin01

## Registration & Login

This is the API collection for users registration & login (Students & Tutors)

#### Student Registration
### POST https://whispering-woodland-21852.herokuapp.com/api/v1/student/register
**Headers** 
**Content-Type:**	  application/json  
**Body:** raw(application/json)

#### Tutor Registration
### POST https://whispering-woodland-21852.herokuapp.com/api/v1/tutor/register
**Headers** 
**Content-Type:**	  application/json  
**Body:** raw(application/json)

#### Student Login
### POST https://whispering-woodland-21852.herokuapp.com/api/v1/student/login
**Headers** 
**Content-Type:**	  application/json  
**Body:** raw(application/json)

#### Tutor Login
### POST https://whispering-woodland-21852.herokuapp.com/api/v1/tutor/login
**Headers** 
**Content-Type:**	  application/json  
**Body:** raw(application/json)

#### Admin Login
### POST https://whispering-woodland-21852.herokuapp.com/api/v1/admin/login
**Headers** 
**Content-Type:**	  application/json  
**Body:** raw(application/json)

## Category

This is the API collection for categories

#### Retrieve all categories
### GET https://whispering-woodland-21852.herokuapp.com/api/v1/categories
**Headers:**  auth-token (only logged in users can use)

#### Adding a subject to a category
### POST https://whispering-woodland-21852.herokuapp.com/api/v1/category/:category_name/subject
**Headers:**  
auth-token (only logged in admin can send request)  
Content-Type: application/json  


**Path Variables:**  
category_name:  Name of category  

#### Retrieve all subjects in a category
### GET https://whispering-woodland-21852.herokuapp.com/api/v1/category/:category_name/subjects
**Headers:**  
auth-token (only logged in users can use)  


**Path Variables:**  
category_name:  Name of category  

#### Retrieve a subject in a category
### GET https://whispering-woodland-21852.herokuapp.com/api/v1/category/:category_name/subject/:subject_id
**Headers:**  
auth-token (only logged in users can use)  


**Path Variables:**  
category_name:  Name of category  
subject_id: ID of the subject  

#### Update/Modify a subject in a category
### PATCH https://whispering-woodland-21852.herokuapp.com/api/v1/category/:category_name/subject/:subject_id
**Headers:**  
auth-token (only logged in admin can use)  
Content-Type:	application/json  


**Path Variables:**  
category_name:  Name of category  
subject_id: ID of the subject  

#### Delete a subject in a category
### DELETE https://whispering-woodland-21852.herokuapp.com/api/v1/category/:category_name/subject/:subject_id
**Headers:**  
auth-token (only logged in admin can use)  


**Path Variables:**  
category_name:  Name of category  
subject_id: ID of the subject  

### Update a category
### PATCH https://whispering-woodland-21852.herokuapp.com/api/v1/category/:category_name
**Headers:**  
auth-token (only logged in admin can use)  
Content-Type:	application/json  


**Path Variables:**  
category_name:  Name of category  

### Delete a category
### DELETE https://whispering-woodland-21852.herokuapp.com/api/v1/category/:category_name
**Headers:**  
auth-token (only logged in admin can use)  


**Path Variables:**  
category_name:  Name of category  

###  Search query for a subject using subject's title
### GET https://whispering-woodland-21852.herokuapp.com/api/v1/subjects?title=economics
**Headers:**  
auth-token (only logged in users can use)  


**Params:**  
title: subject's title


**Path Variables:**  
category_name:  Name of category

## User

This is the API collection for users (admin, student & tutor)

### Retrieve the list of all tutors
### GET https://whispering-woodland-21852.herokuapp.com/api/v1/tutors
**Headers:**  
auth-token (only logged in admin can use)  

### Search query for a tutor using tutor's firstname
### GET https://whispering-woodland-21852.herokuapp.com/api/v1/tutor?firstname=faith
**Headers:**  
auth-token (only logged in users can use) 


**Params:**  
firstname: tutor's first name

### Retrieve a tutor by using the tutor's ID
### GET https://whispering-woodland-21852.herokuapp.com/api/v1/tutor/:tutor_id
**Headers:**  
auth-token (only logged in admin can use) 

**Path Variables:**  
tutor_id: tutor's ID

### Delete/Deactivate a tutor 
### DELETE https://whispering-woodland-21852.herokuapp.com/api/v1/tutor/:tutor_id
**Headers:**  
auth-token (only logged in admin can use) 


**Path Variables:**  
tutor_id: tutor's ID

### A tutor register to take/teach a subject
### POST https://whispering-woodland-21852.herokuapp.com/api/v1/tutor/register-subject
**Headers:**  
auth-token (only logged in tutor can use) 
Content-Type: application/json  

### A tutor can retrieve all subjects that are taken by him/her
### GET https://whispering-woodland-21852.herokuapp.com/api/v1/tutor/registered/subjects
**Headers:**  
auth-token (only logged in tutor can use) 

### A tutor can update the subject being taught by him/her
### PATCH https://whispering-woodland-21852.herokuapp.com/api/v1/tutor/subject/:subject_id
**Headers:**  
auth-token (only logged in tutor can use) 
Content-Type: application/json 


**Path Variables:**  
subject_id: subject's ID

### A tutor can delete a subject that is taken by him/her
### DELETE https://whispering-woodland-21852.herokuapp.com/api/v1/tutor/subject/:subject_id
**Headers:**  
auth-token (only logged in tutor can use) 


**Path Variables:**  
subject_id: subject's ID

### Retrieve all the tutors taking a particular subject in a category
### GET https://whispering-woodland-21852.herokuapp.com/api/v1/category/:category_name/:subject_id/tutors
**Headers:**  
auth-token (only logged in student can use) 


**Path Variables:**  
subject_id: subject's ID  
category_name: The name of the category

## User

This is the API collection for users (admin, student & tutor)

### Booking a lesson by student
### POST https://whispering-woodland-21852.herokuapp.com/api/v1/lesson
**Headers:**  
auth-token (only logged in student can use) 
Content-Type	application/json  

### Retrieve all lessons
### GET https://whispering-woodland-21852.herokuapp.com/api/v1/lessons
**Headers:**  
auth-token (only logged in admin can use)  

### Retrieve a particular lesson
### GET https://whispering-woodland-21852.herokuapp.com/api/v1/lesson/:lesson_id
**Headers:**  
auth-token (only logged in admin can use) 


**Path Variables:**  
lesson_id: lesson's ID  

### Update or modify an already existing lesson.
### PATCH https://whispering-woodland-21852.herokuapp.com/api/v1/lesson/:lesson_id
**Headers:**  
auth-token (only logged in admin can use) 
Content-Type	application/json


**Path Variables:**  
lesson_id: lesson's ID

### Delete a lesson from the list of lessons created
### DELETE https://whispering-woodland-21852.herokuapp.com/api/v1/lesson/:lesson_id
**Headers:**  
auth-token (only logged in admin can use) 


**Path Variables:**  
lesson_id: lesson's ID  
