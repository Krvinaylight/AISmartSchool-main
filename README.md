# SmartSchool AI

AI-assisted school examination management: syllabuses, question papers generated from those syllabuses, online exams, automatic and manual grading, and analytics, with separate Headmaster, Teacher and Student experiences.

This is a **front-end demo**. There is no backend. All data lives in your browser (IndexedDB + localStorage) and is seeded with realistic sample data on first launch.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

You need Node 20.19 or newer.

## Demo logins

Open `/login`, pick a role, then pick an account. There is no password. **This is demo authentication and it is not secure**: anyone using the browser can switch accounts.

| Role | Account | Good for trying |
|---|---|---|
| Headmaster | Dr. Meenakshi Raghavan | Generating, approving and publishing papers; releasing results; school analytics |
| Teacher | Rajesh Kumar (Science) | Grading the Class 9 Science Monthly Test (8 submissions waiting) |
| Teacher | Priya Sharma (Mathematics) | Class 8/10 maths results and analytics |
| Teacher | Fatima Sheikh (English, Social Science) | Class 9 Social Science |
| Student | Aarav Patel (8-A) or Diya Nair (8-A) | Taking the live Class 8 Science Practice Test |
| Student | Siddharth Rao (10-A) | The live Class 10 Mathematics Practice Test |
| Student | Vihaan Shah (9-A) | The live Social Science Unit Test 2 (results released manually) |

Roll 1 and 2 students in every section still have the live exams open. **Settings → Reset demo data** restores the original sample data.

### Try the whole loop in about 5 minutes

1. **Headmaster → AI Paper Generator.** Pick Class 8 Mathematics, choose the chapters, set the question mix, then Generate. Choose **Save draft & review**.
2. **In the editor**, edit, reorder (drag or arrows), regenerate or add questions. Then **Approve** and **Publish** to section 8-A with the window starting now.
3. **Log in as Aarav Patel (8-A).** Start the exam, answer a few questions, refresh the page (it resumes), and submit.
4. **Log in as Priya Sharma.** Open Assigned Exams → the exam → Grading queue, then grade the written answers.
5. **As the Headmaster**, choose **Release results**. Aarav now sees the score, topic feedback and explanations under My Results.

## Features

**Headmaster**
- Dashboard: students, teachers, classes, subjects, published and upcoming exams, average score, charts
- Classes & sections, teachers (with subject assignment), students, subjects: full create/edit/delete with validation
- Syllabus library
- AI Question Paper Generator: three steps (configure → distribution → generate). Covers difficulty presets and sliders, question types with marks, totals validation, learning outcomes, extra AI instructions and negative marking.
- Question paper editor:
  - inline editing, drag-and-drop reordering, per-question regeneration, add/delete
  - a validation summary, plus duplicating a paper or generating another set
  - an approval gate before publishing
- A4 print preview, question-paper PDF and a separate confidential answer-key PDF
- Exam management: publish to selected sections, schedule a window, reschedule, cancel, choose the results release policy (manual or immediate), show/hide explanations
- Exam detail: submissions, question-wise accuracy, most common wrong answers, grading queue, release or withdraw results, results CSV
- Results & analytics: by class, section, subject, month, difficulty and chapter; participation; pass/fail; enrollment; students needing support (adjustable threshold); top performers
- Reports: paper and answer-key PDFs, exam results CSV, class performance PDF, student report card PDF, all-results CSV, audit-log CSV
- Audit log

**Teacher** (restricted to assigned subjects)
- Dashboard, My Classes, My Subjects
- Syllabus upload: text is extracted from PDF, DOCX or TXT in the browser, or you can paste it. Chapters are detected automatically, and you can edit, replace, archive or delete a syllabus and track coverage by chapter.
- Assigned exams with grading. Written answers get a keyword-match suggestion (clearly labelled "not AI") and an optional AI suggestion when AI is configured. The teacher always sets the final mark.
- Student results with filters, CSV export and a per-student history drawer with a report PDF
- Class analytics: ranking, chapter accuracy, most frequently incorrect questions, students below a configurable threshold, individual trend
- Remedial practice: suggestions from weak chapters; assign to students, track completion (students are notified)

**Student**
- Dashboard: available, upcoming and completed exams, average score, strengths, recommended practice
- My Exams: only published exams for the student's own class and section
- Instructions page with confirmation before starting
- Live exam:
  - one-at-a-time or list view, question palette, mark for review
  - answered/unanswered/flagged counts, countdown, autosave on every change
  - resume after refresh, leave-page warnings, confirmation before submitting
  - automatic submission at time-out, duplicate-submission protection
