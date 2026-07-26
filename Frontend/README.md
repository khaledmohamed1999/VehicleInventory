# Vehicle Inventory — Frontend

Angular 18 (standalone components) frontend for the VehicleInventory ASP.NET Core API.

## Running it

Requires Node.js and the Angular CLI (`npm install -g @angular/cli`).

```bash
npm install
ng serve
```

Visit `http://localhost:4200`. The app expects the API at `http://localhost:5047/api`
(see `src/environments/environment.ts`) — this matches the `applicationUrl` in your
backend's `Properties/launchSettings.json` (`http` profile). If you run the `https`
profile instead, update the environment file to `https://localhost:7046/api`.

Make sure the backend's CORS policy includes `http://localhost:4200` (it already does
in the `Program.cs` you have).

## Structure

```
src/app/
├── core/
│   ├── models/        Vehicle, Driver, and their enums — mirror the backend DTOs
│   └── services/       VehicleService, DriverService (HttpClient CRUD calls)
├── shared/layout/nav/   Responsive top navigation (hamburger menu under 640px)
└── features/
    ├── vehicles/        vehicle-list (card grid), vehicle-form (create/edit, driver dropdown)
    └── drivers/         driver-list (card grid), driver-form (create/edit)
```

## A note on the API routes

The backend currently uses `[Route("api/[controller]/[action]")]`, so every endpoint
URL includes the action name, e.g. `GET /api/Vehicles/GetAllVehicles` rather than
`GET /api/vehicles`. Both `VehicleService` and `DriverService` centralize this in a
single `BASE` constant per file — if the backend routing reverts to plain
`api/[controller]`, only those two lines need to change, not every method.

## Design

Styled with a palette pulled from Luftborn's site (warm orange accent `#FF7E31` /
`#FB9C63` gradient, black nav bar, clean white cards) — not their logo, which is their
own trademarked asset. The nav uses a small original "VI" wordmark instead. Swap in
the real logo yourself in `nav.component.html` if you have rights to use it.

Responsive breakpoints: the vehicle/driver grids collapse from multi-column to a
single column under 480px, and the top nav collapses into a hamburger menu under 640px.
