// src/config.js

const config = {
  // Meta Information
  meta: {
    title: "Febri & Arman",
    description: "We are getting married and would love for you to be a part of our celebration.",
    ogImage: "/images/og-image.jpg", // OpenGraph image for social media
    favicon: "/images/favicon.ico",
  },

  couple: {
    groomName: "Febri",
    groomFullName: "Febriati Dian Mubarokah",
    groomParents: "Bapak Suratno dan Ibu Isnainiyah",
    brideName: "Arman",
    brideFullName: "Arman Nugraha",
    brideParents: "Bapak Deni Andrian dan Ibu Popon Kurniati",
  },

  // Event Details
  event: {
    date: "2025-06-28",
    time: "16:22",
    timezone: "WIB",
    dateTime: "2025-06-28T00:00:00Z", // ISO 8601 format
    name: "THE 1997 COFFEE AND SPACE",
    address: "Jl. Raya Panongan, Panongan, Kec. Panongan, Kabupaten Tangerang, Banten 15710",
    time: "07:00 - 12:00 WIB",
    phone: "+62 123 4567 890",
    maps_url: "https://maps.google.com/?q=THE 1997 COFFEE AND SPACE",
    maps_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4084.4430296048076!2d106.5283479469167!3d-6.280132405172213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e4207f897418075%3A0x54003124ceb1f08d!2sThe%201997%20Coffee%20and%20Space!5e0!3m2!1sid!2sid!4v1745654103444!5m2!1sid!2sid5&output=embed&disableDefaultUI=true&zoomControl=false&mapTypeControl=false&streetViewControl=false&fullscreenControl=false",
    direction: "https://www.google.com/maps?saddr=My+Location&daddr=-6.2801131,106.5309373",
    latitude: -6.2801131, // Replace with actual coordinates
    longitude: 106.5309373 // Replace with actual coordinates
  },

  eventDetails: [{
    title: "Akad Nikah (Khusus Keluarga)",
    date: "2025-06-28",
    startTime: "07:00",
    endTime: "09:00",
    timeZone: "Asia/Jakarta",
    location: "THE 1997 COFFEE AND SPACE",
    description: "We invite you to join us in celebrating our wedding ceremony."
  }, {
    title: "Resepsi Nikah",
    date: "2025-06-28",
    startTime: "09:00",
    endTime: "11:00",
    timeZone: "Asia/Jakarta",
    location: "THE 1997 COFFEE AND SPACE",
    description: "We invite you to join us in celebrating our wedding ceremony."
  }],

  audio: {
    src: "https://raw.githubusercontent.com/armnugraha/invitation/main/public/audio/sound.mp3",
    title: "Half My Deen",
    artist: "Safe Adam",
    autoplay: true,
    loop: true,
    toastDuration: 5000,
    pauseOnInactive: true,
    resumeOnReturn: true,
  },

  bankAccounts: [
    {
      bank: 'Bank Central Asia',
      accountNumber: '1234567890',
      accountName: 'Febri',
      logo: '/path/to/bca-logo.png'
    },
    {
      bank: 'Bank Mandiri',
      accountNumber: '0987654321',
      accountName: 'Arman',
      logo: '/path/to/mandiri-logo.png'
    }
  ],
  qris: {
    image: "https://ypp.co.id/site/uploads/qris/5f7c6da47a380-qr-code-dana.jpg"
  }
};

export default config;