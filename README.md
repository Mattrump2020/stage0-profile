# 🧙‍♂️ Backend Wizards — Stage 0: Dynamic Profile Endpoint

This project was built for the **HNGi13 Backend Internship (Stage 0)**.  
It exposes a `/me` API endpoint that returns user profile information along with a **dynamic cat fact** fetched from the public [Cat Facts API](https://catfact.ninja/fact).

---

## 📁 Project Structure

├── src
│ ├── routes
│ │ └── me.js
│ ├── utils
│ │ └── fetchCatFact.js
│ └── index.js
├── tests
│ └── check_me.js
├── .env.example
├── package.json
└── README.md

yaml
Copy code

---

## ⚙️ Environment Variables

Create a `.env` file in the project root. Example:

USER_EMAIL=jobbe@gmail.com
USER_NAME=Joy Obe
USER_STACK=Node.js/Express
PORT=3000
CATFACT_TIMEOUT_MS=2000
FALLBACK_FACT=Could not fetch a cat fact at this time.

yaml
Copy code

---

## 🚀 Setup and Installation

1️⃣ Clone the repository:
```bash
git clone https://github.com/Mattrump2020/stage0-profile.git
cd stage0-profile
2️⃣ Install dependencies:

bash
Copy code
npm install
3️⃣ Create and configure .env file:

bash
Copy code
cp .env.example .env
Edit the .env file with your own details.

4️⃣ Start the server:

bash
Copy code
npm run dev   # Development with nodemon
# or
npm start     # Production mode
Server will run at: http://localhost:3000

🌐 API Endpoint
GET /me
Returns user profile details and a dynamic cat fact.

✅ Example Response:
json
Copy code
{
  "status": "success",
  "user": {
    "email": "matthewgodsent@gmail.com",
    "name": "Matthew Oluwafisayo Adeniyi",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-21T10:15:30.123Z",
  "fact": "Cats have five toes on their front paws but only four on their back paws."
}
📌 Response Details:
Field	Description
status	Always "success"
user	Contains email, name, and stack
timestamp	Current time in valid ISO 8601 format
fact	Dynamic or fallback cat fact

🧪 Testing the Endpoint
✅ Manual Test
Visit in browser or use curl:

bash
Copy code
curl http://localhost:3000/me
✅ Automated Test
Runs the provided test script:

bash
Copy code
npm run test:me
Or test a deployed/live server:

bash
Copy code
SERVER_URL=https://your-deployed-url.com TIME_TOLERANCE_SECONDS=20 npm run test:me
🛠️ Technologies Used
Technology	Purpose
Node.js	JavaScript runtime environment
Express.js	Web framework for Node.js
Axios	Fetches cat facts from external API
dotenv	Loads environment variables
CORS	Enables cross-origin requests
Nodemon	Auto-restarts server during development

👤 Author
Matthew Oluwafisayo Adeniyi
📧 Email: matthewgodsent@gmail.com
🐙 GitHub: https://github.com/Mattrump2020

✅ Notes
✔ The /me endpoint meets all Stage 0 requirements (status, user info, timestamp, dynamic fact, correct headers).
✔ Ensure your repository contains this README.md before submitting.
✔ You can re-test anytime using /stage-zero-backend in Slack.

