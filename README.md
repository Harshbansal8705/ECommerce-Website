# Ecommerce Website

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction
This repository contains an Ecommerce website built using the MERN stack (MongoDB, Express, React, and Node.js). The application allows users to browse products, add them to the cart, and purchase them. The application is hosted live at [ecommerce-steel-eight.vercel.app](https://ecommerce-steel-eight.vercel.app).

## Features
- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- Order management
- Responsive design

## Technologies
- MongoDB
- Node.js
- Express.js
- React
- Vercel (for hosting)

## Installation and Usage
To set up this project locally, follow these steps:

### Backend (Node.js + Express)
1. Clone the repository:
    ```bash
    git clone https://github.com/Harshbansal8705/ECommerce-Website.git
    cd ECommerce-Website/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and add the necessary environment variables:
    ```plaintext
    MONGODB_URI = <your-mongodb-uri>
    JWT_SECRET = <your-jwt-secret>
    ```

4. Populate the MongoDB database with dummy product data:
    ```bash
    node processor/dbgenerate.js
    ```

5. Start the backend server:
    ```bash
    npm start
    ```

### Frontend (React)
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Create a `.env` file and add the necessary environment variables:
    ```plaintext
    REACT_APP_BACKEND_URL = <your-backend-server-url>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

4. Start the frontend development server:
    ```bash
    npm start
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to use the application locally.

## Project Structure
```plaintext
ECommerce-Website/
├── backend/
│   ├── api/
│   ├── controller/
│   ├── middlewares/
│   ├── model/
│   ├── processor/
│   ├── package-lock.json
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package-lock.json
│   ├── package.json
│   └── tailwind.config.js
├── .gitignore
└── README.md
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
