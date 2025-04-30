# Sportinjo

![logo-bijeli](https://github.com/user-attachments/assets/2dd0b7ff-bcc6-44b7-8c6a-e8f289bd3079)

Sportinjo is a modern web application that helps users discover and engage with local sports events in Zagreb and surrounding areas. The platform provides real-time information about matches, tournaments, and recreational activities, fostering community engagement through various interactive features.

## 🌟 Features

### 📍 Event Discovery
- **Interactive Map**: Browse sports events on an interactive map with custom markers for different sports
- **Nearby Events**: Find events close to your current location
- **Advanced Filtering**: Filter events by sport type, date range, and location

### 🗓️ Event Details
- **Comprehensive Information**: View match details, team lineups, statistics, and venue information
- **Live Updates**: Get real-time updates for ongoing matches
- **Event Predictions**: Make predictions on match outcomes and earn points

### 💬 Community Features
- **AI Chat Assistant**: Get personalized recommendations and answers to your sports-related questions
- **Event Chat**: Join public chat rooms for specific events to connect with other attendees
- **Team Support**: Follow your favorite teams and connect with fellow fans

### 🏆 Rewards Program
- **Points System**: Earn points for attending events, making correct predictions, and other activities
- **Exclusive Rewards**: Redeem points for unique experiences, event tickets, and sports merchandise
- **Achievement Tracking**: Track your progress and unlock digital achievements

### 📱 Mobile-Friendly Design
- **Responsive UI**: Seamless experience across desktop and mobile devices
- **Location-Aware**: Uses device location for personalized recommendations
- **Offline Support**: Basic functionality available even with limited connectivity

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/sportinjo.git
cd sportinjo
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Built With

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [Recharts](https://recharts.org/) - Data visualization components
- [Supabase](https://supabase.io/) - Authentication and database
- [Lucide Icons](https://lucide.dev/) - Beautiful SVG icons

## 📊 Project Structure

```
sportinjo/
├── app/                  # Next.js pages and layout components
│   ├── chat/             # AI assistant chat interface
│   ├── event/            # Event details and community features
│   ├── map/              # Map view for event discovery
│   ├── notifications/    # User notifications
│   ├── rewards/          # Rewards program pages
│   └── components/       # Shared UI components
├── components/           # Reusable React components
│   └── ui/               # UI component library
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and libraries
├── public/               # Static assets
├── styles/               # Global styles
└── utils/                # Helper utilities
```

## 🔜 Roadmap

- [ ] Event creation for community organizers
- [ ] Integration with sports data APIs for automatic updates
- [ ] Multi-language support
- [ ] Advanced statistics and analytics
- [ ] Social media sharing functionality

## 🧑‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Credits

- Designed and developed by the Sportinjo Team (Karlo Vrancic, Maksim Madzar, Ian Balen)
- Sports icons from [FlatIcon](https://www.flaticon.com/)
- Map data from [OpenStreetMap](https://www.openstreetmap.org/)
