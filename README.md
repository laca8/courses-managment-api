#Course Management API
A Node.js REST API for managing courses and orders with robust security features.
This API allows users to perform CRUD operations on courses and orders while implementing essential security measures.
Features

#Course management (CRUD operations)
Order processing
Security implementation (XSS protection, Rate limiting, Helmet)
Input validation
Error handling

#Tech Stack

Node.js
Express.js
MongoDB
JSON Web Token (JWT)

#Prerequisites

Node.js
MongoDB
npm 

#Security Features

XSS Protection

Input sanitization
Content Security Policy
Output encoding

Rate Limiting

Maximum 30 requests per 15 minutes
IP-based rate limiting
Custom error responses

Additional Security

Helmet for HTTP headers
CORS configuration
Request validation


#API Endpoints
@user
add user
/api/user/add

@Courses
1-Get All Courses
httpCopyGET /api/courses
2-Get Single Course
httpCopyGET /api/courses/:id
3-Create Course
httpCopyPOST /api/courses
Body:
jsonCopy{
  "title": "Course Title",
  "description": "Course Description",
  "price": 99.99,
  "instructor": "Instructor Name"
}
4-Delete Course
httpCopyDELETE /api/courses/:id

@Orders
1-Get All Orders
httpCopyGET /api/orders
2-Get Single Order
httpCopyGET /api/orders/:id
3-Create Order
httpCopyPOST /api/orders
