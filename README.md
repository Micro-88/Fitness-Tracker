# Follow these steps to run the app
1. Clone the repo to your device
2. Create a MySQL/MariaDB Database
3. Create a `.env` file in the root directory, and then paste the following content into it.
   ```NODE_ENV = development
   PORT = 3000
   
   DB_USERNAME = root  # Replace with your database username
   DB_PASSWORD = root  # Replace with your database password
   DB_NAME = your_database_name  # Replace with your database name
   DB_HOST = 127.0.0.1
   DB_PORT = 3306

   GEMINI_API_KEY=<gemini key will be sent via private dms>
4. Open the terminal and type in the following commands:
   - `npm init -y`
   - `npm install --legacy-peer-deps`
   - `npm run migrate`
   - `npm run seed`
   - `npm run dev`