<p align="center">
  <a href="" rel="noopener">
    <img width=200px height=200px src="LogoReadme.png" alt="Project logo">
  </a>
</p>

<h3 align="center">FarmaTec: Medication Redemption System</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]
[![GitHub Issues](https://img.shields.io/github/issues/farmapower/farmapower.svg)](https://github.com/farmapower/farmapower/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/farmapower/farmapower.svg)](https://github.com/farmapower/farmapower/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> FarmaTec is a cutting-edge medication redemption system designed to enhance pharmaceutical loyalty programs.
    <br> 
</p>

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About ](#-about-)
- [🏁 Getting Started ](#-getting-started-)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [🎈 Usage ](#-usage-)
  - [Local Setup](#local-setup)
    - [Important .env](#important-env)
  - [Railway Deployment](#railway-deployment)
    - [Important Change](#important-change)
- [🚀 Deployment ](#-deployment-)
- [⛏️ Built Using ](#️-built-using-)
- [✍️ Authors ](#️-authors-)

## 🧐 About <a name = "about"></a>

FarmaTec is a platform designed for a pharmaceutical company that allows consumers to register their medication purchases to accumulate points. These points can be redeemed for free products according to an established loyalty system, ensuring that each registration meets the medication presentation specifications.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Download and install it from [nodejs.org](https://nodejs.org/).
- **npm**: Usually installed with Node.js.
- **MongoDB Atlas**: Set up a cloud MongoDB database on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installing

Follow these steps to get your development environment running:

1. Clone the repository:

   ```bash
   git clone https://github.com/JM-Granados/farmaPower.git
   ```

2. Install dependencies in backend:

   ```bash
   cd farmapower
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Install dependencies in frontend (another terminal):

   ```bash
   cd farmapower
   cd frontend
   ```

6. Install dependencies:

   ```bash
   npm install
   ```

7. Start the development client:

   ```bash
   npm run dev
   ```

## 🎈 Usage <a name="usage"></a>

### Local Setup

1. **Install Dependencies**:
   - Open two terminals: one for the backend and one for the frontend.
   - In each terminal, run the following command to install the dependencies:

   ```bash
   npm install
   ```

   - After the installation, also run:

   ```bash
   npm run build
   ```

2. **Start the Servers**:
   - In the same terminals, start each server (backend and frontend) by running the following command:

   ```bash
   npm run dev
   ```

   - This should start the servers and display the URLs where they are running:
     - **Frontend**: [http://localhost:5173/](http://localhost:5173/)
     - **Backend**: [http://localhost:3000/](http://localhost:3000/)

#### Important .env

Make sure your .env has the following environment variables

- **Frontend**:
  - `VITE_BACKEND_URL` = [http://localhost:3000/](http://localhost:3000/) (Make sure this URL is the same one the backend is running at)
- **Backend**: [http://localhost:3000/](http://localhost:3000/)
  - `PORT`=3000
  - `MONGO_URI` = "mongodb+srv://Speedy:Arguscr10**@farmapower.opvxh.mongodb.net/farmatec?retryWrites=true&w=majority&appName=farmaPower"
  - `VITE_API` = [http://localhost:3000/](http://localhost:5173)
  - `FRONTEND_URL` = [http://localhost:5173](http://localhost:5173)
  - `CLOUDINARY_CLOUD_NAME` = farmatec
  - `CLOUDINARY_API_KEY` = 989541122334246
  - `CLOUDINARY_API_SECRET` = zphtI6uOp3yZy-s4_hLhOg_vMxs
  - `DEFAULT_USER_IMAGE_URL` = [https://res.cloudinary.com/farmatec/image/upload/v1730893389/user_wvmewi.png](https://res.cloudinary.com/farmatec/image/upload/v1730893389/user_wvmewi.png)

### Railway Deployment

The entire GitHub repository is deployed on **Railway**. This allows you to access both the frontend and backend systems directly without needing a local setup.

- To access the deployed system, simply open your browser and navigate to the designated Railway URLs for the frontend and backend environments.
- You can find these URLs directly on the Railway dashboard linked to this project.

This Railway deployment provides a quick, centralized way to use the system as hosted in the cloud, reflecting all the latest updates in the GitHub repository.

#### Important Change

- Modify the `VITE_BACKEND_URL` variable in the frontend's `.env` with the railway backend exposed URL

## 🚀 Deployment <a name = "deployment"></a>

Deploying this project on a live system can be done seamlessly using Railway. Follow these steps to deploy your application:

1. **Create a Railway Account**:
   - Visit [Railway](https://railway.app/) and sign up for a new account if you don't already have one.

2. **Create a New Project**:
   - Once logged in, click on 'New Project'.
   - Choose 'Deploy from GitHub' and select your repository from the list.

3. **Configure Environment Variables**:
   - Set up the necessary environment variables such as `MONGO_URI`, `NODE_ENV`, etc., under the 'Variables' section of your Railway project settings.

4. **Deploy the Application**:
   - Railway will automatically detect the frameworks and settings based on your `package.json` files.
   - Click 'Deploy' to start the deployment process. Railway will handle the build and deployment phases.

5. **Verify Deployment**:
   - Once deployment is complete, you can access your application via the URL provided by Railway.

Additional Configuration:

- For advanced configurations, you can modify the `railway.toml` file or adjust the settings directly in your Railway project dashboard.

This process will set up your project on Railway's servers, making it accessible via the internet with minimal setup required.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB Atlas](https://www.mongodb.com/es/products/platform/atlas-database) - General database
- [Express](https://expressjs.com/) - Server Framework
- [React](https://reactjs.org/) - Web Framework
- [Node.js](https://nodejs.org/en/) - Server Environment
- [Cloudinary](https://cloudinary.com/) - Image database

## ✍️ Authors <a name = "authors"></a>

- [@Jose Granados](https://github.com/JM-Granados) - Idea & Initial work
- [@Isaac Picado](https://github.com/ipicado17) - Idea & Initial work
- [@Melissa Carvajal](https://github.com/MelissaCarvajalCharpentier0) - Idea & Initial work
- [@Kristhel Cordero](https://github.com/KristhelCordero) - Idea & Initial work
