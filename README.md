# ConnectGood: NGO Volunteer Coordination Platform

**ConnectGood** is a modern, responsive web application designed to bridge the gap between Non-Governmental Organizations (NGOs) and passionate community volunteers. By leveraging a robust backend and advanced AI, it dynamically pairs community needs with the volunteers best suited to fulfill them.

---

## 🌟 Key Features

The platform is split into two distinct user journeys, ensuring tailored experiences for both Volunteers and NGO Administrators.

### For Volunteers
- **Dynamic Task Dashboard:** Volunteers can browse, filter (by urgency), and view detailed information on active community tasks available near them.
- **Smart Profile Management:** Volunteers fill out a comprehensive profile detailing their skills, availability, zip code, and preferred hours. 
- **Live Cloud Syncing:** Profiles are not stored locally—they are written directly to a live **Firebase Firestore** database so that NGOs can instantly review and match them.

### For NGO Admins
- **Need Posting & Management:** Admins can post new community needs, categorizing them by type (Medical, Education, Relief, etc.), urgency, required skills, and exact geographic coordinates.
- **Needs Heatmap (Google Maps):** A fully integrated interactive map that provides a bird's-eye view of all active community needs across India. Needs are visualized with intensity layers corresponding to urgency levels.
- **AI-Powered Matchmaker (Gemini AI):** Instead of manually reviewing volunteer profiles, Admins can run the Matchmaker. This feature analyzes open needs against registered volunteer profiles and intelligently pairs them using Google's generative AI capabilities.

---

## 🛠️ Technology Stack & Integrations

This project was built focusing on enterprise-grade architecture, utilizing Vanilla JavaScript (ES6+), HTML5, and CSS3 for the frontend, and a Node.js Express backend, paired with powerful third-party APIs.

### 1. Firebase (Firestore Backend)
- **Integration Details:** The application uses the Firebase v9 Compat SDK to connect to a secure cloud database.
- **Implementation:** 
  - Real-time `fetchVolunteers()` function retrieves all registered volunteers on startup.
  - Asynchronous `saveProfile()` function securely writes new volunteer data to the `volunteers` collection using `db.collection("volunteers").add()` and `update()`.
- **Purpose:** Transitioned the app from static, hard-coded dummy data to a dynamic, scalable data layer.

### 2. Google Maps API (Heatmap)
- **Integration Details:** Integrated via the Google Maps JavaScript API using modern asynchronous loading practices (`loading=async`).
- **Implementation:** 
  - Centered dynamically over India (`lat: 20.5937, lng: 78.9629`) at a zoom level of `4.5`.
  - Replaced legacy Delhi-centric dummy data with diverse, national data spanning Mumbai, Bangalore, Chennai, Kolkata, and more.
  - Dynamically renders UI overlay cells based on task locations and urgency.
- **Purpose:** Provides NGO Admins with crucial spatial awareness of where resources and volunteers are most desperately needed.

### 3. Google Gemini AI (Smart Matchmaker)
- **Integration Details:** Direct REST API integration with the `gemini-flash-latest` model.
- **Implementation:** 
  - Triggered via the `runAIMatchmaker()` function, which securely requests the local Node.js Express backend (`/api/matchmaker`).
  - The backend securely injects the API key from a server environment variable before communicating with Google's APIs, preventing any key exposure in the browser.
  - Automatically serializes open Community Needs and available Volunteer Profiles into a structured prompt.
  - Instructs the AI to evaluate skill overlap, availability, and location proximity.
  - Parses the structured `application/json` output from Gemini and dynamically renders visually engaging result cards, including Match Confidence Scores and overlapping skill tags.
- **Purpose:** Eliminates the administrative bottleneck of manually matching hundreds of volunteers to specific tasks.

---

## 🎨 UI/UX & Accessibility

- **Responsive Design:** Completely mobile-friendly. Uses CSS Grid, Flexbox, and fluid typography to adapt from desktop monitors down to mobile screens.
- **Accessibility First (WCAG):** Implements `aria-labels`, `role="region"`, polite live regions (`aria-live="polite"`), and keyboard navigable focus states (`tabindex="0"`). Screen readers are actively updated using the `announceToSR()` function.
- **Modern Aesthetics:** Features glassmorphism, smooth micro-animations, semantic color-coding (for urgency levels), and custom SVG iconography to create a high-trust, premium feel.

---

## 🚀 Setup & Execution

### Running Locally
1. **Install Dependencies:** Run `npm install` in your terminal to install the Express backend.
2. **Set Environment Variable:** Set your Gemini API key in your terminal session:
   - *Windows (PowerShell):* `$env:GEMINI_API_KEY="YOUR_API_KEY"`
   - *Mac/Linux:* `export GEMINI_API_KEY="YOUR_API_KEY"`
3. **Start the Server:** Run `npm start`. Open your browser to `http://localhost:8080`.

### Deploying to Google Cloud Run
You can easily deploy this full-stack application securely using the Google Cloud CLI. The API key is passed directly to the cloud environment, keeping your source code safe:
```bash
gcloud run deploy connectgood --source . --project YOUR_PROJECT_ID --region us-central1 --allow-unauthenticated --set-env-vars="GEMINI_API_KEY=YOUR_ACTUAL_API_KEY"
```

### Other Configurations
- **Google Maps:** Configured directly in the `<script>` tag within `index.html`.
- **Firebase:** Project configuration variables are located in `firebase.js`.

---

## 📈 Future Roadmap
- **Authentication:** Implement Firebase Auth to allow secure log-ins for both Volunteers and Admins.
- **Push Notifications:** Alert volunteers in real-time when they have been matched to a critical task.
- **Chatbot Backend:** Connect the floating support chat widget to Gemini for context-aware Q&A support.
