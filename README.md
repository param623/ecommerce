# ecommerce
Angular based application for the ecommerce.

In this E-commerce Web Application:-
  Angular is used as a Front-End Framework,
  JSON-Server is used for calling an REST APIs,
  product.json file is used to store the data of Products and Shipping Methods,
  
Basic Functionality:-
  On the Home Page:- List of all Products,
  On the Product-Detail Page:- Details of the particular product,
  On the Checkout Page:- User can see the total purchase value of the product.

About Project:-
  - I have used JSON Server for the API calling.
  - I have made product.json file to store the data of products and shipping methods.
  - So here, JSON Server will be using for to watch the product.json file and it is responsible to fetch the data from the product.json file.

How to Start the project:-
  - First we need to hit "ng serve" command to start the local server.
  - Then we need to hit "json-server --watch product.json" command to start the local json-server(Make sure that you will be on the right path which is "ecommerce-app"       and then hit the command.)
  - Now this command will listen the product.json file and can able to communicate between client and server.
