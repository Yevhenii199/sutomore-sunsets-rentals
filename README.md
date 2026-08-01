# sutomore-apartment

Create a modern, high-converting website for apartment rentals (Single Property Rental) using Vite + React + Tailwind CSS + Shadcn UI.

1. Data and Content Source:

Get the main information (text, description, apartment features) from this website: [https://yevhenii199.github.io/rent-apartment-in-sutomore/](https://yevhenii199.github.io/rent-apartment-in-sutomore/).

Style the website with a premium, modern minimalist look (use soft fonts, high-quality indents, and smooth animations using Framer Motion).

2. Page Structure:

Hero Section: Large, high-quality headline, brief unique selling proposition, and a bright "Book Now" call-to-action button. Add a background image or slider.

Gallery: Implement a stylish grid (Bento Grid) or interactive slider for property photos with full-screen viewing.

Amenities: Use icons (Lucide-react) to display Wi-Fi, air conditioning, kitchen, etc.

Interactive Map: Insert a section with Google Maps or Leaflet showing the location in Sutomore, Montenegro.

Reservations: Create a clean booking form (name, dates via Date Picker, number of guests, phone number).

FAQ and Reviews: A frequently asked questions section and a section with guest reviews.

3. Tech Stack and Functionality:

Notifications: Prepare the logic for submitting data from the booking form. I plan to use a Telegram bot to receive instant notifications about new requests.

Database: Consider integrating with Supabase for storing requests and managing content in the future.

SEO: Use semantic tags (header, main, section, footer), write meta tags, and optimize images (support WebP/AVIF formats for high loading speed).

Responsiveness: Fully optimized for mobile devices (mobile-first design).

4. Design System:

Color Palette: Pure white, deep graphite, and an accent color (e.g., navy blue or warm sand).

Components: Use buttons and inputs from the Shadcn UI library for consistency.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f7b99c36-305b-4478-b1fe-76f9791eb94f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
