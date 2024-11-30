# Universal Inventory System

## 📦 Overview

Universal Inventory System is a robust, scalable inventory management solution built with Express.js and Firebase Firestore. This project provides a flexible, feature-rich backend for tracking products across various industries, supporting both physical and digital goods.


## ✨ Features

- 🌐 Multi-language Product Support
- 📊 Comprehensive Product Schema
- 🔍 Advanced Filtering and Pagination
- 🛡️ Input Validation
- 📝 Comprehensive Error Handling
- 🌍 Geo-Specific Product Variations

## 🚀 Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** Firebase Firestore
- **Validation:** Express-Validator
- **Environment:** dotenv

## 📋 Prerequisites

- Node.js (v16+ recommended)
- Firebase Account
- npm or Yarn

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/universal-inventory-system.git
cd universal-inventory-system
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Generate a service account key
- rename the file to firebase-credentials.json and put it in the main folder
- Download the JSON credentials

4. Set up environment variables
Create a `.env` file in the project root:
```
PORT=3000
FIREBASE_API_KEY=API_KEY
FIREBASE_AUTH_DOMAIN=AUTH_DOMAIN
FIREBASE_PROJECT_ID=PROJECT_ID
FIREBASE_STORAGE_BUCKET=STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID=MESSAGING_SENDER_ID
FIREBASE_APP_ID=APP_ID
FIREBASE_MEASUREMENTID=MEASUREMENTID
FIREBASE_CLIENT_EMAIL=CLIENT_EMAIL
PORT=3000
```

## 🖥️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 📘 API Endpoints

### Product Endpoints

| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| POST   | /api/products     | Create a new product            |
| GET    | /api/products     | List products (with pagination) |
| GET    | /api/products/:id | Retrieve a specific product     |
| PUT    | /api/products/:id | Update a product                |
| DELETE | /api/products/:id | Delete a product                |

### Query Parameters for Listing Products

- `page`: Page number
- `limit`: Number of items per page
- `sortBy`: Field to sort by
- `sortOrder`: Sort direction (asc/desc)
- Filter by any product attribute

## 🔍 Example Requests

### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
     -H "Content-Type: application/json" \
     -d '{
           "name": {"en": "Classic T-Shirt"},
           "pricing": {"basePrice": 29.99, "currency": "USD"},
           "categories": {"primary": "Clothing"}
         }'
```

### List Products
```bash
# Get first page, 10 items, sorted by price
GET /api/products?page=1&limit=10&sortBy=pricing.basePrice&sortOrder=asc
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

## 📦 Project Structure
```
universal-inventory-system/
│
├── config/             # Configuration files
├── controllers/        # Request handlers
├── middleware/         # Express middleware
├── models/             # Data models
├── routes/             # API route definitions
├── utils/              # Utility functions
└── server.js           # Main application entry
```

## 🔒 Security Features

- Input validation
- Error handling middleware
- Firestore security rules

## 🚧 Planned Improvements

- [ ] Add authentication
- [ ] Implement caching
- [ ] Create more advanced filtering
- [ ] Add comprehensive logging
- [ ] Develop Swagger documentation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.


Project Link: [https://github.com/rafiklebylka/stock_api](https://github.com/rafiklebylka/stock_api)

## 🙏 Acknowledgements

- Express.js
- Firebase
- Node.js Community
```
