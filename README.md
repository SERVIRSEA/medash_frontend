# Cambodia ME Dashboard App

## Description

This Next.js application serves as the frontend for the Cambodia ME Dashboard, providing a user interface and user experience for monitoring and managing data related to biophysical environment monitoring, landuse/landcover, forest monitoring, forest alert, and so on.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js >=18.17](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Follow this instructions to install Node.js](https://github.com/nvm-sh/nvm)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/SERVIRSEA/medash_frontend.git
    ```

2. **Move into the project directory:**

    ```bash
    cd medash_frontend
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env.local` file in the root of the project and add your environment variables:**

    ```env
    NEXT_PUBLIC_API_BASE_URL=data_api_base_path
    NEXT_PUBLIC_DATA_API_KEY=add_your_data_api_key
    NEXT_PUBLIC_GEOSERVER_URL=add_geoserver_path
    # add additional api key if you want to use
    ```

5. **Start the development server:**

    ```bash
    npm run dev
    ```

6. **Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the app.**

### Environment Variables

Make sure to set the following environment variables in your `.env.local` file:

- `API_BASE_URL`: Your API base url for external services.
- `DATA_API_KEY`: API key to verify and access data.
- `GEOSERVER_URL`: Your geoserver url for serving gis data.

### Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the production-ready application.
- `npm start`: Start the production server.

## Contributing

Feel free to contribute to this project by opening issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