- Submission receipt, My Results (released only), result detail with topic-wise feedback and explanations (if allowed), performance history

**Shared**: profile, notifications, settings (theme, pass mark, grading scale, AI configuration, storage stats, reset), light/dark theme, global search (`/`), 404.

**AI Workspace** (Educators and Institution Admins)
- **Workspace** (`/workspace`): recent exams, connected Google Drive folders, studio sessions to resume and token-usage metrics against the institution's monthly budget.
- **AI Exam Studio** (`/workspace/studio`): split screen with the chat on the left and the live exam canvas on the right.
  - Chat with the assistant in your own words, or by voice: voice typing uses the browser's Web Speech API (`webkitSpeechRecognition`) with a live microphone waveform, and saying "send" submits hands-free. With AI configured, Gemini plans the changes. Without AI, a rule-based command mode understands the same commands and is labelled "not AI".
  - The chat only *plans* actions (generate, add, swap, change difficulty, rebalance, reorder, set marks, rename, toggle the answer key). Question text always comes from the grounded generator, which uses only the selected sources.
  - **Exam customization canvas**: Builder (WYSIWYG question editing, drag to reorder, swap a question), Markdown (two-way live editor), Preview (A4 sheet) and a **difficulty matrix** (question type × difficulty; apply it and only the questions that must change are regenerated). An answer-key switch shows or hides answers in every view.
  - Sessions autosave. **Save draft** puts the paper in Question Papers; Educators can **Submit for approval**, and the Institution Admin approves and publishes as before.
- **Documents & Drive** (`/workspace/documents`): the Google Drive integration panel (Google Picker) imports individual files or whole folders; folders stay connected for re-sync. You can also upload files from your device. Only extracted text is stored, after the compliance checks.

**Organisation** (Institution Admin)
- **Access & roles**: RBAC roles and permission matrix, the people list and the sign-in policy. With an identity provider connected, grant or remove access and revoke sessions.
- **Billing & usage**: monthly token budget (pause or warn when it is reached), optional token prices for cost estimates, usage by day, person and feature, and a CSV export.
- **Document compliance**: allowed sources and file types, size limit, personal-data handling (block, redact or allow emails, phone numbers, Aadhaar-like and PAN numbers), allowed Drive owner domains, whether documents may be sent to the AI provider, and retention.

## What runs where

| Runs entirely in the browser | Needs an AI key (via proxy) | Needs a backend |
|---|---|---|
| Everything in the list above, including PDF/CSV export, syllabus text extraction, the exam engine and grading | Real Gemini question generation, AI regeneration of a single question, AI marking suggestions | Real authentication; data shared across users and devices; server-enforced exam timing and tamper-proof grading; file storage |

**Demo limitations.** Browser storage is per device. The demo can play all three roles in one browser, but the Headmaster, teachers and students cannot share data across machines. Because the timer, answers and grading run in the browser, a determined student could tamper with them. Real exams need server-side timing and grading.

## Authentication & authorization

Two modes, chosen with `VITE_AUTH_PROVIDER`:

