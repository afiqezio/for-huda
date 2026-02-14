# 💖 For Huda's Hub

A sophisticated, mobile-responsive web application designed as a "Love Archive" for Huda. This system serves as a centralized portal (Catalogue) for various romantic milestones.

## 🏗️ Architecture

The system is built with a modern, high-performance frontend stack optimized for seamless user experiences and rapid deployment.

### Tech Stack
- **Framework**: [React 19](https://react.dev/) (Functional components with Hooks).
- **Build Tool**: [Vite 6](https://vitejs.dev/) for lightning-fast development and optimized production bundling.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) using a utility-first approach for responsive, custom-themed UI.
- **Routing**: [React Router 7](https://reactrouter.com/) using `HashRouter` to ensure compatibility with GitHub Pages' static hosting.
- **Icons**: [Lucide React](https://lucide.dev/) for lightweight, consistent iconography.
- **Typography**: Google Fonts integration (Dancing Script, Playfair Display, Inter).

### Design Patterns
- **Centralized Data Configuration**: All text, images, and content are managed in `src/data/config.ts` to separate content from logic.
- **Component-Based UI**: Reusable components like `FloatingHearts` and `EventCard` ensure visual consistency.
- **Glassmorphism**: Extensive use of backdrop-blur and translucency for a premium "app-like" feel.

## ✨ Key Features

### 1. The Love Archive (Catalogue)
A portal acting as a museum-style entry point. Features high-impact cards with hover/touch effects to direct the user to specific celebration pages.

### 2. National Girlfriend Day Page
- **Polaroid-style Gallery**: Responsive masonry layout with subtle rotations.
- **Featured Frame**: A spotlight section for the "Favorite Photo."
- **Interactive Love Letter**: A clean, elegant reading experience.

### 3. Valentine's Day Page
- **The "Library of Us"**: A scrollable digital journal of relationship milestones.
- **Interactive Proposal**: A playful "Will you be my Valentine?" section with a "jumping" No-button that evades touch/clicks on mobile.
- **Gated Experience**: Content is revealed only after the "Yes" interaction.

### 4. Mobile Excellence
- **Touch-optimized**: Large tap targets and touch-specific event listeners for the "No" button.
- **Responsive Typography**: Fluid font scaling across mobile, tablet, and desktop.
- **Navigation**: Dedicated back-navigation on every sub-page to return to the Catalogue.

## 🛠️ Development

### Prerequisites
- Node.js (v20 or higher)
- npm

### Local Setup
1. Clone the repository to your local machine.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

### Customizing Content
To update photos or text for Huda, modify only the `data/config.ts` file. The UI will automatically adapt to the new content.

## 🚀 Deployment

The system is configured for **Continuous Deployment (CD)** via GitHub Actions.

### Automated Workflow
Every push to the `main` branch triggers the `.github/workflows/deploy.yml` workflow which:
1. Installs dependencies.
2. Builds the production-ready React app.
3. Deploys the `dist` folder to the `gh-pages` branch.

### One-Time GitHub Setup
To enable the site, you must perform this step on GitHub:
1. Navigate to your repository **Settings**.
2. Click **Pages** in the left sidebar.
3. Under **Build and deployment > Source**, select **GitHub Actions** from the dropdown.

---
*Created with love by Afiq.*
