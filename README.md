# Sakeenah: Modern Islamic Wedding Invitation Website

![Preview](public/preview.png)

A beautiful, modern, and interactive wedding invitation website built with Vite ( React ), Tailwind CSS, and Framer Motion. Created with ❤️ by [@mrofisr](https://github.com/mrofisr).

## ✨ Features

- 🎨 Modern and elegant design
- 📱 Fully responsive layout
- 🎵 Background music with controls
- 💌 Interactive wishes section ( WIP )
- ⚡ Smooth animations and transitions
- 🎉 Confetti effects
- 📅 Countdown timer
- 🗺️ Google Maps integration
- 📱 Mobile-first approach

## 🚀 Tech Stack

- [Vite ( React )](https://vite.dev/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide Icons](https://lucide.dev/) - Icons
- [React Confetti](https://www.npmjs.com/package/react-confetti) - Confetti Effects

## 📦 Installation

1. Clone this repository:
```bash
git clone https://github.com/mrofisr/wedding-invitation.git
cd wedding-invitation
bun install
```

2. Configure your wedding details:
- Open src/config.js
- Update the configuration with your wedding information
- Customize colors, themes, and other settings

3. Run the development server:
```bash
bun run dev
```

Open http://localhost:3000 with your browser to see the result.

## 🎨 Customization
Configuration
All customizable options are available in src/config.js:

```JavaScript
const config = {
  meta: {
    title: "Your Wedding Title",
    // ...
  },
  couple: {
    groomName: "Groom Name",
    brideName: "Bride Name",
    // ...
  },
  // ... other configurations
};
```

## 📝 License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024-present mrofisr

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

### Commercial Use

This software can be used commercially. You may:
- Use the software for commercial purposes
- Modify the software and create derivative works
- Distribute the software and modifications
- Sublicense and sell copies of the software

### Requirements

When using this software, you must:
- Include the original copyright notice
- Include the Apache License 2.0
- State significant changes made to the software
- Include any notices in source files that have been modified

### Additional Protection

The Apache License 2.0 provides:
- Patent protection
- Trademark protection
- No warranty or liability
- Clear contribution terms

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=mrofisr/islamic-wedding-invitation&type=Date)](https://star-history.com/#mrofisr/islamic-wedding-invitation&Date)

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check issues page.

## 💖 Support
Give a ⭐️ if this project helped you!

## 🤲 Closing Statement
May Allah, the Most Glorified and Exalted, grant us guidance and success, and make this project a lasting charity (amal jariyah).

## 📫 Contact
- GitHub: [@mrofisr](https://github.com/mrofisr)
- Instagram: [@mrofisr](https://instagram.com.com/mrofisr)

Made with ❤️ by **[@mrofisr](https://instagram.com.com/mrofisr)**

https://www.google.com/maps?saddr=My+Location&daddr=-6.2417792,106.5120861

Linking to a location (No directions)

https://www.google.com/maps?q=760+West+Genesee+Street+Syracuse+NY+13204
No starting point (User input required to generate directions).

https://www.google.com/maps?daddr=760+West+Genesee+Street+Syracuse+NY+13204
With a set location as starting point (Automatically generates directions with no user input required).

https://www.google.com/maps?saddr=760+West+Genesee+Street+Syracuse+NY+13204&daddr=314+Avery+Avenue+Syracuse+NY+13204
With "My Location" as starting point (Automatically generates directions with no user input required).

https://www.google.com/maps?saddr=My+Location&daddr=760+West+Genesee+Street+Syracuse+NY+13204
Current Location to Latitude and Longitude

https://www.google.com/maps?saddr=My+Location&daddr=43.12345,-76.12345
Query search of a Latitude and Longitude. Also shows setting a default zoom level.

https://www.google.com/maps?ll=43.12345,-76.12345&q=food&amp;z=14
String search as destination

https://www.google.com/maps?saddr=My+Location&daddr=Pinckney+Hugo+Group

npm run build
npm run deploy