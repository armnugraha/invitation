// src/config.js

const config = {
  // Meta Information
  meta: {
    title: "Febri & Arman Wedding",
    description: "We are getting married and would love for you to be a part of our celebration.",
    ogImage: "/images/og-image.jpg", // OpenGraph image for social media
    favicon: "/images/favicon.ico",
  },

  couple: {
    groomName: "Febri",
    brideName: "Arman",
  },

  // Event Details
  event: {
    date: "2025-06-28",
    time: "16:22",
    timezone: "WIB",
    dateTime: "2025-06-28T00:00:00Z", // ISO 8601 format
    name: "Puri Eka Bachtiar",
    address: "Jl. Raya Peusar, Sukamulya, Kec. Cikupa, Kabupaten Tangerang, Banten 15710",
    time: "07:00 - 13:00 WIB",
    phone: "+62 123 4567 890",
    maps_url: "https://maps.google.com/?q=Puri Eka Bachtiar",
    maps_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1664710111863!2d106.51208607499869!3d-6.241779161120018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e42070f450ac91f%3A0x81ee26571497d90b!2sPuri%20Eka%20Bachtiar!5e0!3m2!1sid!2sid!4v1740283475560!5m2!1sid!2sid",
    direction: "https://www.google.com/maps?saddr=My+Location&daddr=-6.2417792,106.5120861",
    latitude: -6.2417792, // Replace with actual coordinates
    longitude: 106.5120861 // Replace with actual coordinates
  },

  eventDetails: [{
    title: "Akad Nikah",
    date: "2025-06-28",
    startTime: "07:00",
    endTime: "09:00",
    timeZone: "Asia/Jakarta",
    location: "Puri Eka Bachtiar",
    description: "We invite you to join us in celebrating our wedding ceremony."
  }, {
    title: "Resepsi Nikah",
    date: "2025-06-28",
    startTime: "10:00",
    endTime: "13:00",
    timeZone: "Asia/Jakarta",
    location: "Puri Eka Bachtiar",
    description: "We invite you to join us in celebrating our wedding ceremony."
  }],

  audio: {
    src: "/audio/backsound.mp3",
    title: "Fulfilling Humming",
    artist: "Nasheed",
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