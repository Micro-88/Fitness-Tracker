# 💪Fitness Tracker💪

Fitness Tracker is a web application designed to help users monitor and manage their fitness activities. The application allows users to log workouts, track progress, and set fitness goals. It leverages the Gemini API to generate personalized workout plans based on user preferences and fitness levels.

## Technologies Used

[![My Skills](https://skillicons.dev/icons?i=nextjs,react,ts,sequelize,npm,git,js,tailwind&perline=3&theme=dark&size=20)](https://skillicons.dev)
- **Database**: MariaDB
- **API**: Gemini API for workout generation
- **Environment Management**: dotenv

## Setup

1. Clone the repository:
```
   git clone https://github.com/Micro-88/Fitness-Tracker
   cd fitness-tracker
```

2. Install dependencies:
```
   npm install --legacy-peer-deps
```

3. Run the setup script:
```
   npm run dev:setup
```

## Environment Variables

The application uses the following environment variables, which are set with default values in the code. You can override these by setting them in your environment.

- DB_USERNAME: Database username (default `root`)
- DB_PASSWORD: Database password (default: `''`)
- DB_NAME: Database name (default: `fitness_tracker_db`)
- DB_HOST: Database host (default: `localhost`)
- DB_PORT: Database port (default: `3306`)
- GEMINI_API_KEY: Gemini API key (default: `default_gemini_api_key`)

## Scripts

- ```npm run dev:setup```: Runs migrations, seeds the database, and starts the backend and frontend servers.
- ```npm run dev```: Starts the frontend server.
- ```npm run migrate```: Runs database migrations.
- ```npm run seed```: Seeds the database.

## Database Configuration

The database configuration is set up in `app/config/config.mjs` with default values. You can update these values as needed.

### config.mjs

```javascript
import dotenv from 'dotenv';
import mariadb from 'mariadb';

dotenv.config();

export const options = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fitness_tracker_db',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: "mariadb",
  dialectModule: mariadb,
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  migrationStorageTableName: "migrations",
};

if (process.env.NODE_ENV === "production") {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  };
}

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'default_gemini_api_key';

const config = {
  development: options,
  test: options,
  production: options,
};

export default config;
```
## Running the Application

To run the application, use the following command:

```
npm run dev:setup
```

This command will:
1. Run the migration script.
2. Run the seed script.
3. Start both the backend and frontend servers concurrently.
