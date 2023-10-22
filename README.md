>If you're excited about LLM, embedding, LangChain, AI, and ML, this repository is your gateway to a world of possibilities. Welcome aboard! 🚀🤖📚

# Intellectia
## Your Guardian Against Misleading AI-Generated Content.

At Intellectia, we're on a mission to eliminate misinformation and AI-generated deception. Our vigilant system detects and removes misleading articles, thanks to the dedicated efforts of our user community. With human reviews ensuring accuracy, we're your trusted platform for truthful, transparent, and reliable content. Join us in the fight against misinformation!

> "Welcome, valued contributors! 🌟 Whether you're a seasoned expert or new to the field, there's a place for everyone to make a meaningful impact here. Your unique perspective and skills are highly appreciated, and together, we can achieve great things. Let's collaborate, learn, and build something extraordinary. 🚀👏"

🔗 **Useful Links:**

- 💬 [Discord](https://discord.gg/eQjh6AdEmg)
- 📫 [PostMan](https://www.postman.com/galactic-firefly-721755/workspace/intellectia/request/10849501-459d4afa-6e15-4611-92e6-7d852344e17c) Learn to setup postman [Here](https://github.com/prasenjeet-symon/intellectia/wiki/Intellectia-Postman-Setup-Guide)
- 📚 [ Intellectia Wiki ](https://github.com/prasenjeet-symon/intellectia/wiki)

# Intellectia Client Development

Intellectia Client Development focuses on enhancing the client-side features of the application. The table below provides development status:

| Page Name               | Features                        | Status     |
|-------------------------|---------------------------------|------------|
| Authentication/LoginPage | Email, Password, Google Login   | ✔️ Functional |
| Authentication/SignUpPage | Email, Password, Google SignUp  | ✔️ Functional |
| Dashboard/ChooseTopics | `Dashboard/ChooseTopics` is a page that empowers users to personalize their dashboard experience by selecting their preferred topics and interests, ensuring they receive relevant content and updates.  | ✔️ Functional |

# Intellectia Setup Guide

## Cloning the Repository

```shell
git clone git@github.com:prasenjeet-symon/intellectia.git
```

## Creating .env Files for Server and Client

**For the Server:**

1. In your terminal, navigate to the server folder from the project's root directory:

```shell
cd packages/server
```

2. Create the .env file using one of these methods:

   - Using the command:

   ```shell
   copy .env.example .env
   ```

   - Manually create a new file at the same level as .env.example and copy the content from .env.example into the newly created .env file.

**For the Client:**

1. In your terminal, navigate to the client folder from the project's root directory:

```shell
cd packages/client
```

2. Create a new .env file using one of these methods:

   - Using the command:

   ```shell
   copy env.local.example .env
   ```

   - Manually create a new file at the same level as env.local.example and copy the content from env.local.example into the newly created .env file.

By following these steps, you've successfully added .env files for both the server and client, ensuring that each part of your project has its environment configuration.


## Database Configuration

Setting up your database for Intellectia is straightforward, with two options: XAMPP and Docker.

### Using XAMPP (Cross-Platform, Apache, MariaDB, PHP, and Perl)

1. Download XAMPP from the [official download link](https://www.apachefriends.org/download.html).

2. Install XAMPP following the provided setup instructions.

3. Open XAMPP and start all services one by one.

4. Launch your web browser, navigate to [http://localhost](http://localhost), and click on "phpMyAdmin" in the header.

5. Create a new database named 'intellectia.'

### Using Docker

1. Ensure Docker is installed on your operating system. If you're uncertain about Docker installation, please ask CHATGPT for guidance.

2. After Docker is installed and running:

3. Open your terminal and navigate to the root folder of Intellectia.

4. Execute the command:

```shell
docker-compose up -d
```

5. Verify that port 3306 is available on your local machine. If not, please stop any processes using this port; it might be due to another MySQL server running on your computer.

## Finalizing the Setup

After cloning the project, let's complete the setup, including installing necessary dependencies and creating required environment files.

### Ensure pnpm is Installed

1. Return to the project's root folder and run:

```shell
npm install -g pnpm
```

### Install All Project Dependencies

1. With pnpm installed, return to the project's root and run:

```shell
pnpm run app-setup
```

2. The initial setup may take a few minutes. After completion, your project is up and running, ready for development. The server usually runs on [http://localhost:3001](http://localhost:3001), and the client is accessible at [http://localhost:5173](http://localhost:5173).

### Restart the Project for Development

1. To restart the development project, run:

```shell
pnpm run app-dev
```

That's it! Your project is configured and ready for action. You can now delve into development, contribute to Intellectia, and enjoy the experience. If you have any questions or need assistance, feel free to ask.

**Additional Information:**

- For Docker users, the MySQL GUI runs on [http://localhost:8080](http://localhost:8080), and the server's home is located at [http://localhost:3001/server](http://localhost:3001/server).
