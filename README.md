<br />
<p align="center">

  <h3 align="center">Private Cloud</h3>

  <p align="center">
    Creating a cloud drive that you can self-host
    <br />
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
* [Usage](#usage)
* [API Reference](#api-reference)
  * [Auth](#auth)
  * [Files](#files)
  * [File Info](#fileinfo)
  * [Access Control](#accesscontrol)


## About The Project

This project stores collections of files uploaded to a remote server, where users are then free to add, modify, or delete the images in their collections.
A very simple frontend is written in React (work in progress).

This app uses a React, Node.js, Express, MongoDB stack, and it's hosted on a my personal VPS via Docker. On the backend, user data is stored in a MongoDB database, whereas the actual image files themselves are stored directly onto the disk. I'm using Express to route requests and return the appropriate responses, the specifications of which are noted below in the API reference.

## Usage

The easiest way to see this project in action is to visit the simple frontent at clone and run npm start in the root dir. Then you must create a user by signing up with your own user credentials (see API reference below). **A frontend is currently under development and will be publicly deployed soon.**

## API Reference

At its core, this project is driven by an RESTful-type API written with Node.js and Express framework, acting as an interface between the client application and the file server/database that holds the user's images and information on the backend.

### Auth
You must be an authenticated user to access the API. Authentication endpoints are located at the /api/auth/* path. As you'd expect, both return an access token upon successful authentication, but only signup will register a new user in the process. 


#### Login
```http
POST /api/auth/login
```

| Body | Type | Description |
| :--- | :--- | :--- |
| `username` | `string` | this user's username |
| `password` | `string` | this user's password |
| `cookie` | `boolean` | (optional) sets token in httpOnly cookie if true |


#### Signup
```http
POST /api/auth/signup
```

| Body | Type | Description |
| :--- | :--- | :--- |
| `username` | `string` | this user's username |
| `password` | `string` | this user's password |


#### Verify Token
```http
GET /api/auth/
```
Returns ```{ isAuthorized: true }``` if a valid token is supplied by the caller, either in the x-token header or as an httpOnly cookie


#### Delete Token
```http
DELETE /api/auth/
```
Deletes the caller's httpOnly token cookie if present


### Files
This set of endpoints allows you to perform CRUD operations on the collection of files themselves. True to philosophy, folder are considered files here. **All endpoints require an 'x-token' header or an httpOnly cookie containing an access token, unless otherwise stated**


#### Get File
```http
GET /api/file/:path
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `:path` | `string` | (optional) specifies a specific file name to query for |

Gets this user's file(s) at path. If path points to an individual file, that file will be returned. Otherwise if path points to a directory, that directory and its contents will be zipped and returned. Files through this endpoint are only accessible to the user that owns them, unless the isPublic flag is set to true (see Access Control)


#### Upload File
```http
POST /api/file/:path
```
| Body | Type | Description |
| :--- | :--- | :--- |
| `:path` | `string` | path of folder to upload to |
| `files` | `MIME-type File(s)` | a collection of images to upload to this user's repository |

Uploads file(s) to the folder at path. If 'path' points to a nonexistent file and its parent is defined, then calling this endpoint creates a folder at that path. Otherwise if a folder exists at path, the contents of 'files' will be uploaded to path. If path is not supplied, files will be uploaded to the user root directory


#### Delete File
```http
DELETE /api/file/:path
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `:path` | `string` | path for file to delete |

Deletes the file at path from this user's repository, if it exists.


### File Info
These endpoints get information about file metadata. **All endpoints require an 'x-token' header or an httpOnly cookie containing an access token.**


#### Get File Info
```http
GET /api/metadata/:path
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `:path` | `string` | (optional) specifies a specific file name to query for |

Gets the file info for this file. Returns a json with the following shape:
```
{
  owner: string,                // file owner's uuid
  isDir: boolean,               // true if dir
  isPublic: boolean,            // true if file is public
  size: number,                 // file's size in bytes

  name: string,                 // file name
  path: string,                 // full file path
  parent: string | undefined,   // path of parent

  filetype: string | undefined, // file extension, or undefined if dir
  lastModified: number,         // last modified date
  files: [{
    path: string,
    name: string,
    isDir: boolean
  }],                           // file info of children files (if dir)
}
```


### Accesss Control
These endpoints allows for controlling the access level for user files. **All endpoints require an 'x-token' header or an httpOnly cookie containing an access token.**


#### Set Public Access Level
```http
GET /api/metadata/:path
```
| Body | Type | Description |
| :--- | :--- | :--- |
| `:path` | `string` | the path to the target file, or empty if targeting user root directory |
| `isPublic` | `boolean` | grants access to everyone if isPublic is true |

Sets the access level for this file. A public access level means anyone with the right url can access this file. A private access level means only this user can access. (More levels to come)
