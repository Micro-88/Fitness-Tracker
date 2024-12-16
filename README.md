# Follow these steps to run the app
1. Clone the repo to your device
2. Create a MySQL/MariaDB database using any method, such as the CLI, XAMPP's phpMyAdmin, or any other database management tool.
3. Create a `.env` file in the root directory, and then paste the following content into it.
   - Replace the placeholders in the `.env` file with your actual values:
   ```
   NODE_ENV=development
   PORT=3000  # Node.js app port
   
   DB_USERNAME=root  # MySQL/MariaDB username
   DB_PASSWORD=   # Database password
   DB_NAME=your_database_name  # Database name
   DB_HOST=127.0.0.1  # Default MySQL host
   DB_PORT=3306  # Default MySQL port

   GEMINI_API_KEY=  # Key will be sent via private dms
4. Open the terminal and type in the following commands:
   - `npm install --legacy-peer-deps`
   - `npm run migrate`
   - `npm run seed`
   - `npm run dev`

5. To build and run
   - `npm run start`