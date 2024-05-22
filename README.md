# Batch-3 Assignment-2: E-commerce Product Management

## Objective
Develop an Express application using TypeScript, integrated with MongoDB via Mongoose for efficient data management. Ensure data integrity through validation using Joi/Zod.

## Project Setup

### Prerequisites
- Node.js
- MongoDB

### Dependencies
- **Production Dependencies:**
  - `cors`: ^2.8.5
  - `dotenv`: ^16.4.5
  - `express`: ^4.19.2
  - `mongoose`: ^8.4.0
  - `zod`: ^3.23.8

- **Development Dependencies:**
  - `@eslint/js`: ^9.3.0
  - `@types/cors`: ^2.8.17
  - `@types/express`: ^4.17.21
  - `@types/node`: ^20.12.12
  - `@typescript-eslint/eslint-plugin`: ^7.10.0
  - `@typescript-eslint/parser`: ^7.10.0
  - `eslint`: ^8.57.0
  - `ts-node-dev`: ^2.0.0
  - `typescript`: ^5.4.5
  - `typescript-eslint`: ^7.10.0

### Installation

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Copy the `.env.example` file to `.env` and fill in your own values:
    ```bash
    cp .env.example .env
    ```

    Edit the `.env` file with your own values:
    ```env
    NODE_ENV=development
    PORT=5000
    DB_URL=your_mongodb_connection_string
    ```

4. **Run the application:**
    - **Development Mode:**
      ```bash
      npm run start:dev
      ```

    - **Production Mode:**
      ```bash
      npm run build
      npm run start:prod
      ```

5. **Access the application:**
    - **Local Server:** Open your browser and go to `http://localhost:5000/`
    - **Vercel Server:** Open your browser and go to [Express Server App on Vercel](https://express-server-app.vercel.app/)

## Available Scripts

- **`npm run build`**: Compiles the TypeScript code.
- **`npm run start:prod`**: Runs the compiled JavaScript code in the `dist` directory.
- **`npm run start:dev`**: Runs the application in development mode using `ts-node-dev`.
- **`npm run lint`**: Runs ESLint to check for linting errors.
- **`npm run lint:fix`**: Runs ESLint and automatically fixes any fixable linting errors.
- **`npm run prettier`**: Runs Prettier to format the code.
- **`npm run prettier:fix`**: Runs Prettier and automatically fixes any format issues.
- **`npm test`**: Placeholder for running tests.

## API Endpoints

### 1. Create a New Product
- **Endpoint:** `/api/products`
- **Method:** POST
- **Sample Request Body:**
    ```json
    {
        "name": "iPhone 13",
        "description": "A sleek and powerful smartphone with cutting-edge features.",
        "price": 999,
        "category": "Electronics",
        "tags": ["smartphone", "Apple", "iOS"],
        "variants": [
            {
                "type": "Color",
                "value": "Midnight Blue"
            },
            {
                "type": "Storage Capacity",
                "value": "256GB"
            }
        ],
        "inventory": {
            "quantity": 50,
            "inStock": true
        }
    }
    ```

### 2. Retrieve a List of All Products
- **Endpoint:** `/api/products`
- **Method:** GET

### 3. Retrieve a Specific Product by ID
- **Endpoint:** `/api/products/:productId`
- **Method:** GET

### 4. Update Product Information
- **Endpoint:** `/api/products/:productId`
- **Method:** PUT

### 5. Delete a Product
- **Endpoint:** `/api/products/:productId`
- **Method:** DELETE

### 6. Search a Product
- **Endpoint:** `/api/products?searchTerm=iphone`
- **Method:** GET

### 7. Create a New Order
- **Endpoint:** `/api/orders`
- **Method:** POST
- **Sample Request Body:**
    ```json
    {
        "email": "user@example.com",
        "productId": "60c72b2f9b1d8c1a5a8e4f5b",
        "price": 999,
        "quantity": 1
    }
    ```

### 8. Retrieve Orders by User Email
- **Endpoint:** `/api/orders?email=user@example.com`
- **Method:** GET

### 9. Retrieve All Orders
- **Endpoint:** `/api/orders`
- **Method:** GET

## Data Models

### Product Data Types
- **name (string):** The name of the product.
- **description (string):** A brief description of the product.
- **price (number):** The price of the product.
- **category (string):** The category to which the product belongs.
- **tags (array of strings):** An array of tags or keywords associated with the product.
- **variants (array of objects):** An array containing different variants or options of the product, such as size, color, or style.
  - **type (string):** The type of variant (e.g., size, color).
  - **value (string):** The specific value of the variant (e.g., "Small", "Red").
- **inventory (object):** An object representing the product's inventory details.
  - **quantity (number):** The available quantity of the product in stock.
  - **inStock (boolean):** Indicates whether the product is currently in stock.

### Order Data Types
- **email (string):** The email address of the user placing the order.
- **productId (string):** The ID of the product being ordered.
- **price (number):** The price of the product.
- **quantity (number):** The quantity of the product ordered.

## Project Structure

src/
├── app/
│ ├── modules/
│ │ ├── product/
│ │ │ ├── product.controller.ts
│ │ │ ├── product.interface.ts
│ │ │ ├── product.model.ts
│ │ │ ├── product.route.ts
│ │ │ ├── product.service.ts
│ │ ├── order/
│ │ │ ├── order.controller.ts
│ │ │ ├── order.interface.ts
│ │ │ ├── order.model.ts
│ │ │ ├── order.route.ts
│ │ │ ├── order.service.ts
│ ├── validation/
│ │ ├── validation.ts
├── app.ts
├── server.ts