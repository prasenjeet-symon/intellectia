# intellectia
Empowering human thoughts in the age of AI

**Project Setup Instructions**

1. **Clone the Repository**:
   ```
   git clone git@github.com:prasenjeet-symon/intellectia.git
   ```

2. **Navigate to the Project Directory**:
   ```
   cd intellectia/packages/server
   ```

3. **Install Dependencies**:
   ```
   npm install
   ```

4. **Database Configuration**:
   - Ensure you have XAMPP installed and running.
   - Create a MySQL database for your project in XAMPP. Note down the database name, username, and password.
   - Copy the `.env.example` file to a new file named `.env` in the `packages/server` directory.
   - Open the `.env` file and replace the placeholders with your MySQL database connection details
    
5. **Generate Prisma Client**:
   ```
   npx prisma generate
   ```

6. **Run Database Migrations**:
   ```
   npx prisma migrate dev
   ```
   This command will create database tables based on your Prisma schema and apply any pending migrations.

7. **Start the Development Server**:
   ```
   npm start
   ```
   This command uses `ts-node-dev` to run the TypeScript files in your `src` directory. It will automatically restart the server whenever you make changes to your code.

8. **Build the Project (Optional)**:
   ```
   npm run build
   ```
   If you want to create a production-ready build of your project, use this command. The output will be in the `dist` directory.

9. **Testing**:
   - Run your tests with the following command:
     ```
     npm test
     ```
     Modify the test script in your `package.json` file to specify your testing framework (e.g., Jest, Mocha).

By following these setup instructions, you'll have your Express project located at 'packages/server' connected to a MySQL database using XAMPP, with database migration capabilities using Prisma, and environment variables properly configured. Make sure to adapt the configuration and environment variables to your specific project requirements.
