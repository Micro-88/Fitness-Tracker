Follow these steps to run the app

1. Clone the repo to your device
2. open terminal
3. type in the following commands
   -npm init -y
   -npm install --legacy-peer-deps
   -npm run migrate
   -npm run seed
4. create a .env file in the root of the directory then paste this
   NODE_ENV = development
   PORT = 3000
   
   DB_USERNAME = root
   DB_PASSWORD = root
   DB_NAME = fitness_tracker_db
   DB_HOST = 127.0.0.1
   DB_PORT = 3306

   GEMINI_API_KEY=<gemini key will be sent via private dms>

4. run the app by typing
   -npm run dev
