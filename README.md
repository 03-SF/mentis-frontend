# MENTIS AI Frontend

AI-powered Career Co-Pilot for Pakistani students - Built with Next.js 14, React, and TailwindCSS.

## Features

✅ **Authentication System**
- User signup with Pakistani student information (education level, grade, stream, location)
- Secure login with JWT tokens
- Token management and automatic refresh
- Protected routes and dashboard

✅ **Professional UI/UX**
- Mentisera brand-inspired design (blue/purple gradients)
- Responsive mobile-first layout
- Modern, accessible components
- Smooth animations and transitions

✅ **Student Profile Management**
- Education level tracking (Matric, Intermediate, Undergraduate, etc.)
- Stream/field selection (Pre-Medical, Pre-Engineering, Computer Science, etc.)
- Location information (Province, City)
- Grade/Year tracking

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 19
- **Styling**: TailwindCSS
- **API Client**: Custom fetch-based wrapper with JWT support
- **Authentication**: JWT tokens stored in localStorage
- **TypeScript**: For type safety

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend server running on `http://localhost:3001`

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**: Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Project Structure

```
mentis-frontend/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx     # Login page
│   │   └── signup/page.tsx    # Multi-step signup form
│   ├── dashboard/page.tsx     # User dashboard (protected)
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── lib/
│   └── api.ts                 # API client with authentication
├── .env.local                 # Environment variables (create this)
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # TailwindCSS configuration
└── package.json               # Dependencies
```

## Pages

### Landing Page (`/`)
- Hero section with MENTIS AI branding
- Feature overview (Assessments, Career Guidance, Learning Paths)
- Call-to-action buttons for signup/login

### Login Page (`/auth/login`)
- Email and password authentication
- Remember me functionality
- Error handling and loading states
- Redirects to `/dashboard` on success

### Signup Page (`/auth/signup`)
- **Step 1**: Account info (name, email, password)
- **Step 2**: Education details (level, grade, stream)
- **Step 3**: Location (city, province) - optional
- Progress indicator with 3 steps
- Form validation

### Dashboard (`/dashboard`)
- Protected route (requires authentication)
- User profile display with personal and education info
- Quick action cards for future features
- Logout functionality

## API Integration

The frontend uses `lib/api.ts` for all backend communication:

```typescript
// Authentication
await authApi.signup(userData);
await authApi.login({ email, password });
await authApi.logout();

// User Profile
await usersApi.getProfile();
await usersApi.updateProfile(updates);
```

**Features**:
- Automatic JWT token injection
- Token storage in localStorage
- Error handling with meaningful messages
- Base URL from environment variables

## Authentication Flow

1. User submits login/signup form
2. Frontend sends credentials to backend API
3. Backend validates and returns JWT tokens
4. Tokens stored in localStorage:
   - `accessToken` (7-day expiry)
   - `refreshToken` (30-day expiry)
   - `user` (user object)
5. Protected pages check for token
6. API client auto-includes token in requests
7. Redirect to login if unauthorized

## Styling

### Brand Colors (Mentisera-inspired)

```tsx
// Primary Gradient
className="bg-gradient-to-r from-blue-600 to-purple-600"

// Background Gradient
className="bg-gradient-to-br from-blue-50 via-white to-purple-50"

// Text Colors
className="text-gray-600"  // Body text
className="text-gray-800"  // Headings
```

### Component Patterns

```tsx
// Card
<div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

// Primary Button
<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition">

// Input
<input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001/api` |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Future Features

- Profile editing
- Psychometric assessments
- AI career recommendations
- Skills tracking
- Learning paths
- Institution database
- Progress analytics

## Troubleshooting

**API requests fail**: Ensure backend is running and `.env.local` has correct API URL

**Login doesn't work**: Check browser DevTools → Application → Local Storage for tokens

**Styles not applying**: Restart dev server (`npm run dev`)

**TypeScript errors**: Run `npm run build` to check type errors

## Contact

**Powered by MENTISERA** - Pakistan's Premier EdTech Solutions Provider

- Website: [mentisera.pk](https://mentisera.pk)
- Email: hello@mentisera.pk
- Phone: +92 334 8880859
- Location: Islamabad, Pakistan
