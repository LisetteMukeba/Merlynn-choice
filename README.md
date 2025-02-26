# Merlynn-choice
A Next.js app that fetches models from the TOM API, lets users input data, gets predictions, stores results, and supports batch processing.

## Getting Started

## Features

- **Fetch drink models from TOM API**: The app pulls metadata for different drink models from the TOM API and presents it to the user.
- **Dynamic Form**: Users can input data into dynamically generated forms based on the drink model's attributes.
- **Fetch Decisions**: Based on the user's input, a decision is fetched from the TOM API, and the result is displayed.
- **Store Decisions**: The app stores user decisions along with the input data in a MongoDB database using Mongoose.
- **User Experience**: The app is styled with **TailwindCSS** to ensure a responsive and modern UI.
- **Model Selection**: Users can select any model from the TOM API to fetch and input data.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React.js**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A CSS framework for rapid UI development.
- **MongoDB**: A NoSQL database to store user inputs and decisions.
- **Mongoose**: A MongoDB object modeling tool for Node.js.
- **Axios**: Promise-based HTTP client for the browser and Node.js to interact with external APIs.

## Setup and Running the App

### Prerequisites

- **Node.js**: Make sure Node.js is installed. If not, you can download it from [here](https://nodejs.org/).
- **MongoDB**: You will need a MongoDB database. You can either use a local instance or sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to create a cloud database.

### Installation

1. **Clone the repository**:

   ```bash
 - git clone https://github.com/LisetteMukeba/Merlynn-choice.git

- npm install

- MONGODB_URI=mongodb+srv://merlynndbuser:merlynn@merlynndb.wqpys.mongodb.net/
- TOM_API_KEY=9307bfd5fa011428ff198bb37547f979
- npm run dev
- Open your browser and go to http://localhost:3000 to see the app in action.

