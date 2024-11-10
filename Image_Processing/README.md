# Image Processing API

## Project Description

This project is an API designed for two use cases:

1. **Placeholder API**: Allows you to place images into your frontend, with sizes set via URL parameters, to facilitate rapid prototyping.
2. **Image Resizing Library**: Provides properly scaled versions of images to reduce page load size. This eliminates the need to manually resize and upload multiple copies of the same image.

The project is set up using Node.js, TypeScript, and industry best practices to ensure it is scalable and maintainable. It includes unit testing, linting, and formatting to ensure that the codebase is easy to read, debug, and maintain for future enterprise-level expansions.

## Placeholder API Endpoint
The API peforms the logic explained above.

### Endpoint: `/placeholder`
Could be used as is and in that case the image processed will be in the default width and height confidgured in the API.
Or, could be used like that "http://localhost:4001/placeholder?width=500&height=500" and in that case the width and height will be the one's passed in the URL.(Both will be in the same colour defined in the API).

#### Method: `GET`

#### Response:

- Status: `200 OK`
- Body:
    Resized Image

## Image Resizing Library Endpoint
The API peforms the logic explained above.
### Endpoint: `/resize?image=Lion.jpg&width=400&height=500`
Shall be used as this.Given that, "Lion.jpg" must be in the "images" folder and the image size is that defined in the URL.

#### Method: `GET`

#### Response:

- Status: `200 OK`
- Body:
    Resized Image



## Health Check Endpoint

The API includes a health check endpoint that can be used to verify if the service is running correctly.

### Endpoint: `/health`

#### Method: `GET`

#### Response:

- Status: `200 OK`
- Body:
  ```json
  {
    "message": "Service is healthy!"
  }
