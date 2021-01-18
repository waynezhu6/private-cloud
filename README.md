<br />
<p align="center">

  <h3 align="center">Shopify Backend Challenge</h3>

  <p align="center">
    Building an image repository
    <br />
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
* [Usage](#usage)
* [API Reference](#api-reference)
  * [Authentication](#apiauth)
  * [Images](#apiimages)

## About The Project

This project stores collections of images uploaded to a cloud file server, where users are then free to add, modify, or delete the images in their collections.
A very simple frontend has been written in React.

This app uses a React, Node.js, Express, MongoDB stack, and it's hosted on a Google Compute Engine cloud instance. On the backend, user data is stored in a MongoDB database, whereas the actual image files themselves are stored directly onto the disk. I'm using Express to route requests and return the appropriate responses, the specifications of which are noted below in the API reference.

## Usage

The easiest way to see this project in action is to visit the simple frontent at [http://34.123.191.140:5000](http://34.123.191.140:5000). **There, you can login with the preexisting sample user with username "user" and password "1234"**, or choose to signup with your own user credentials. There you should be able to see two images that I've uploaded. To upload more, click upload and choose the appropriate images. Once uploaded, you should see the page change accordingly.

Otherwise, the API is hosted at [http://34.123.191.140:5000/api/*](http://34.123.191.140:5000/api/*), where you can interact with it directly.

## API Reference

At its core, this project is driven by an RESTful-type API written with Node.js and Express framework, acting as an interface between the client application and the file server/database that holds the user's images and information on the backend.

### /api/auth/

You must be an authenticated user to access the API. Authentication endpoints are located at the /api/auth/* path. As you'd expect, both return an access token upon successful authentication, but only signup will register a new user in the process. 

```http
GET /api/auth/login
GET /api/auth/signup
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `username` | `string` | this user's username |
| `password` | `string` | this user's password |

### /api/images/

This set of endpoints allows you to perform CRUD operations on the collection of images themselves. **All of these endpoints require a header called 'x-token' specifying the access token issued after authentication.**

```http
GET /api/images/:id
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `:id` | `string` | (optional) specifies a specific file name to query for |

Gets this user's images. If the :id parameter is left empty, this endpoint will instead return an array of filenames for the photos in this user's repository

```http
POST /api/images/
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `image` | `image/* MIME-type File(s)` | a collection of images to upload to this user's repository |

Uploads an image(s) to this user's repository. If the :id parameter is left empty, this endpoint will instead return an array of filenames for the photos in this user's repository

```http
DELETE /api/images/
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `:id` | `string` | specifies a specific file name to delete |

Deletes the specified image from this user's repository, if it exists. **Not functioning yet**
