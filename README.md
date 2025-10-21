Code. Just copy and paste this into your project’s root directory as README.md:

markdown
#  Backend Wizards — Stage 0: Dynamic Profile Endpoint

This project is built for the HNGi13 Backend Internship Stage 0 task. It exposes a `/me` endpoint that returns your profile information along with a dynamic cat fact fetched from the [Cat Facts API](https://catfact.ninja/fact).

---

## 📦 Dependencies

Install all dependencies using:

bash
npm install
Package	Purpose
express	Web server framework
axios	HTTP client to fetch cat facts
cors	Enables cross-origin requests
nodemon	Auto-restarts server during development
cross-env	Cross-platform environment variable support
⚙️ Environment Variables
Create a .env file in the root directory. You can start by copying .env.example:

bash
cp .env.example .env
Then edit .env with your personal details:

env
USER_EMAIL=you@example.com
USER_NAME=Your Full Name
USER_STACK=Node.js/Express
PORT=3000
CATFACT_TIMEOUT_MS=2000
FALLBACK_FACT=Could not fetch a cat fact at this time.
🧑‍💻 Setup Instructions
1. Clone the repository
bash
git clone https://github.com/your-username/backend-wizards-stage0.git
cd backend-wizards-stage0
2. Install dependencies
bash
npm install
3. Configure environment
bash
cp .env.example .env
# Then edit .env with your email, name, and stack
4. Start the server
bash
npm run dev
Server will run at: http://localhost:3000

🔍 How to Test the Endpoint
Manual test
Visit in browser or use curl:

bash
curl http://localhost:3000/me
You should see a JSON response like:

json
{
  "status": "success",
  "user": {
    "email": "you@example.com",
    "name": "Your Full Name",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-18T06:46:14.432Z",
  "fact": "The technical term for a cat’s hairball is a “bezoar.”"
}
Automated test
Run the included test script to validate the response schema:

bash
npm run test:me
Optional: test against a custom server

bash
SERVER_URL=http://localhost:3000 TIME_TOLERANCE_SECONDS=20 npm run test:me
📄 API Documentation
GET /me
Returns your profile and a dynamic cat fact.

Response Format
json
{
  "status": "success",
  "user": {
    "email": "you@example.com",
    "name": "Your Full Name",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-18T06:46:14.432Z",
  "fact": "Cats have five toes on their front paws but only four on their back paws."
}
Headers
Content-Type: application/json

Status: 200 OK

🧪 Test Script Details
The test script (tests/check_me.js) validates:

HTTP 200 status

Content-Type is application/json

JSON structure matches required schema

Timestamp is ISO 8601 and recent

Cat fact is a non-empty string

🛠️ Tech Stack
Node.js

Express

Axios

ES Modules

Nodemon

Cross-env
