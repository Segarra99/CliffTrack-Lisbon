# 2nd-Project

Description
Search platform for climbing routes in Lisbon district.


User Stories
404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
homepage - As a user I want to be able to access the homepage and filter by type of restaurant, log in and sign up.
sign up - As a user I want to sign up on the web page so that I can add favorite restaurants to my list.
login - As a user I want to be able to log in on the web page so that I can get back to my account
logout - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
edit user - As a user I want to be able to edit my profile.
user profile - Page displaying user's profile with information about reviews, climbed routes, etc...
route list - List displaying routes according to the chosen parameters.
route details -  As a user I want to see more details of the route, like its location, grade, etc...
edit route - Edit the information regarding to the route.
create route - Create route.
delete route - Delete route.
error page - Page displaying a message explains the error occurring.

Server Routes (Back-end):
Method	Route	Description	Request - Body
GET	/	Main page route. Renders home index view.	
GET	/login	Renders login form view.	
POST	/login	Sends Login form data to the server.	{ email, password }
GET	/signup	Renders signup form view.	
POST	/signup	Sends Sign Up info to the server and creates user in the DB.	{ email, password }
GET	/private/edit-profile	Private route. Renders edit-profile form view.	
PUT	/private/edit-profile	Private route. Sends edit-profile info to server and updates user in DB.	{ email, password, [firstName], [lastName], [imageUrl] }
//GET	/private/favorites	Private route. Render the favorites view.	
POST	/private/favorites/	Private route. Adds a new favorite for the current user.	{ name, grade, location, }
DELETE	/private/favorites/:routetId	Private route. Deletes the existing favorite from the current user.	
GET	/routes	Renders routes-list view.	
GET	/route/details/:id	Renders route-details view for the particular route.	
GET /routes/create Renders the create view
POST /routes/create Adds the created route to DB
GET /route/details/:id/edit Renders route-edit page
POST /route/details/:id/edit Add the new information to the route
POST /route/details/:id/review/delete Deletes review
GET /route/details/:id/review/edit Page to edit the review
POST /route/details/:id/review/edit Deletes review
POST /route/details/:id/delete Deletes the route
POST /route/details/:id/review Adds review to the route and the user model
POST /route/details/:id/favourite Adds review to the user model
POST /route/details/:id/favourite/remove Removes from favourite array in user model

Models
User model

{
  name: String,
  email: String,
  password: String,
  favorites: [FavoriteId],
  reviews: [ReviewId]
}

Favorites model

{
  routeId: Object,
}

Reviews model

{
  rating: Number,
  review: String
}

API's

Packages

Backlog
See the Trello board: https://trello.com/b/DXMINOmm/2nd-project


Links
Git
The url to your repository and to your deployed project

Repository Link: https://github.com/Segarra99/2nd-Project

Deploy Link


Slides
The url to your presentation slides

Slides Link

Contributors
Manuel Segarra - Github: https://github.com/Segarra99 - Linkedin: https://www.linkedin.com/in/manuel-segarra/

Aamir Mushtaq - Github: https://github.com/Aamir269 - Linkedin: https://www.linkedin.com/in/aamirmushtaq269/
