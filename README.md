# PowerPulse Fitness Equipment and Accessories Backend Application

# Description

PowerPulse Fitness is a web application with a backend system that manages fitness products, categories, prices, stock, and customer features like add to cart, product reviews, checkout, and address management. It handles product listing, filtering, sorting, and stock updates. Built with Express and MongoDB, it ensures smooth shopping, wishlist, and checkout experiences

## Features

- **User Authentication:** Users can sign up, log in, and manage their wishlist. Each user will see their own specific wishlist, and they can add or remove items in real-time.
- **Product and Cart Management:**
  - Users can browse, search, and filter fitness products by categories and price ranges.
  - Users can add products to the cart and manage the quantity of each product, with stock limits enforced.
  - Duplicate products in the cart will increase the quantity instead of adding a new item.
  - Real-time updates ensure product stock is accurately reflected when orders are placed.
- **Wishlist Management:** Users can add and remove products from their wishlist, with functionality tied to individual user accounts. The wishlist will be saved and managed in real-time, specific to each user.
- **Product Review System:** Customers can leave reviews for products they purchase. These reviews are displayed on the product details page.
- **Checkout and Payment Management:**
  - Users can proceed to checkout after adding products to the cart, where they can enter their shipping address and choose a payment method.
  - **Two payment options**: Cash on Delivery and Stripe integration. Stock is automatically updated after successful order placement
  - **Admin Product Management:**
  - Admins can manage products (add, update, delete) in real-time. A product list is displayed in a table format with actions to edit or delete products.
  - Image upload for products is handled via cloudinary.
- **Error Handling:** Proper error messages are displayed for invalid inputs or failed operations.

## Technology Stack

- **Programming Language:** TypeScript,Node.js
- **Web Framework:** Express.js
- **Database:** MongoDB (using Mongoose for ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Error Handling:** Custom middleware
- **File Storage & Media Management:** Cloudinary (for image storage)
- **Deployment:** Deployed on Vercel

## Installation and Setup

1. Clone the repository:

```
https://github.com/tonoy3125/PowerPulseFitness-Equipment-and-Accessories-Backend
```

2. Install dependencies:

```
cd powerPulsefitness-equipment-and-accessories-backend
npm install
```

3. Set up environment variables:
   Create a `.env` file with the following variables:

```
NODE_ENV=development
PORT=5000
DB_URI=Your Mongodb connnection Uri
BCRYPT_SALT_ROUNDS= any number
JWT_ACCESS_SECRET= Your JWT Secret
JWT_ACCESS_EXPIRES_IN= Your Jwt Token Expire time
JWT_REFRESH_SECRET= Your JWT Secret
JWT_REFRESH_EXPIRES_IN= Your Jwt Token Expire time
CLOUDINARY_CLOUD_NAME= your cloudinary cloud name
CLOUDINARY_API_KEY= your cloudinary secret api
CLOUDINARY_API_SECRET=your cloudinary secret key
EMAIL_USER= your email
EMAIL_PASS= your nodemailer pass
STRIPE_SECRET_KEY=your stripe secret key

```

4. Start the server:

```
npm run start:dev
```

5. Access the application in your browser at `http://localhost:5000`

## API Documentation

- **Authentication Routes:**

  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user.
  - `POST /api/auth/change-password`: Change the password for an authenticated user.
  - `POST /api/auth/refresh-token`: Refresh the access token for an authenticated user.
  - `POST /api/auth/forget-password`: Request a password reset link for a user who forgot their password.
  - `POST /api/auth/reset-password`: Reset the password using a token provided from the password reset request.

- **Product Routes:**

  - `POST /api/products`: Create a Product. (Only Accessible by Admin)
  - `GET /api/products:` Get all Products.
  - `GET /api/products/:id`: Get a specific Product by ID.
  - `GET /api/products/discounts:` Get all Products with discounts..
  - `GET /api/products/advertise:` Get all advertised Products.
  - `GET /api/products/category-count:` Get the count of Products per category.
  - `GET /api/products/stock-count:` Get the stock count of all products.
  - `GET /api/products/category/:category:` Get all products by category name.
  - `GET /api/products/category/:id:` Get all products by category ID.
  - `PUT /api/products/:id`: Update a product by ID. (Only Accessible by Admin)
  - `PATCH /api/products/discount`: Update product discounts. (Only Accessible by Admin)
  - `POST /api/products/discounts/remove-expired`: Remove expired discounts from products. (Only Accessible by Admin)
  - `PATCH /api/products/remove-discount/:id`: Remove a discount from a product by ID. (Only Accessible by Admin)
  - `PATCH /api/products/advertise/:id`: Mark a Product as advertised by ID. (Only Accessible by Admin)
  - `PATCH /api/products/remove-advertise/:id`: Remove advertised status from a Product by ID. (Only Accessible by Admin)
  - `DELETE /api/products/:id`: Soft delete a Product by ID. (Only Accessible by Admin)

- **Wishlist Routes:**

  - `POST /api/wishlist/:productId`: Toggle wishlist item (add or remove a product from the user's wishlist)
  - `GET /api/wishlist`: Get all wishlist items for the authenticated user.
  - `DELETE /api/wishlist/clear/all`: Clear all wishlist items for the authenticated user.

- **Add To Cart Routes:**

  - `POST /api/addToCart`: Add a product to the cart for the authenticated user.
  - `PATCH /api/addToCart/increase-quantity`: Increase the quantity of a product in the cart for the authenticated user.
  - `PATCH /api/addToCart/decrease-quantity`: Decrease the quantity of a product in the cart for the authenticated user.
  - `DELETE /api/addToCart/remove`: Remove a product from the cart for the authenticated user.

- **Checkout Routes:**

  - `POST /api/checkout`: Create a new checkout for the authenticated user.
  - `GET /api/checkout`: Get all checkout records (Only Accessible by Admin).
  - `GET /api/checkout/user-order`: Get all checkout records for the authenticated user.
  - `GET /api/checkout/:id`: Get a single checkout by ID for the authenticated user.
  - `PATCH /api/checkout/status/:id`: Update the checkout status by ID.(Only Accessible by Admin)
  - `DELETE /api/checkout/:id`: Remove checkout data by ID (Only Accessible by Admin)

- **Payment Routes:**

  - `POST /api/create-intent`: Create a new payment intent for the authenticated user.

- **Product Review Routes:**

  - `POST /api/review`: Submit a new product review for the authenticated user.
  - `GET /api/review`: Get all reviews. (Only accessible by Admin)
  - `GET /api/review/accepted`: Get all accepted reviews.
  - `GET /api/review/pending`: Get all pending reviews..
  - `PATCH /api/review/status`: Update the status of a review. (Only Accessible by Admin)
  - `DELETE /api/review/pending`: Delete a pending review.
  - `GET /api/review/:id`: Get a specific review by ID.(Only Accessible by Admin)

- **Address Routes:**

  - `POST /api/address`: Create a new address for the authenticated user.
  - `GET /api/address`: Get all addresses for the authenticated user.
  - `PUT /api/address/:id`: Update an address by ID for the authenticated user.
  - `DELETE /api/address/:id`: Delete an address by ID for the authenticated user.
