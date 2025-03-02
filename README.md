# NodeJS Real Estate API

This project is a Node.js-based API for managing real estate listings, including cities, categories, apartments, and advertisers. The API allows for creating, updating, retrieving, and deleting various entities related to real estate.

## Project Structure

### Controllers

- **advertiser.js**: Handles operations related to advertisers, such as registration, login, and updating advertiser information.
- **apartments.js**: Manages apartment listings, including creating, updating, retrieving, and deleting apartments.
- **category.js**: Manages categories for apartments, including creating, updating, and retrieving categories.
- **city.js**: Manages cities, including creating, updating, and retrieving city information.

### Models

- **advertiser.js**: Defines the schema for advertisers using Mongoose.
- **apartments.js**: Defines the schema for apartments using Mongoose.
- **category.js**: Defines the schema for categories using Mongoose.
- **city.js**: Defines the schema for cities using Mongoose.

### Routers

- **advertiser.js**: Defines routes for advertiser-related operations.
- **apartments.js**: Defines routes for apartment-related operations.
- **category.js**: Defines routes for category-related operations.
- **city.js**: Defines routes for city-related operations.

### Middlewares

- **middlewares.js**: Contains middleware functions for tasks such as email validation, token checking, and file uploads.

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    
```sh    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    SECRET=<your-secret-key>
    ```

4. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### Advertisers

- `GET /advertisers`: Retrieve all advertisers.
- `POST /advertisers/register`: Register a new advertiser.
- `POST /advertisers/login`: Login an advertiser.
- `PATCH /advertisers/:id`: Update an advertiser.
- `PATCH /advertisers/:id/tokens`: Add tokens to advertisers.

### Apartments

- `GET /apartments`: Retrieve all apartments.
- `POST /apartments`: Create a new apartment.
- `POST /apartments/with-pic`: Create a new apartment with a picture.
- `PATCH /apartments/:id`: Update an apartment.
- `DELETE /apartments/:id`: Delete an apartment.
- `GET /apartments/getById/:id`: Retrieve an apartment by ID.
- `GET /apartments/getByCategory/:id`: Retrieve apartments by category.
- `GET /apartments/getByCity/:id`: Retrieve apartments by city.
- `GET /apartments/getByBedsLt/:beds`: Retrieve apartments with beds less than or equal to a specified number.
- `GET /apartments/getByBedsBg/:beds`: Retrieve apartments with beds greater than a specified number.
- `GET /apartments/getByBedseq/:beds`: Retrieve apartments with beds equal to a specified number.
- `GET /apartments/getByPriceLt/:price`: Retrieve apartments with price less than a specified amount.
- `GET /apartments/getByPriceMi/:price`: Retrieve apartments with price between specified amounts.
- `GET /apartments/getByPriceBg/:price`: Retrieve apartments with price greater than a specified amount.
- `GET /apartments/getByAdvertiser/:id`: Retrieve apartments by advertiser.

### Categories

- `GET /categories`: Retrieve all categories.
- `POST /categories`: Create a new category.
- `PATCH /categories/:id`: Update a category.

### Cities

- `GET /cities`: Retrieve all cities.
- `POST /cities`: Create a new city.
- `PATCH /cities/:id`: Update a city.

## License

This project is licensed under the MIT License.
