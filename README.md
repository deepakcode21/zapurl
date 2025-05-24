# ZapURL

![GitHub issues](https://img.shields.io/github/issues/deepakcode21/zapurl) ![GitHub pull requests](https://img.shields.io/github/issues-pr/deepakcode21/zapurl) ![License](https://img.shields.io/github/license/deepakcode21/zapurl) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb\&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express\&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?logo=react\&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)

**ZapURL** is a simple URL shortener built with the MERN (MongoDB, Express, React, Node.js) stack. It provides an easy-to-use interface where users can input a long URL and instantly receive a shorter link for sharing. The frontend is built with React, the backend uses Node.js/Express, and MongoDB stores the mappings between short links and original URLs. This lightweight tool focuses on core URL shortening functionality without advanced features like custom aliases or analytics. (Replace the demo link below with your deployed URL once available.)

## Demo

Check it live [ZapUrl Live](https://zapurl-three.vercel.app/)

## Features

* **Short URL Generation:** Quickly shorten any long URL to a compact link.
* **Minimal Interface:** User-friendly and straightforward UI with no clutter.
* **Core Functionality:** Focused on basic shortening; does **not** support custom aliases, link expiration, or tracking/analytics.
* **MERN Stack:** Built using MongoDB for data storage, Express and Node for the API, and React for the frontend.

## Tech Stack

ZapURL is built on the **MERN** stack (MongoDB, Express.js, React, Node.js):

* **MongoDB:** Used to store URL mappings (short code & original URL).
* **Express.js:** Serves as the web framework for the Node.js backend API.
* **React:** Provides the client-side UI, allowing users to enter URLs and see results instantly.
* **Node.js:** Runs the backend server, handling requests and communicating with the database.

Each technology is chosen for its strengths in building a modern, JavaScript-driven full-stack application.

## Getting Started

To set up and run ZapURL on your local machine, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/deepakcode21/zapurl.git
   cd zapurl
   ```

2. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Create a `.env` file** in the `server` directory with your environment variables. For example:

   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=5000
   ```

   *(Replace the placeholder values with your actual configuration. These are example variables; adjust names/values as needed.)*

4. **Start the application**
   Open two terminal windows (or tabs) and run the following commands:

   ```bash
   # In the first terminal: start the backend server
   cd server
   npm run dev

   # In the second terminal: start the React frontend
   cd client
   npm run dev
   ```

   The React app will typically run on [http://localhost:5173](http://localhost:5173) and the server on port 5000 (or whatever you set in `.env`).

Once both frontend and backend are running, visit `http://localhost:5173` in your browser to use ZapURL.

## Project Structure

```
zapurl/
├── client/          # React frontend application
│   ├── src/         # React source files (components, etc.)
│   ├── public/      # Static files (HTML, images)
│   └── package.json # Frontend dependencies and scripts
└── server/          # Node/Express backend application
    ├── models/      # (Optional) database models
    ├── routes/      # API route handlers
    ├── server.js    # Entry point for the Express server
    └── package.json # Backend dependencies and scripts
```

Each subfolder (`client` and `server`) contains its own `package.json`. The frontend and backend run as separate apps.

## Contributing

Contributions are welcome! To contribute:

* **Fork** the repository on GitHub.
* **Create a new branch** for your feature or bugfix:

  ```bash
  git checkout -b feature/my-feature
  ```
* **Make your changes** and commit them with descriptive messages.
* **Push** the branch to your fork:

  ```bash
  git push origin feature/my-feature
  ```
* **Open a Pull Request** against the `main` branch of this repository, explaining your changes.
* Feel free to suggest improvements or report issues via GitHub Issues.

Please ensure code style consistency and add comments/docstrings where helpful.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```text
MIT License

Copyright (c) 2025 Deepak

Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction... (Full license text here)
```

*Replace `Deepak` and the year as appropriate.*
