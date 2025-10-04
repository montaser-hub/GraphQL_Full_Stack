Absolutely! I can update your README to reflect both your **frontend React app** and **backend GraphQL server** setup, including CRUD operations for Users and Companies, proper instructions for running both servers, and any GraphQL notes. Here’s a polished version:

---

# React + GraphQL CRUD App

This project is a full-stack **React + Apollo Client frontend** with a **Node.js + Express + GraphQL + MongoDB backend**, managing **Users** and **Companies** with full CRUD operations.

---

## **Backend Setup**

The backend uses:

* Node.js + Express
* GraphQL (`express-graphql`)
* MongoDB via Mongoose
* GraphQL object types for `User` and `Company`

### **Installation**

1. Go to the `server` folder:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm run dev
```

> The backend runs by default on `http://localhost:4000/graphql`.

---

### **Backend Scripts**

* `npm run dev` – Starts server with `nodemon` for auto-reload.
* `npm start` – Starts server in production mode.

---

### **GraphQL Endpoints**

#### **Queries**

* `users`: Get all users with optional company details.
* `user(id: ID!)`: Get a single user.
* `companies`: Get all companies with their users.
* `company(id: ID!)`: Get a single company.

#### **Mutations**

* `createUser(firstName: String!, age: Int!, companyId: ID)`: Create a new user.
* `updateUser(id: ID!, firstName: String, age: Int, companyId: ID)`: Update a user.
* `deleteUser(id: ID!)`: Delete a user (returns `"User deleted"` string).
* `createCompany(name: String!, slogan: String!)`: Create a new company.
* `updateCompany(id: ID!, name: String, slogan: String)`: Update a company.
* `deleteCompany(id: ID!)`: Delete a company (returns `"Company deleted"` string).

---

## **Frontend Setup**

The frontend uses:

* React (Create React App)
* Apollo Client
* GraphQL queries and mutations for CRUD operations
* Functional components with hooks for state and Apollo queries/mutations

### **Installation**

1. Go to the `client` folder:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm start
```

> Open [http://localhost:3000](http://localhost:3000) in your browser. It is proxied to the backend GraphQL server.

---

### **Frontend Scripts**

* `npm start` – Runs the app in development mode.
* `npm test` – Launches tests.
* `npm run build` – Builds the app for production.
* `npm run eject` – Ejects CRA config (one-way operation).

---

### **Frontend Features**

* **Users Page**:

  * List all users with age and company
  * Add, edit, delete users
  * Assign users to companies

* **Companies Page**:

  * List all companies with users
  * Add, edit, delete companies
  * Shows related users

> Deletion now works properly; GraphQL returns a string confirmation instead of the object to avoid 400 errors.

---

### **Example GraphQL Queries/Mutations**

**Get Users**

```graphql
query GetUsers {
  users {
    id
    firstName
    age
    company {
      id
      name
    }
  }
}
```

**Delete User**

```graphql
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
```

**Delete Company**

```graphql
mutation DeleteCompany($id: ID!) {
  deleteCompany(id: $id)
}
```

---

### **Learn More**

* [React Documentation](https://reactjs.org/)
* [Create React App Docs](https://facebook.github.io/create-react-app/docs/getting-started)
* [Apollo Client Docs](https://www.apollographql.com/docs/react/)
* [GraphQL Docs](https://graphql.org/learn/)

---

### **Notes**

* Backend uses `GraphQLString` return type for delete mutations to simplify frontend queries.
* Users can optionally be linked to a company.
* Frontend forms validate required fields and auto-refetch data after CRUD operations.
* Backend MongoDB connection should be configured via `.env` file with `MONGO_URI`.


