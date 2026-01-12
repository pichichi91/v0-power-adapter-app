# Power Adapter App - HTML/jQuery Version

This is the HTML/jQuery version of the Power Adapter application. It provides the same functionality as the Next.js version but uses plain HTML, CSS, and jQuery.

## Files Structure

- `index.html` - Main browse page with filtering capabilities
- `travel.html` - Travel compatibility checker page
- `styles.css` - All CSS styles (converted from Tailwind)
- `app.js` - jQuery JavaScript for both pages
- `data.js` - Adapter data for all countries
- `icons.js` - SVG icon functions for plug types and continents

## Features

### Browse Page (`index.html`)
- Filter countries by continent
- Filter countries by plug type (with cascading filters)
- Search countries by name
- View country details (voltage, frequency, plug types)
- Plug type reference guide
- Modal view for enlarged plug type icons

### Travel Page (`travel.html`)
- Select origin and destination countries
- Check plug compatibility between countries
- View voltage and frequency differences
- See compatible plug types
- Warnings for voltage/frequency mismatches

## Usage

Simply open `index.html` in a web browser. No build process or server required.

### Dependencies

- jQuery 3.7.1 (loaded from CDN)
- Flag images from flagcdn.com (loaded from CDN)

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- jQuery 3.x

## Notes

- All data is loaded from `data.js` and `icons.js`
- The app uses jQuery for DOM manipulation and event handling
- CSS variables are used for theming (supports dark mode via `.dark` class)
- No build tools or package managers required
