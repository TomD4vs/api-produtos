# 📦 RESTful Products API

## 📌 About

This project is a RESTful API built with Node.js and Express, focused on applying industry best practices, including:

* Semantic URIs (plural nouns)
* Proper HTTP methods
* Correct status codes
* Data validation
* Standardized responses

---

## ⚙️ Installation

```bash
npm init -y
npm install express colors dotenv
```

---

## ▶️ Running the application

```bash
node server.js
```

---

## 🔄 Run with auto-reload

```bash
node --watch server.js
```

---

## 🌐 Server

```
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
```

---

## 📡 Headers

All requests must include:

```
Content-Type: application/json
```

---

## 📁 Project Structure

```
products-api/
├── utils/
│   └── response.js
├── prints/
│   ├── errors/
│   │   ├── DELETE-erro.png
│   │   ├── GET-404.png
│   │   ├── PATCH-erro.png
│   │   ├── POST-create-erro.png
│   │   └── PUT-erro.png
│   ├── logs/
│   │   └── Logs.png
│   └── sucess/
│       ├── DELETE-products.png
│       ├── GET-product-id.png
│       ├── GET-products.png
│       ├── PATCH-product.png
│       ├── POST-products.png
│       └── PUT-products.png
├── server.js
├── package.json
└── README.md
```

---

## 🔗 Endpoints

| Method | Route          | Description                |
| ------ | -------------- | -------------------------- |
| GET    | /products      | List all products          |
| GET    | /products/{id} | Get product by ID          |
| POST   | /products      | Create a new product       |
| PUT    | /products/{id} | Fully update a product     |
| PATCH  | /products/{id} | Partially update a product |
| DELETE | /products/{id} | Delete a product           |
| GET    | /health        | API health check           |

---

## 📥 Example Request (POST)

```json
{
  "name": "Laptop",
  "price": 5000,
  "stock": 10,
  "category": "Electronics"
}
```

---

## 📤 Response Pattern

### ✅ Success

```json
{
  "status": 200,
  "type": "success",
  "message": "Operation completed successfully",
  "data": {}
}
```

---

### ❌ Error

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Product not found"
}
```

---

### ⚠️ Validation Error

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Name and price must be greater than zero"
}
```

---

## 📊 Example Responses

### GET /products — Success (200)

```json
[
  {
    "id": 1,
    "name": "Gaming Laptop",
    "price": 7500,
    "stock": 30,
    "category": "Electronics"
  }
]
```

---

### GET /products/{id} — Not Found (404)

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Product not found"
}
```

---

### POST /products — Created (201)

```json
{
  "status": 201,
  "type": "success",
  "message": "Product created successfully",
  "data": {
    "id": 3,
    "name": "Mouse",
    "price": 100,
    "stock": 20,
    "category": "Electronics"
  }
}
```

---

### POST /products — Validation Error (400)

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Name and price must be greater than zero"
}
```

---

## 🧪 Tests

Tested scenarios using Postman:

* ✅ GET /products → 200
* ❌ GET /products/{id} → 404
* ✅ POST valid → 201
* ❌ POST invalid → 400
* ✅ PUT → 200
* ✅ PATCH → 200
* ✅ DELETE → 204

---
## 📸 Test Evidence

### 🖥️ Logger
![Colored logger in terminal](./src/prints/logs/Logs.png)

---

### ✅ Success

#### GET /products — List Products (200)
![List products](./src/prints/sucess/GET-products.png)

#### GET /products/{id} — Get Product by ID (200)
![Get product by id](./src/prints/sucess/GET-product-id.png)

#### POST /products — Create Product (201)
![Create product](./src/prints/sucess/POST-products.png)

#### DELETE /products/{id} — Delete Product (204)
![Delete product](./src/prints/sucess/DELETE-products.png)

#### PATCH /products/{id} — Partially Update Product (200)
![Partial update](./src/prints/sucess/PATCH-product.png)

---

### ❌ Errors

#### GET /products/{id} — Product Not Found (404)
![Product not found](./src/prints/errors/PATCH-erro.png)

#### GET /invalid-route — Endpoint Not Found (404)
![Route not found](./src/prints/errors/GET-404.png)

---

## 📝 Logger

All requests are logged in the terminal:

```
GET /products - 200 - 2ms
POST /products - 201 - 0ms
PUT /products/5 - 200 - 1ms
DELETE /products/5 - 200 - 1ms
PATCH /products/2 - 200 - 1ms
GET /aaaaaaa - 404 - 1ms
GET /health - 200 - 1ms
POST /products - 400 - 1ms
PUT /products/5 - 404 - 0ms
GET /products - 200 - 1ms
PUT /products/4 - 400 - 1ms
PUT /products/88 - 404 - 1ms
DELETE /products/78 - 404 - 0ms
```

---

## 👨‍💻 Author

Elyton Moreira
