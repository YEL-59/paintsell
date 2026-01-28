# FAQ, Privacy Policy & Terms of Service Integration

## Overview
Successfully created three new pages with full API integration: FAQ, Privacy Policy, and Terms of Service.

## API Endpoints

### 1. FAQ
- **Endpoint**: `/faqs`
- **Response Structure**:
```json
{
  "success": true,
  "data": {
    "faqs": [
      {
        "id": 1,
        "question": "What is your return policy?",
        "answer": "We offer a 30-day return policy...",
        "order": 1,
        "created_at": "2026-01-28T08:57:54.000000Z",
        "updated_at": "2026-01-28T08:57:54.000000Z"
      }
    ]
  }
}
```

### 2. Privacy Policy
- **Endpoint**: `/privacy-policy`
- **Response Structure**:
```json
{
  "success": true,
  "data": {
    "hero_banner": null,
    "privacy_policy_section": [{
      "id": 2,
      "name": "Privacy Policy",
      "image": "https://...",
      "short_description": "...",
      "description": "...",
      "order": 1,
      "link": null
    }],
    "own_a_timeless_artwork": {
      "browse_gallery_link": "...",
      "contact_us_link": "..."
    }
  }
}
```

### 3. Terms of Service
- **Endpoint**: `/terms-of-service`
- **Response Structure**: Same as Privacy Policy

## Files Created

### Services Layer
1. **`services/faq/index.ts`** - FAQ data fetching service
2. **`services/privacy/index.ts`** - Privacy policy data fetching service
3. **`services/terms/index.ts`** - Terms of service data fetching service

### Hooks Layer
1. **`services/hooks/useFAQs.ts`** - FAQ state management hook
2. **`services/hooks/usePrivacyPolicy.ts`** - Privacy policy state management hook
3. **`services/hooks/useTermsOfService.ts`** - Terms of service state management hook
4. **`services/hooks/index.ts`** - Updated to export all new hooks

### Pages
1. **`app/(MainLayout)/faq/page.tsx`** - FAQ page with accordion UI
2. **`app/(MainLayout)/privacy/page.tsx`** - Privacy policy page
3. **`app/(MainLayout)/terms/page.tsx`** - Terms of service page

## Page Features

### FAQ Page (`/faq`)
✅ **Accordion-style Q&A** - Expandable/collapsible questions
✅ **Smooth animations** - Framer Motion transitions
✅ **Plus/Minus icons** - Visual indicators for expand/collapse
✅ **Contact CTA** - "Still Have Questions?" section
✅ **Responsive design** - Mobile-friendly layout
✅ **Loading states** - Spinner during data fetch
✅ **Error handling** - User-friendly error messages

**Key Components:**
- Animated header with title and description
- FAQ items with hover effects
- AnimatePresence for smooth expand/collapse
- Contact section with CTA button

### Privacy Policy Page (`/privacy`)
✅ **Hero section** - Title and short description
✅ **Image-text layout** - Side-by-side content display
✅ **Additional sections** - Information We Collect, How We Use, etc.
✅ **Timeless Artwork CTA** - Bottom section
✅ **Scroll animations** - Elements animate on scroll
✅ **Responsive grid** - Adapts to screen size

**Layout:**
- Hero section with centered content
- Two-column layout (image left, text right)
- Additional information sections
- TimelessArtwork component integration

### Terms of Service Page (`/terms`)
✅ **Hero section** - Title and short description
✅ **Image-text layout** - Side-by-side content (reversed order)
✅ **Additional sections** - Acceptance, Use of Services, etc.
✅ **Timeless Artwork CTA** - Bottom section
✅ **Scroll animations** - Elements animate on scroll
✅ **Responsive grid** - Adapts to screen size

**Layout:**
- Hero section with centered content
- Two-column layout (text left, image right)
- Additional terms sections
- TimelessArtwork component integration

## Design Features

### Typography
- **Headings**: Font Serif (elegant, professional)
- **Body Text**: Font Lato (readable, modern)
- **Color Scheme**: 
  - Primary: `#141414` (dark text)
  - Secondary: `#404040` (body text)
  - Accent: `#0C2E46` (buttons, icons)

### Animations
- **Framer Motion** for smooth transitions
- **Scroll-triggered animations** on content sections
- **Hover effects** on interactive elements
- **AnimatePresence** for FAQ accordion

### Responsive Design
- Mobile-first approach
- Breakpoints: `md:`, `lg:`, `xl:`, `2xl:`
- Flexible grid layouts
- Adaptive typography sizes

## Data Flow

1. **Page Load** → Component mounts
2. **Hook Call** → Custom hook (useFAQs, usePrivacyPolicy, useTermsOfService)
3. **Service Call** → Server-side fetch function
4. **API Request** → GET request to endpoint
5. **State Update** → Hook updates state with response
6. **Render** → Component displays dynamic content

## Type Safety

All data structures are properly typed with TypeScript:

```typescript
// FAQ
interface IFAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
  created_at: string;
  updated_at: string;
}

// Privacy Policy & Terms
interface IPrivacyPolicyData {
  hero_banner: any | null;
  privacy_policy_section: Array<{
    id: number;
    name: string;
    image: string;
    short_description: string;
    description: string;
    order: number;
    link: string | null;
  }>;
  own_a_timeless_artwork: {
    browse_gallery_link: string;
    contact_us_link: string;
  };
}
```

## Footer Integration

The footer links are already configured:
- **FAQ**: `/faq` ✅
- **Privacy Policy**: `/privacy` ✅
- **Terms of Service**: `/terms` ✅

## Error Handling

All pages include:
- Loading states with spinners
- Error states with user-friendly messages
- Fallback content if API fails
- Console error logging for debugging

## SEO Optimization

- Semantic HTML structure
- Proper heading hierarchy (h1, h2, h3)
- Descriptive page titles
- Meta descriptions (can be added)
- Clean URL structure

## Testing Checklist

### FAQ Page
- [ ] Navigate to `/faq`
- [ ] Verify FAQs load from API
- [ ] Test accordion expand/collapse
- [ ] Check animations work smoothly
- [ ] Test "Contact Us" button
- [ ] Verify responsive design

### Privacy Policy Page
- [ ] Navigate to `/privacy`
- [ ] Verify content loads from API
- [ ] Check image displays correctly
- [ ] Test scroll animations
- [ ] Verify responsive layout
- [ ] Test TimelessArtwork CTA

### Terms of Service Page
- [ ] Navigate to `/terms`
- [ ] Verify content loads from API
- [ ] Check image displays correctly
- [ ] Test scroll animations
- [ ] Verify responsive layout
- [ ] Test TimelessArtwork CTA

## Performance Optimization

- **Server-side caching**: 60-second revalidation
- **Image optimization**: Next.js Image component
- **Code splitting**: Automatic with Next.js
- **Lazy loading**: Images load as needed

## Future Enhancements

Potential improvements:
- Add breadcrumbs navigation
- Implement search functionality for FAQs
- Add "Last Updated" timestamps
- Include table of contents for long pages
- Add print-friendly styles
- Implement dark mode support

## Summary

✅ **3 Services Created** - FAQ, Privacy, Terms
✅ **3 Hooks Created** - Type-safe state management
✅ **3 Pages Created** - Beautiful, responsive UI
✅ **Full API Integration** - Dynamic content from backend
✅ **Loading & Error States** - Robust error handling
✅ **Animations** - Smooth, professional transitions
✅ **Responsive Design** - Works on all devices
✅ **Type Safety** - Full TypeScript support
