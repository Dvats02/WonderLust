## WonderLust Architecture

### Overview
WonderLust is an Express.js MVC web application backed by MongoDB. It renders server-side EJS views, uses Passport for authentication (local + Google OAuth), integrates Razorpay for payments, and stores media in Cloudinary. Validation is handled via Joi and app-specific middleware.

### Tech Stack
- **Runtime**: Node.js (Express 4)
- **Templating**: EJS with `ejs-mate` layouts
- **Database**: MongoDB via Mongoose
- **Auth**: Passport (Local, Google OAuth 2.0)
- **Payments**: Razorpay
- **Sessions/Flash**: `express-session`, `connect-flash`
- **Validation**: Joi
- **Media**: Cloudinary (planned integration)

### High-Level Architecture
- **app.js** wires Express, sessions, Passport, views, static files, routes, error handling, and DB connection.
- **Routes** map HTTP endpoints to controller actions with middleware for auth and validation.
- **Controllers** implement page and API logic, fetch/update MongoDB models, and render EJS views.
- **Models** define Mongoose schemas and relationships (User, Listing, Review, Wishlist).
- **Views** are EJS templates organized by feature (listings, users, auth).
- **Utils** provide Passport configuration, error helpers, and async wrapping.

### Directory Structure
```text
workspace/
  app.js
  package.json
  README.md
  ARCHITECTURE.md
  .gitignore
  cloudconfig.js              # Cloudinary configuration
  schema.js                   # Joi validation schemas
  middleware.js               # AuthZ, validation, and helpers
  Controllers/
    listing.js
    reviews.js
    user.js
  Models/
    listing.js
    Review.js
    Wishlist.js
    user.js
  Routes/
    listing.js
    review.js
    user.js
    wishlist.js
    payment.js                # Razorpay endpoints mounted at /api
  utils/
    ExpressErrors.js
    WrapAsync.js
    passport.js               # Google OAuth strategy
  views/
    layouts/boilerplate.ejs
    index.ejs
    listings/
      index.ejs new.ejs edit.ejs show.ejs checkout.ejs payment/
    users/
      login.ejs signup.ejs profile.ejs listings.ejs changePassword.ejs wishlist.ejs
    auth/
      forgot-password.ejs reset-password.ejs
  public/                     # Static assets
```

### Request Flow
1. Client requests route → Express route handler
2. Route applies middleware (`isLoggedIn`, `isOwner`, Joi validators)
3. Controller executes business logic, calls Mongoose models
4. Controller renders EJS view or returns JSON (for payment APIs)
5. Errors flow to centralized error handler rendering `listings/Error.ejs`

### Data Models
- **User** (`Models/user.js`)
  - Fields: `email`, `googleId`, `resetToken`, `resetTokenExpiry`, `wishlist[]`
  - Local auth via `passport-local-mongoose` adds username, password hash, helpers
  - Relations: `wishlist` references `Wishlist`

- **Listing** (`Models/listing.js`)
  - Fields: `title`, `description`, `image{url, filename}`, `location`, `country`, `price`, `reviews[]`, `owner`
  - Hooks: post-delete cascades to delete associated `Review`s

- **Review** (`Models/Review.js`)
  - Fields: `comment`, `rating`, `createdAt`, `author`
  - Relation: `author` references `User`

- **Wishlist** (`Models/Wishlist.js`)
  - Fields: `user_id`, `places[]` where each place has `place_id`, `name`, `location`, `image_url`, `description`, `addedAt`

### Authentication & Authorization
- **Local Auth**: Passport Local with session-based authentication
  - Registration/Login: `Controllers/user.js` (`/signup`, `/login`)
  - Sessions: `express-session` with cookie settings in `app.js`
- **Google OAuth**: Configured in `utils/passport.js` using env vars for client ID/secret and callback URL
- **Authorization**: Middleware-based checks
  - `isLoggedIn` enforces authentication
  - `isOwner` ensures listing ownership
  - `reviewOwner` ensures review authorship

### Validation
- **Joi Schemas** (`schema.js`)
  - `listingSchema` validates listing creation/update payloads
  - `reviewSchema` validates review payloads
- **Middleware**: `validateListing`, `validateReview` enforce schemas and raise `ExpressError`

### Views & Templating
- EJS with `ejs-mate` layout (`views/layouts/boilerplate.ejs`)
- Feature-oriented templates: `views/listings/*`, `views/users/*`, `views/auth/*`
- Flash messages set in middleware and consumed in templates

### Payments (Razorpay)
- Routes mounted under `/api` in `app.js`
  - `POST /api/createOrder`: creates Razorpay order (amount provided by client)
  - `POST /api/paymentVerify`: verifies signature and returns JSON status
- Server verification uses HMAC SHA-256 signature check
- Recommendation: move `key_id` and `key_secret` to environment variables; do not hardcode

### Media Storage (Cloudinary)
- `cloudconfig.js` configures Cloudinary and `multer-storage-cloudinary`
- Current create/update flows set listing `image` from request URL; file uploads can integrate with configured storage in future

### Configuration & Environment
Set the following environment variables:
- `MONGODB_URL`: MongoDB connection string
- `SESSION_SECRET`: Session signing secret
- `PORT`: Server port (default 8080)
- `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`: Cloudinary credentials
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`: Google OAuth
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`: Razorpay credentials (recommended)

### Error Handling
- Custom `ExpressError` with `{ statusCode, message }`
- Catch-all route forwards 404 to centralized error handler
- Error handler renders `listings/Error.ejs` with status code and message

### Security Considerations
- Session cookies are `httpOnly`; consider setting `secure` and `sameSite` in production
- Add `helmet` for HTTP headers, CSRF protection for form endpoints, and rate limiting
- Sanitize inputs against NoSQL injection and XSS; validate all payloads via Joi
- Store all secrets in environment variables

### Local Development
```bash
npm install
npm start
```
Requires a running MongoDB and the necessary environment variables set in a `.env` file.

### Deployment Notes
- Provide env vars at deploy time and enable `secure` cookies behind HTTPS
- Scale using a process manager (e.g., PM2) and connection-pooled MongoDB
- Serve static assets via CDN and set long-lived cache headers in `public/`

### Endpoint Summary
- Listings: `GET /Listings`, `GET /Listings/new`, `POST /Listings`, `GET /Listings/:id`, `GET /Listings/:id/edit`, `PUT /Listings/:id`, `DELETE /Listings/:id`
- Reviews: `POST /Listings/:id/reviews`, `DELETE /Listings/:id/reviews/:reviewId`
- Users: `GET/POST /signup`, `GET/POST /login`, `GET /logout`, `GET /profile`, `GET /user/listings`, `GET/POST /user/change-password`
- OAuth: `GET /auth/google`, `GET /auth/google/callback`
- Wishlist: `POST /Listings/:listingId/wishlist`, `GET /wishlist`
- Payments (API): `POST /api/createOrder`, `POST /api/paymentVerify`
