\# PRD - Arsys Discord Server Website



\## Original Problem Statement

Creare un sito web per il server Discord "Arsys" con tema bianco e verde acqua, featuring multiple sections including Home, About, Rules, Staff, Reviews, FAQ, Events, and Join pages. The website should showcase the community, display staff members with their Discord status, include a live member counter, and integrate with Discord API.



\## User Personas

1\. \*\*Potential Members\*\*: People aged 14+ looking for a chill, welcoming Discord community to join

2\. \*\*Current Members\*\*: Existing server members visiting for rules, staff info, and event updates

3\. \*\*Staff Members\*\*: Moderators and admins managing the community



\## Architecture

\### Frontend

\- \*\*Framework\*\*: React 19 with React Router

\- \*\*UI Library\*\*: Shadcn UI components

\- \*\*Styling\*\*: Tailwind CSS with custom teal/cyan color scheme

\- \*\*Icons\*\*: Lucide React + React Icons (for TikTok)



\### Backend (To be implemented)

\- \*\*Framework\*\*: FastAPI

\- \*\*Database\*\*: MongoDB

\- \*\*APIs\*\*: Discord API integration for live data



\## Core Requirements (Static)

1\. Multi-page website with navigation

2\. White and aqua green color theme

3\. Responsive design

4\. All content in Italian

5\. Discord invite integration

6\. Social media links (TikTok)

7\. Mock data for initial preview



\## What's Been Implemented ✓

\*\*Date\*\*: December 2025



\### Pages Created:

1\. \*\*Home Page\*\* ✓

&nbsp;  - Hero section with server stats (1,610 members, 234 online)

&nbsp;  - Features highlight cards

&nbsp;  - "What we offer" section with 12 offerings

&nbsp;  - Call-to-action sections

&nbsp;  - Animated elements and gradients



2\. \*\*About Page (Chi Siamo)\*\* ✓

&nbsp;  - Mission statement

&nbsp;  - Core values section (Respect, Fun, Community, Growth)

&nbsp;  - Statistics display

&nbsp;  - Styled with teal/cyan theme



3\. \*\*Rules Page (Regole)\*\* ✓

&nbsp;  - 10 server rules with numbered cards

&nbsp;  - Consequences section (Warning → Timeout → Ban)

&nbsp;  - Positive encouragement card



4\. \*\*Staff Page\*\* ✓

&nbsp;  - 5 staff member cards with:

&nbsp;    - Discord avatars (placeholder)

&nbsp;    - Status indicators (Online, Idle, DND, Offline)

&nbsp;    - Role badges (Admin, Moderator, Helper)

&nbsp;    - Discord IDs

&nbsp;  - Status legend



5\. \*\*Reviews Page (Recensioni)\*\* ✓

&nbsp;  - 6 mock reviews with ratings

&nbsp;  - Average rating display

&nbsp;  - Author info and dates

&nbsp;  - Testimonial cards



6\. \*\*FAQ Page\*\* ✓

&nbsp;  - Accordion-style Q\&A with 5 questions

&nbsp;  - Including age requirement (14+) question

&nbsp;  - Smooth animations

&nbsp;  - Help section



7\. \*\*Events Page (Eventi)\*\* ✓

&nbsp;  - "Coming Soon" message

&nbsp;  - Event type previews

&nbsp;  - Benefits section



8\. \*\*Join Page (Entra)\*\* ✓

&nbsp;  - Discord invite link with CTA

&nbsp;  - Step-by-step join instructions

&nbsp;  - Benefits grid

&nbsp;  - Social media links



\### Components:

\- Header with responsive navigation

\- Footer with quick links and social icons

\- Mock data file with all content



\### Design Features:

\- White background with teal/aqua accents

\- Gradient buttons and cards

\- Hover animations

\- Smooth transitions

\- Glass-morphism effects

\- Responsive grid layouts



\## Prioritized Backlog



\### P0 - Backend Development (Next Phase)

1\. \*\*Discord API Integration\*\*

&nbsp;  - Bot token setup

&nbsp;  - Live member counter endpoint

&nbsp;  - Staff status fetching (Online/Idle/DND/Offline)

&nbsp;  - Real-time data updates



2\. \*\*Database Setup\*\*

&nbsp;  - MongoDB models for:

&nbsp;    - Reviews/Feedback

&nbsp;    - Events

&nbsp;    - FAQ entries

&nbsp;  - CRUD endpoints for each



3\. \*\*Backend APIs to Create\*\*

&nbsp;  ```

&nbsp;  GET  /api/server/stats        - Live member count \& online users

&nbsp;  GET  /api/staff               - Staff members with real Discord status

&nbsp;  GET  /api/reviews             - Fetch reviews

&nbsp;  POST /api/reviews             - Submit new review (staff managed)

&nbsp;  GET  /api/events              - Fetch upcoming events

&nbsp;  GET  /api/faq                 - Fetch FAQ entries

&nbsp;  ```



4\. \*\*Frontend-Backend Integration\*\*

&nbsp;  - Replace mock.js data with API calls

&nbsp;  - Add loading states

&nbsp;  - Error handling

&nbsp;  - Real-time updates for member counter



\### P1 - Enhanced Features

1\. Admin dashboard for managing:

&nbsp;  - Reviews approval/moderation

&nbsp;  - Events creation/editing

&nbsp;  - FAQ management

2\. Contact form for user inquiries

3\. Newsletter subscription

4\. Event calendar with dates

5\. Search functionality for FAQ



\### P2 - Polish \& Optimization

1\. SEO optimization

2\. Performance improvements

3\. Analytics integration

4\. Discord widget embed

5\. More animations and micro-interactions

6\. Dark mode toggle



\## Next Tasks

1\. \*\*User to provide Discord Bot Token\*\* for API integration

2\. \*\*Backend Development\*\*:

&nbsp;  - Create Discord API integration endpoints

&nbsp;  - Set up MongoDB models

&nbsp;  - Build CRUD APIs for reviews, events, FAQ

3\. \*\*Frontend Integration\*\*:

&nbsp;  - Replace mock data with API calls

&nbsp;  - Add loading states

4\. \*\*Testing\*\*: End-to-end testing of all features



\## API Contracts (To be implemented)



\### GET /api/server/stats

Response:

```json

{

&nbsp; "totalMembers": 1652,

&nbsp; "realMembers": 1610,

&nbsp; "bots": 42,

&nbsp; "onlineMembers": 234

}

```



\### GET /api/staff

Response:

```json

{

&nbsp; "staff": \[

&nbsp;   {

&nbsp;     "id": "938782498144522251",

&nbsp;     "username": "Username",

&nbsp;     "discriminator": "1234",

&nbsp;     "avatar": "avatar\_hash",

&nbsp;     "status": "online|idle|dnd|offline",

&nbsp;     "role": "Admin|Moderator|Helper"

&nbsp;   }

&nbsp; ]

}

```



\### GET /api/reviews

Response:

```json

{

&nbsp; "reviews": \[

&nbsp;   {

&nbsp;     "id": 1,

&nbsp;     "author": "Username",

&nbsp;     "rating": 5,

&nbsp;     "text": "Review text",

&nbsp;     "date": "2025-12-15",

&nbsp;     "approved": true

&nbsp;   }

&nbsp; ]

}

```



\## Mock Data Currently Used

\- Server stats: 1,610 real members, 234 online

\- 5 staff members with placeholder Discord data

\- 6 approved reviews with ratings

\- 5 FAQ questions

\- 12 server offerings

\- Events: "Coming Soon" status

\- All content in Italian



