# CliffTrack Lisbon

<br>



## Description

Search platform for climbing routes in Lisbon district.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter by type of climbing route, log in and sign up. 
- **sign up** - As a user I want to sign up on the web page so that I can add favorite climbing routes to my list.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **edit user** - As a user I want to be able to edit my profile.
- **result** - As a user I want to see the list of climbing routes filtered by my preferences.
- **climbing route listing** - As a user I want to see more details of the climbing route, leave a review and save it as favorites.



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                    |
| `GET`      | `/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/favorites/`              | Private route. Adds a new favorite for the current user.     | { name, grade, location, equipment }                                 |
| `DELETE`   | `/favorites/:id` | Private route. Deletes the existing favorite from the current user. |                                                          |
| `GET`      | `/climbing-routes`                     | Renders `climbing-routes-list` view.                              |                                                          |
| `GET`      | `/climbing-routes/details/:id`         | Renders `climbing-routes-details` view for the particular climbing route. |                                                          |
| `GET`      | `/climbing-routes/create`         | Renders `climbing-routes-create` view. | { name, grade, location, equipment }                                 |
| `POST`      | `/climbing-routes/create`         | Adds the created route to DB. | { name, grade, location, equipment }                                 |
| `GET`      | `/climbing-routes/details/:id/edit`         | Renders `climbing-routes-edit`. | { name, grade, location, equipment }                                 |
| `PUT`      | `/climbing-routes/details/:id/edit`         | Updates the route to DB. | { name, grade, location, equipment }  |
| `DELETE`      | `/climbing-routes/details/:id`         | Deletes the climbing route from the DB. | { name, grade, location, equipment }  |
| `POST`      | `/climbing-routes/details/:id`         | Creates a review for the route. | { [firstName], [lastName], [imageUrl] }  |
| `PUT`      | `/climbing-routes/details/:id`         | Updates a review for the route. | { [firstName], [lastName], [imageUrl] }  |
| `DELETE`      | `/climbing-routes/details/:id`         | Updates a review for the route. | { id }  |








## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  favorites: [FavoriteId],
  reviews: [ReviewId]
}

```



Climbing.routes model

```javascript
{
  name: String
  grade: String,
  description: String,
  pictures: [String],
  equipment: String,
  reviews: [String]
}

```



Review model

```javascript
{
  rating: number,
  content: string,
  picture: String
}

```



<br>

## API's

Google Maps JavaScript API

<br>


## Packages

ExpressJS
MongooseJS



<br>



## Backlog

[See the Trello board.](https://trello.com/b/DXMINOmm/clifftrack-lisbon)



<br>



## Links



### Git

[Repository Link](https://github.com/Segarra99/CliffTrack-Lisbon)

[Deploy Link](#)



<br>



### Slides

[Slides Link](#)

### Contributors

Manuel Segarra - Github: [`Segarra99`](https://github.com/Segarra99) - Linkedin: [`manuel-segarra`](https://www.linkedin.com/in/manuel-segarra/)

Aamir Mushtaq - Github: [`Aamir269`](https://github.com/Aamir269) - Linkedin: [`aamirmushtaq269`](https://www.linkedin.com/in/aamirmushtaq269/)
