# 🗂️ Job Tracker — Personal ATS

A personal Applicant Tracking System (ATS) to manage your job search end-to-end. Track applications, contacts, tasks, and reminders — with analytics to help you land the offer faster.

---

## ✨ Features

- **Kanban Pipeline** — Drag-and-drop board to move applications through stages (Applied → Screening → Interview → Offer → Rejected)
- **Full CRUD** — Manage Jobs, Companies, Contacts, Applications, Tasks, and Notes
- **Calendar View** — See upcoming interviews, follow-ups, and deadlines at a glance
- **File Uploads** — Attach resumes and cover letters directly to applications
- **Reminders & Notifications** — Email/push alerts for interviews and follow-ups, with snooze and recurring task support
- **Import / Export** — Bulk import from CSV or Google Sheets; export all data as CSV or JSON
- **Analytics Dashboard** — Track applications per week, response rates, stage drop-offs, and time-to-offer
- **Auth & Security** — Secure login via email or OAuth; single-user scope with field validation and optimistic UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | FastAPI / Express / Supabase / Firebase |
| Database | PostgreSQL / SQLite |
| Auth | Email / OAuth |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js & npm](https://github.com/nvm-sh/nvm#installing-and-updating) (install via nvm)

### Installation

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate into the project
cd <YOUR_PROJECT_NAME>

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` with hot-reloading enabled.

---

## 📐 Data Model

| Entity | Description |
|---|---|
| `Job` | A job listing (title, description, URL, salary) |
| `Company` | Employer details |
| `Contact` | Recruiters or hiring managers at a company |
| `Application` | A specific application linking a Job + Company |
| `Stage` | The current pipeline stage of an application |
| `Task` | Follow-up actions and reminders |
| `Note` | Free-form notes tied to an application |

---

## 📊 Analytics

The dashboard surfaces key metrics to optimize your job search:

- Applications submitted per week
- Recruiter response rate
- Stage-by-stage drop-off funnel
- Average time from application to offer

---

## ✏️ Editing the Code

**Via Lovable (recommended)**
Visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and prompt directly. Changes commit automatically.

**Via your local IDE**
Clone the repo, make changes, and push — Lovable syncs automatically.

**Via GitHub**
Use the pencil icon on any file in the GitHub UI to edit and commit in-browser.

**Via GitHub Codespaces**
Open a Codespace from the repo's Code button for a full cloud IDE experience.

---

## 🚢 Deployment

Open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and go to **Share → Publish**.

To connect a custom domain, go to **Project → Settings → Domains → Connect Domain**.
See the [custom domain docs](https://docs.lovable.dev/features/custom-domain#custom-domain) for details.

---

## 📄 License

MIT — feel free to fork and adapt for your own job search.
