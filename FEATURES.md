# RELIVO - Hackathon Feature Tracker

This document tracks the progress of all features required for the POTTY PANIC (Relivo) prototype. 

### Status Key
- 🟢 **Completed**: Fully implemented and working.
- 🟡 **Needs Improvement**: Partially implemented but missing some edge cases or polish requested by the prompt.
- 🔴 **Not Started**: Has not been implemented yet.

---

## 1. Core Application & Design
- 🟢 **Application Launches**: Vite/React application starts successfully.
- 🟢 **Responsive Interface**: Mobile-first design using Tailwind CSS; works on both desktop and mobile.
- 🟢 **Brand Identity**: Implemented "RELIVO" branding, deep-plum/off-white colors, coral accent, and exact tagline.
- 🟢 **Dark Mode**: Persists in `localStorage` and toggles seamlessly.

## 2. Map & Location Services (Feature A)
- 🟢 **Interactive Map**: `react-leaflet` integrated with OpenStreetMap tiles.
- 🟢 **Browser Geolocation**: Fetches GPS coordinates upon user permission.
- 🟡 **Live Restroom Data**: Integrates Overpass API for live OSM restroom nodes. *(Needs Improvement: robust handling of all OSM metadata tags like `opening_hours` isn't fully parsed yet).*
- 🔴 **Location Search**: Search by place/landmark text (Geocoding fallback).

## 3. Emergency Mode (Feature B)
- 🟡 **Find A Toilet Now**: Button triggers search and selects a candidate. *(Needs Improvement: Does not currently show "up to two alternatives" explicitly in a separate UI).*
- 🔴 **Nearest vs. Best Comparison**: Explaining the trade-off between the closest restroom and the highest-rated restroom.

## 4. Reliability Scoring (Feature C)
- 🟢 **Score Calculation Engine**: Algorithm correctly weights Availability (30%), Cleanliness (25%), Accessibility (20%), Facilities (15%), Affordability (10%).
- 🟢 **Provisional Scoring**: Correctly scales the score and shows a "Provisional" badge with data coverage percentage when factors are unknown.

## 5. Trust and Report Freshness (Feature D & E)
- 🟡 **Community Reporting**: Users can file 'Clean' or 'Dirty' reports that save to local state with timestamps. *(Needs Improvement: The UI should allow reporting more options like Open/Closed/Accessible).*
- 🔴 **Freshness Labels**: Translate timestamps into explicit labels ("Very fresh", "Recent", "Aging", "Stale").

## 6. Filters & Navigation (Feature F & G)
- 🟢 **Filters**: "Free-only" and "Wheelchair accessible" filters successfully alter the live list and map markers.
- 🟢 **Navigation Links**: Generates an external Google Maps routing link for the selected restroom.
- 🟡 **Walking Time Estimates**: Basic mathematical estimation implemented based on distance. *(Needs Improvement: Does not use a live routing API like OSRM).*
- 🟢 **Facility Tags**: Dynamically generated badges based on known data (e.g., "Wheelchair access", "Paid").

## 7. Resilience & Demo Mode (Feature I)
- 🟢 **Demo Dataset**: Included a realistic fallback JSON dataset with multiple restrooms and pre-populated factors.
- 🟢 **Honest Data Labels**: Badges indicate whether the user is seeing "Demo Data" or "Live Data", and notes "Local demo data" for reports.
- 🟢 **Graceful Fallbacks**: Map defaults to Central Park, Overpass API failures safely revert to Demo Mode.
