# Midnight Cafe 🌙✨

[![MIT License](https://img.shields.io/badge/License-MIT-gold.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)

A modern, responsive restaurant website built with React and Vite, featuring an elegant dark theme with gold accents, interactive menu system, reservation form, and seamless user experience.

![Midnight Cafe Preview](https://i.imgur.com/JqYeZvn.png)

## ✨ Features

- 🍽️ **Interactive Menu** with category tabs and add-to-cart functionality
- 📅 **Online Reservation System** with intuitive date/time picker
- 🛒 **Shopping Cart** with real-time quantity adjustment
- 📱 **Fully Responsive** design optimized for all device sizes
- 🌙 **Elegant Dark Theme** with gold accents for sophisticated nighttime aesthetic
- ✨ **Smooth Animations & Transitions** for enhanced user experience
- 🖼️ **Image Gallery** showcasing restaurant ambiance and signature dishes
- 💬 **Customer Testimonials** carousel highlighting dining experiences
- 📰 **Newsletter Subscription** for customer engagement
- 📱 **Instagram Feed Integration** for social media presence

## 🚀 Demo

[View Live Demo](https://midnight-cafe.vercel.app) • [Video Walkthrough](https://youtu.be/demo-link)

## 🛠️ Technologies Used

- ⚛️ **React 18** - Frontend library
- 🚀 **Vite** - Frontend tooling
- 💅 **CSS Variables** - For consistent theming
- 🎨 **React Icons** - For beautiful iconography
- 🔄 **Swiper.js** - For testimonials carousel
- 📅 **React Flatpickr** - For date/time selection
- 🖼️ **Lightgallery** - For interactive image gallery

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/midnight-cafe.git
   cd midnight-cafe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser** at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── Header/            # Navigation and cart sidebar
│   ├── Hero/              # Landing section with slider
│   ├── About/             # Restaurant story section
│   ├── Menu/              # Interactive menu system
│   ├── Specials/          # Weekly specials showcase
│   ├── Reservation/       # Online booking form
│   ├── Testimonials/      # Customer reviews carousel
│   ├── Gallery/           # Photo gallery
│   ├── Events/            # Upcoming events
│   ├── Instagram/         # Instagram feed
│   ├── Newsletter/        # Email subscription
│   ├── Footer/            # Site footer
│   ├── Loader/            # Loading animation
│   └── BackToTop/         # Scroll to top button
├── styles/                # Global styles and variables
├── assets/                # Images and static files
├── App.jsx                # Main application component
└── main.jsx              # Application entry point
```

## 🎨 Customization

### Change Color Theme

Edit the CSS variables in `src/styles/variables.css`:

```css
:root {
  --dark: #121212;
  --darker: #0a0a0a;
  --gold: #D4AF37;
  /* ...other variables */
}
```

### Update Menu Items

Modify the menu data in `src/components/Menu/Menu.jsx`:

```javascript
const menuData = {
  dinner: [
    {
      id: 1,
      name: "New Dish Name",
      price: 39,
      description: "New description",
      image: "/path/to/image.jpg",
      tags: ["Chef's Special"]
    }
  ]
};
```

## 🚢 Deployment

To build for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be in the `dist/` directory, ready for deployment to:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)
- Any static hosting service

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- Desktop screens
- Tablets
- Mobile devices

Layout adjusts dynamically with:
- Appropriate font sizing
- Optimized image loading
- Mobile-friendly navigation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Your Name - [@yourtwitter](https://twitter.com/yourhandle) - your.email@example.com

Project Link: [https://github.com/your-username/midnight-cafe](https://github.com/your-username/midnight-cafe)

---

Made with ❤️ by [Your Name](https://your-portfolio.com)
