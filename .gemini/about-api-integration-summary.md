# About Us API Integration Summary

## Overview
Successfully integrated the about-us API endpoint into the About page with a custom hook and service layer.

## API Endpoint
- **URL**: `https://briataor.thesyndicates.team/api/v1/about-us`
- **Method**: GET
- **Response Structure**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "About us retrieved successfully",
    "data": {
      "hero_banner": {
        "id": 4,
        "title": "Meet The Artist",
        "image": "https://...",
        "video_url": null
      },
      "about_section": [...],
      "exhibitions": [...],
      "own_a_timeless_artwork": {...}
    }
  }
  ```

## Files Created

### 1. Service Layer
- **File**: `services/about/index.ts`
- **Purpose**: Server-side function to fetch about-us data from the API
- **Features**:
  - Error handling
  - 60-second revalidation cache
  - Proper headers configuration

### 2. Custom Hook
- **File**: `services/hooks/useAboutUs.ts`
- **Purpose**: Client-side hook to manage about-us data state
- **Features**:
  - Loading state management
  - Error handling
  - TypeScript interfaces for type safety
  - Automatic data fetching on mount

### 3. Hook Export
- **File**: `services/hooks/index.ts`
- **Update**: Added export for `useAboutUs` hook

## Components Updated

### 1. About Page (`app/(MainLayout)/about/page.tsx`)
- Converted to client component
- Integrated `useAboutUs` hook
- Added loading and error states
- Passes dynamic data to child components

### 2. MeetArtist Component (`pages/home/artist/MeetArtist.tsx`)
- Added optional `image` prop
- Uses API image when provided, falls back to static image
- Displays dynamic title and description from API

### 3. Exhibitions Component (`pages/about/exhibitions/Exhibitions.tsx`)
- Added `image` and `titles` props
- Displays dynamic exhibition titles from API
- Uses API image for the exhibition photo
- Maintains fallback to static data if props not provided

### 4. TimelessArtwork Component (`pages/home/timeless-artwork/TimelessArtwork.tsx`)
- Added `browseGalleryLink` and `contactUsLink` props
- Uses API links for buttons
- Falls back to default routes if not provided

## Data Flow

1. **Page Load**: About page component mounts
2. **Hook Initialization**: `useAboutUs` hook is called
3. **API Request**: Hook calls `getAboutUsData` service function
4. **Data Fetch**: Service makes GET request to API endpoint
5. **State Update**: Hook updates state with response data
6. **Component Render**: Page passes data to child components
7. **Display**: Components render with dynamic API data

## Type Safety

All data structures are properly typed with TypeScript interfaces:
- `IAboutUsData`: Main data structure
- `ExhibitionsProps`: Exhibition component props
- `TimelessArtworkProps`: Timeless artwork component props

## Error Handling

- Loading state with spinner animation
- Error state with user-friendly message
- Fallback to static data in child components
- Console error logging for debugging

## Features

✅ Dynamic hero banner with API image and title
✅ Dynamic about section with name, description, and image
✅ Dynamic exhibitions list with titles and image
✅ Dynamic links for "Browse Gallery" and "Contact Us" buttons
✅ Loading states for better UX
✅ Error handling and fallbacks
✅ Type-safe implementation
✅ Server-side caching (60s revalidation)

## Testing

To test the integration:
1. Navigate to `/about` page
2. Verify loading state appears briefly
3. Confirm all content loads from API
4. Check browser console for any errors
5. Verify images load correctly
6. Test button links work as expected