- **`demo`** (default): the no-password account picker described above.
- **`firebase`**: real sign-in through Firebase Authentication (OpenID Connect), with **Google Workspace SSO** or **email and password plus TOTP two-step verification**. The flow:
  1. Firebase verifies the user (in-memory persistence, so Firebase's own refresh token is never written to browser storage) and returns an ID token.
  2. The app posts it once to `POST /api/auth/session`. The server verifies it and applies the access policy: verified email, allowed domain, a granted role in this organisation, and TOTP for staff password sign-ins.
  3. The server returns a **15-minute access JWT signed with RS256**, which is kept in memory only. It also sets a **rotating refresh token** in an `HttpOnly; Secure; SameSite=Strict` cookie scoped to `/api/auth`. Reusing a rotated refresh token revokes the whole session family.
  4. The app refreshes shortly before expiry. Role changes, disabled accounts and admin "revoke sessions" take effect at the next refresh.
  5. The verified email is matched to the school's records, and the role must agree.

**RBAC roles.** The Institution Admin (Headmaster) manages organisation users, billing and global document compliance policies. Educators (Teachers) upload files, chat with the AI and generate exams for their assigned subjects. Students take exams. Roles are custom claims (`role`: `institution_admin` | `educator` | `student`) set from **Access & roles**. Bootstrap the first admin with `BOOTSTRAP_ADMIN_EMAILS`. Approval and publishing remain Institution Admin only.

**Google Drive scopes.** `drive.readonly` is requested incrementally, only when a user starts an import. It is never requested at sign-in. Google Identity Services' token model issues a roughly one-hour access token and no refresh token, so no Drive refresh token ever reaches the client. The token is held in memory and revoked on disconnect.

### Setting up real sign-in, Drive and the AI proxy

1. **Firebase**: create a project, then enable Google and Email/Password sign-in. TOTP MFA needs Identity Platform with TOTP enabled. Copy the web config into `VITE_FIREBASE_*` and set `VITE_AUTH_PROVIDER=firebase`.
2. **Server**: deploy [`server-examples/vercel`](server-examples/vercel) (see its README). Run `npm run keys` for the RS256 key pair and set the variables in its `.env.example`. **Serve it on the same site as the app** (same Vercel project, or `app.` and `api.` subdomains of one domain), otherwise browsers won't send the SameSite=Strict cookie. Set `VITE_API_BASE_URL` if it isn't same-origin. For local development, run `vercel dev` on :3000 and set `DEV_API_TARGET=http://localhost:3000`.
3. **Google Drive**: in Google Cloud, enable the Drive API and the Google Picker API. Create an OAuth web client (authorised JavaScript origin = the app) and a browser API key restricted to the Picker API and your referrer. Set `VITE_GOOGLE_CLIENT_ID`, `VITE_GOOGLE_API_KEY` and `VITE_GOOGLE_APP_ID` (project number). Add the `drive.readonly` scope to the OAuth consent screen.
4. **AI**: set `GEMINI_API_KEY` on the server and `VITE_AI_PROXY_URL=/api/ai` (or the full URL). The proxy accepts only Educator/Institution Admin access tokens and reports token usage for billing.

**Still browser-local.** School data (papers, exams, results, documents, usage) still lives in each browser's storage. Real sign-in protects *who* can use the app and the AI proxy, but multi-user shared data still needs the backend described under Architecture notes.

## AI question generation

Without configuration, the generator uses a **sample generator** that is explicitly labelled "not AI" everywhere it appears. For each requested question it:

1. uses a hand-written sample-bank question for the chapter, if one fits;
2. otherwise builds a question from a definition sentence in the syllabus;
3. otherwise leaves the slot empty and **reports the limitation** rather than inventing material.

With AI configured, the prompt contains **only the selected chapters** and a blueprint of slots (type, difficulty, marks). Gemini must return JSON with:

- the correct answer and explanation for every question
- a source quote from the syllabus
- a `supported` flag

Every question is then normalised and validated. Duplicates and questions the AI marks as unsupported are dropped, and gaps are reported. Malformed JSON gets one automatic repair attempt. Quota, authentication, model and network errors produce plain-language messages with **Retry** and an explicit **Use sample generator instead** button. A failed AI request is never silently replaced. Nothing is published automatically: papers are drafts until the Headmaster approves them and publishes them.

### Enabling AI

1. Deploy the proxy in [`server-examples/vercel/api/ai.js`](server-examples/vercel/api/ai.js) (Vercel; the same contract works on Netlify, Cloudflare Workers or Supabase Edge Functions). Set `GEMINI_API_KEY` and `ALLOWED_ORIGIN` as server-side environment variables.
2. Set `VITE_AI_PROXY_URL=https://<your-proxy>/api/ai` in `.env.local`, or paste the URL into **Settings → AI integration** and choose "Gemini via secure proxy".
3. Click **Test connection**.

For quick local testing only, Settings also offers **Gemini direct**. The key you paste is kept in this tab's `sessionStorage`, sent straight to Google, and forgotten when the tab closes. Never use this mode on a shared computer or a deployed site.

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
|---|---|
| `VITE_AI_PROXY_URL` | URL of your serverless Gemini proxy (optional; can also be set in Settings) |
| `VITE_GEMINI_MODEL` | Model name, default `gemini-2.5-flash` |
| `VITE_AUTH_PROVIDER` | `demo` (default) or `firebase` |
| `VITE_FIREBASE_API_KEY`, `_AUTH_DOMAIN`, `_PROJECT_ID`, `_APP_ID` | Firebase web config (public identifiers) |
| `VITE_GOOGLE_WORKSPACE_DOMAIN` | Optional domain hint on the Google sign-in screen |
| `VITE_API_BASE_URL` | Auth server base URL; empty = same origin |
| `DEV_API_TARGET` | Dev only: Vite proxies `/api` here |
| `VITE_GOOGLE_CLIENT_ID`, `VITE_GOOGLE_API_KEY`, `VITE_GOOGLE_APP_ID` | Google Drive import (Picker + Identity Services) |

**Never put a Gemini API key, JWT private key or service account in a `VITE_*` variable.** Everything prefixed `VITE_` is compiled into the public JavaScript bundle. Server-side variables are listed in `server-examples/vercel/.env.example`.

## Project structure

```
server-examples/vercel/    auth server (session/refresh/logout/JWKS, admin roles) + Gemini proxy, with tests
src/
  main.jsx                 boot: load/seed storage, then render
  App.jsx                  providers + router
  index.css                Tailwind v4 theme, component classes, chart tokens, print CSS
  config/                  constants, role permissions, navigation
  context/                 Auth, Theme, Toast, Confirm, Prefs (academic year)
  hooks/                   useLiveQuery (reactive store reads), useDisclosure, …
  routes/                  router (lazy pages) and role guards
  services/
    storage/               localStore, indexedDb, storageService (central CRUD + cache)
    seed/                  school roster, syllabus text, sample question bank, seed builder
    ai/                    aiConfig, blueprint, promptBuilder, geminiClient,
                           questionSchema (validation/dedupe), mockQuestionGenerator,
                           questionGenerator (entry point)
    auth/                  sessionClient (in-memory access token, cookie refresh), firebaseAuth (SSO, MFA)
    drive/                 googleDrive (Picker + GIS token model), driveImport (files, folders, re-sync)
    workspace/             chatAssistant (AI planner + command parser), examActions, examMarkdown,
                           chatSessionService
    ai/usageService.js     token metering and monthly budget
    documentService.js     imported documents and connected Drive folders
    complianceService.js   document policy and personal-data scanning/redaction
    authService.js         demo or identity-provider sessions
    userService.js         teachers & students
    academicService.js     classes, sections, subjects
    syllabusService.js     syllabus CRUD, chapter detection, coverage
    fileParser.js          PDF (pdf.js) / DOCX (mammoth) / TXT extraction, lazy-loaded
    questionPaperService.js drafts, editing, approval; answer keys stored separately
    examService.js         publishing, scheduling, visibility, result release
    attemptService.js      exam engine: start/resume, autosave, submit
    gradingService.js      pure grading rules (auto + manual marks, grade scale)
    resultService.js       student result views, manual grading, question analysis
    analyticsService.js    role-scoped results and aggregates
    remedialService.js     weak-chapter suggestions and practice plans
    exportService.js       CSV + PDF (jsPDF with DejaVu Sans for Unicode), lazy-loaded
    notificationService.js, auditService.js, schoolService.js
  components/
    ui/                    Button, Modal, Drawer, Form fields, Tabs, Badge, StatCard, …
    layout/                AppLayout, Sidebar, Topbar, Breadcrumbs, GlobalSearch, menus
    charts/                Recharts wrappers with table-view toggle
    domain/                QuestionEditor, PaperSheet, ScheduleDialog, GradingDrawer,
                           ExamsTable, Syllabus editor/viewer, StudentHistoryDrawer, …
    exam/                  StudentQuestion (exam inputs)
    auth/                  IdentitySignIn, TotpSetup, SecurityCard
    workspace/             ChatPanel, VoiceWaveform, SourcePicker, ExamCanvas, MarkdownView,
                           DifficultyMatrix, DriveImportPanel, ConnectedFolders, UsageCharts
  pages/                   public / shared / headmaster / teacher / student / workspace
```

### Architecture notes

- **Business logic lives in services, not components.** Reads come synchronously from an in-memory cache through `useLiveQuery`. Writes are async and persist in the background. The service APIs are where Supabase would plug in.
- **Permissions are checked in services as well as routes.** Teachers only touch their assigned subjects. Students only receive questions without answers, only see published exams for their class and section, and only see their own *released* results. Real enforcement belongs on the server (e.g. Supabase row-level security).
- **Answer keys are stored separately** (the `answerKeys` collection) from the student-facing question papers, and are read only by staff views and by the grader.
- **Storage resilience.** If IndexedDB is unavailable or doesn't respond, data falls back to localStorage and is copied back into IndexedDB on the next healthy start.
- **Future Supabase mapping:** Supabase Auth for `authService`; Postgres tables per collection with RLS; an Edge Function for submission, grading and the AI proxy; Storage for original syllabus files.
