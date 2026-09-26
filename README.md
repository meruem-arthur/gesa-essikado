# GESA — Essikado Campus (Public Website)

Next.js site that reads live from the **same Firebase project** as the GESA
mobile app and admin dashboard (`gesa-app-2026`). No separate database,
no separate login — content managed entirely through `admin-gesa-app`.

## What reads from what

| Site section        | Firestore source                                    |
|----------------------|-------------------------------------------------------|
| Hero slideshow        | `heroSlides` *(new — manage in admin: Site: Hero Slides)* |
| HOD welcome message    | `lecturers` doc where `pinnedRole == 'HOD'`, field `hodMessage` *(new field, admin: Lecturers)* |
| President welcome message | `executives` doc where `order == 1`, field `bio` *(already existed)* |
| Programme            | static (BSc Geomatic Engineering only)                 |
| Upcoming events        | `events`                                               |
| Executives page        | `executives`                                           |
| News page            | `announcements`                                        |
| Gallery              | `galleryPhotos` *(new — manage in admin: Site: Gallery)* |
| Library (materials & past questions) | `learningMaterials`, `pastQuestions` — same data the mobile app uses |
| About text / tagline / contact info | `siteContent/home` *(new — manage in admin: Site: Content)* |
| Footer "Important Links" | `siteLinks/links` *(new — manage in admin: Site: Links)* |

## Before deploying: Firestore rules

Four new items were introduced. Your existing rules already allow public
read on collections like `executives`/`events`/etc — mirror that same
pattern for these:

```
match /heroSlides/{id}     { allow read: if true; allow write: if isAdmin(); }
match /galleryPhotos/{id}  { allow read: if true; allow write: if isAdmin(); }
match /siteContent/{id}    { allow read: if true; allow write: if isAdmin(); }
match /siteLinks/{id}      { allow read: if true; allow write: if isAdmin(); }
```

(Replace `isAdmin()` with however your existing rules check the `/admins`
allowlist — copy the same condition used for `executives` writes.)

## Local dev

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this folder to a new GitHub repo (e.g. `gesa-essikado-site`).
2. In Vercel: **New Project → Import** that repo. Framework preset:
   Next.js (auto-detected). No environment variables are required — the
   Firebase config is the same public client key already used in your
   other two repos.
3. Deploy. Vercel gives you a `*.vercel.app` URL; add a custom domain
   whenever you're ready.

## Populating first content

Log into `admin-gesa-app` and, in order:
1. **Site: Hero Slides** — upload 2–4 homepage banner images.
2. **Lecturers** — edit the HOD entry, add a welcome message.
3. **Executives** — make sure order `1` (President) has a `bio` filled in.
4. **Site: Content** — write the About text and contact details.
5. **Site: Links** — add Dues/Election/Students'/VLE/Internship URLs.

Everything else (events, announcements, materials, past questions,
executives list) is already being managed there for the app — nothing
extra to do; the site just displays what's already in Firestore.
