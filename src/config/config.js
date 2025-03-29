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
    dateTime: "2025-06-28T01:00:00Z", // ISO 8601 format
    name: "Keboen Djati Diri",
    address: "Jl. AMD Desa Rancakalapa, Panongan, Kec. Panongan, Kabupaten Tangerang, Banten 15710",
    time: "08:00 - 13:00 WIB",
    phone: "+62 123 4567 890",
    maps_url: "https://maps.google.com/?q=Keboen Djati Diri",
    maps_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.88390773576!2d106.51794047499914!3d-6.2789901614632555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e4207221c760d65%3A0xf0b9fe1a999bb008!2sKeboen%20Djati%20Diri!5e0!3m2!1sid!2sid!4v1743213495336!5m2!1sid!2sid",
    direction: "https://www.google.com/maps?saddr=My+Location&daddr=-6.2789902,106.5179405",
    latitude: -6.2789902, // Replace with actual coordinates
    longitude: 106.5179405 // Replace with actual coordinates
  },

  eventDetails: [{
    title: "Akad Nikah",
    date: "2025-06-28",
    startTime: "08:00",
    endTime: "09:00",
    timeZone: "Asia/Jakarta",
    location: "Keboen Djati Diri",
    description: "We invite you to join us in celebrating our wedding ceremony."
  }, {
    title: "Resepsi Nikah",
    date: "2025-06-28",
    startTime: "10:00",
    endTime: "13:00",
    timeZone: "Asia/Jakarta",
    location: "Keboen Djati Diri",
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