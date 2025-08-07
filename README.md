# Otto AI English GB Pages

A complete English GB localization of the Otto AI website with enhanced features and modern UI.

## 🚀 Features

- **Complete English GB Localization** - Converted from Spanish to English
- **Enhanced Review Slider** - Auto-sliding reviews every 3 seconds with manual navigation
- **Global Components** - Reusable header and footer components
- **Mobile Responsive** - Optimized for all device sizes
- **Clean URLs** - Custom Node.js server for SEO-friendly URLs
- **Modern UI** - Professional invoicing and bookkeeping pages

## 📁 Project Structure

```
en-gb/
├── components/          # Global header and footer components
├── css/                # Stylesheets and CSS files
├── fonts/              # Web fonts (Suisse Intl, Font Awesome)
├── images/             # All project images and assets
├── js/                 # JavaScript files including enhanced slider
├── index.html          # Main landing page
├── invoicing.html      # Invoicing page with review slider
├── _headers            # HTTP headers for CDN
└── _redirects          # URL redirection rules
```

## 🛠️ Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/srishti-getvisible/en-gb-otto.git
cd en-gb-otto

# Install dependencies
npm install
```

### Running the Development Server
```bash
# Start development server
npm run dev

# The site will be available at:
# http://localhost:3000/en-gb/
# http://localhost:3000/en-gb/invoicing
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run start        # Start production server
npm run format       # Format HTML files for readability
npm run include      # Include global components
```

## 🎯 Key Features

### Enhanced Review Slider
- **Auto-slide** every 3 seconds
- **Manual navigation** with arrow buttons
- **Dot navigation** for direct slide access
- **Touch/swipe support** for mobile devices
- **Keyboard navigation** (arrow keys)
- **Pause on hover** functionality
- **Tab visibility detection** - pauses when tab is not active

### Global Components
- **Header Component** - Reusable navigation with login/signup buttons
- **Footer Component** - Responsive footer with mobile optimization
- **Component System** - Easy to maintain and update

### Clean URLs
- **Custom Node.js Server** - Handles clean URLs without .html extensions
- **URL Decoding** - Properly handles URL-encoded characters
- **SEO Friendly** - Optimized for search engines

## 🎨 Design Features

- **Professional UI** - Modern, clean design
- **Mobile Responsive** - Optimized for all screen sizes
- **Accessibility** - ARIA labels and keyboard navigation
- **Performance** - Optimized assets and loading
- **Brand Consistency** - Otto AI branding throughout

## 📱 Mobile Features

- **Touch Navigation** - Swipe to navigate reviews
- **Responsive Layout** - Adapts to all screen sizes
- **Mobile-Optimized Footer** - Left-aligned content on small screens
- **Touch-Friendly Buttons** - Proper sizing for mobile interaction

## 🔧 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with responsive design
- **JavaScript/jQuery** - Interactive features and slider functionality
- **Node.js** - Custom development server
- **Git** - Version control

## 📄 Pages

### Main Landing Page (`/en-gb/`)
- Hero section with call-to-action
- Feature highlights
- Customer testimonials
- Footer with links and contact info

### Invoicing Page (`/en-gb/invoicing`)
- Comprehensive invoicing features
- **Enhanced review slider** with auto-slide
- Step-by-step guide
- FAQ section
- Template showcase

## 🚀 Deployment

The project is ready for deployment to any static hosting service:

- **Netlify** - Drag and drop deployment
- **Vercel** - Git-based deployment
- **GitHub Pages** - Direct from repository
- **Cloudflare Pages** - Fast global CDN

## 📝 License

This project is part of the Otto AI platform. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, contact the development team.

---

**Built with ❤️ for Otto AI** 