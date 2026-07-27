# Vehicle Inventory

A full-stack CRUD application for managing a fleet's vehicles and drivers.

- **Visual Studio Version:** Visual Studio 2026
- **Backend:** ASP.NET Core (.NET 10) Web API — layered architecture (Controller → Service → Repository → EF Core), SQL Server
- **Frontend:** Angular 18 (standalone components), TypeScript, SCSS

---

## Branches

- **`main`** — the core CRUD application. No external services required beyond SQL Server. This is the primary submission and runs immediately with the steps below.
- **`feature/sso`** — the optional SSO task, adding single sign-on via Microsoft Entra ID (OpenID Connect / OAuth2) on top of `main`. **The tenant and client IDs already committed on this branch are mine** — they let *my* Microsoft account (and anyone I've explicitly added as a guest user) sign in, but won't work out of the box for an arbitrary Microsoft account. See **[Testing the SSO branch](#testing-the-sso-branch)** at the bottom for how to actually run it, whether that's using my tenant or your own.

---

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (includes npm)
- SQL Server — LocalDB or SQL Express both work (see connection string below)
- Angular CLI: `npm install -g @angular/cli`

(The SSO branch has one additional prerequisite — a Microsoft account — covered in its own section at the bottom.)

---

## Run the backend

> **On the `feature/sso` branch:** read [Testing the SSO branch](#testing-the-sso-branch) before running this — signing in requires either my tenant to have your account added as a guest, or your own Entra setup, and skipping straight to `dotnet run` will just end in a confusing failure.

If your SQL Server instance isn't `localhost\SQLEXPRESS`, update the connection string in `appsettings.json` first.

Set up the database (first time only, or after pulling schema changes):

Open the Package Manager Console from Tools > NuGet Package Manager > Package manager Console

```PM
Add-Migration MigrationName
Update-Database
```

Run through Visual Studio
```bash
dotnet run
```

Run it through Visual Studio:

This opens your browser straight to `https://localhost:7046/swagger` automatically.

> **Note on Swagger, `feature/sso` branch only:** every endpoint requires a bearer token, and the Swagger UI isn't currently configured with an "Authorize" button to attach one manually — so `Try it out` on any endpoint will return `401 Unauthorized` as-is. Swagger is still useful for checking the API shape and endpoint list; to actually exercise the API while signed in, use the frontend.

---

## Run the frontend

> **On the `feature/sso` branch:** same note as above — see [Testing the SSO branch](#testing-the-sso-branch) first.

```bash
cd frontend
npm install
ng serve
```

Visit `http://localhost:4200`.

On `main`, the vehicle list loads immediately. On `feature/sso`, you'll be redirected straight to Microsoft's sign-in page before you see any data.

Run order doesn't matter — the frontend will simply show connection errors in the console until the backend is up.

---

## Project structure

```
backend/VehicleInventory/
├── Controllers/           HTTP endpoints only — no business logic
├── Services/               Business rules (uniqueness checks, status/assignment rules, not-found/conflict handling)
├── DBManager/
│   ├── Repositories/       EF Core data access only
│   ├── Models/Entities/    EF Core entities + internal search-criteria models
│   ├── Models/DTOs/        Request/response contracts (never expose entities directly)
│   ├── Mappings/           Manual entity ↔ DTO mapping (no AutoMapper — removed deliberately)
│   └── Context/            EF Core DbContext + model configuration
├── MiddleWare/             Global exception handling → consistent JSON error shape + correct status codes
└── Migrations/

frontend/src/app/
├── core/
│   ├── models/             TypeScript interfaces + enums mirroring the backend DTOs
│   └── services/            VehicleService, DriverService (HttpClient CRUD + search calls)
├── shared/
│   ├── layout/nav/          Responsive nav bar, sign in/out controls (feature/sso only)
│   └── pipes/                Display-formatting pipes (e.g. "InMaintenance" → "In Maintenance")
└── features/
    ├── vehicles/             list, form (create/edit), search
    └── drivers/              list, form (create/edit), search
```

---

## Business rules worth knowing about

These apply on both branches:

- A vehicle's license plate must be unique (`409 Conflict` on duplicate).
- A driver can't be deleted while they still have a vehicle assigned (`409 Conflict` — unassign the vehicle first via the vehicle's edit form).
- A vehicle can't have a driver assigned unless its status is `Active` — attempting to assign a driver to an `InMaintenance` or `Retired` vehicle returns a `409 Conflict` explaining why, in either direction (changing status while assigned, or assigning while already inactive).
- Searching vehicles or drivers with no criteria filled in returns the full unfiltered list (equivalent to browsing "all").

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Frontend can't reach the API at all (network error, not a 401) | Backend isn't running, or `apiBaseUrl` in `environment.ts` doesn't match the backend's actual port |
| CORS error in the browser console | Confirm the frontend is running on `localhost:4200` — that's the only origin currently allowed in the backend's CORS policy |

SSO-specific issues are covered in the next section, since they only apply to `feature/sso`.

---

## Testing the SSO branch

The tenant and both app registrations (API + SPA) referenced in this branch's config files are mine. That means sign-in is currently restricted to my Microsoft account and anyone I've explicitly added as a guest user in my tenant — not to an arbitrary Microsoft account. You have two options:

### Option A — I've added you as a guest

If I've added your email as a guest user in my tenant, just run the app as described above and sign in with your own Microsoft account when prompted. Nothing else to configure.

### Option B — Use your own Entra tenant

If you'd rather test with your own setup entirely (or I haven't added you as a guest), you'll need a Microsoft account — a free personal or work account both work, no paid Azure subscription needed — and to register your own pair of apps:

1. Go to [entra.microsoft.com](https://entra.microsoft.com) → **Identity** → **Applications** → **App registrations** → **New registration**.

2. **Register the API app** (e.g. name it `VehicleInventory-API`):
   - Leave "Accounts in this organizational directory only" selected, skip the redirect URI, click **Register**.
   - Go to **Expose an API** → **Add a scope**. Accept the default Application ID URI, name the scope `access_as_user`, allow "Admins and users" to consent, give it a display name/description, and save.
   - From the **Overview** page, copy the **Application (client) ID** and the **Directory (tenant) ID** — you'll need both next.

3. **Register the SPA app** (e.g. name it `VehicleInventory-SPA`):
   - Under **Authentication** → **Add a platform** → **Single-page application** → redirect URI `http://localhost:4200`.
   - Under **API permissions** → **Add a permission** → **My APIs** → select the API app from step 2 → select the `access_as_user` scope → **Add permissions**.
   - From the **Overview** page, copy the **Application (client) ID**.

4. **Replace the existing IDs** (mine) with your own:

   `backend/VehicleInventory/appsettings.json`:
   ```json
   "AzureAd": {
     "Instance": "https://login.microsoftonline.com/",
     "TenantId": "<your tenant ID>",
     "ClientId": "<your API app client ID>"
   }
   ```

   `frontend/src/environments/environment.ts`:
   ```typescript
   azureAd: {
     clientId: '<your SPA app client ID>',
     authority: 'https://login.microsoftonline.com/<your tenant ID>',
     redirectUri: 'http://localhost:4200',
     apiScope: 'api://<your API app client ID>/access_as_user'
   }
   ```

### SSO troubleshooting

| Symptom | Likely cause |
|---|---|
| Backend throws on startup | `AzureAd` values in `appsettings.json` are missing or malformed |
| Frontend errors constructing MSAL | `azureAd` values in `environment.ts` are missing or malformed |
| `AADSTS90013: Invalid input received from the user` | A leftover `<`/`>` character from a placeholder wasn't fully replaced — check both files carefully, especially the IDs embedded inside the longer `authority`/`apiScope` strings |
| Redirect loop / stuck on Microsoft sign-in | Redirect URI in the Entra SPA app registration doesn't exactly match `http://localhost:4200` |
| `401 Unauthorized` on every API call from the frontend | SPA app registration is missing the API permission grant for `access_as_user` |
| Signed in instantly with no prompt, on a browser you'd already used before | Likely just a cached Microsoft session in that browser — try an incognito/private window to confirm |
