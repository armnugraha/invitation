export const formatEventDate = (isoString, format = 'full') => {
    const date = new Date(isoString);

    const formats = {
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Jakarta'
        },
        short: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Jakarta'
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Jakarta'
        }
    };

    // Indonesian month names mapping
    const monthsIndonesian = {
        'January': 'Januari',
        'February': 'Februari',
        'March': 'Maret',
        'April': 'April',
        'May': 'Mei',
        'June': 'Juni',
        'July': 'Juli',
        'August': 'Agustus',
        'September': 'September',
        'October': 'Oktober',
        'November': 'November',
        'December': 'Desember'
    };

    // Indonesian day names mapping
    const daysIndonesian = {
        'Sunday': 'Minggu',
        'Monday': 'Senin',
        'Tuesday': 'Selasa',
        'Wednesday': 'Rabu',
        'Thursday': 'Kamis',
        'Friday': 'Jumat',
        'Saturday': 'Sabtu'
    };

    let formatted = date.toLocaleDateString('en-US', formats[format]);

    // Handle time format separately
    if (format === 'time') {
        return date.toLocaleTimeString('en-US', formats[format]);
    }

    // Replace English month and day names with Indonesian ones
    Object.keys(monthsIndonesian).forEach(english => {
        formatted = formatted.replace(english, monthsIndonesian[english]);
    });

    Object.keys(daysIndonesian).forEach(english => {
        formatted = formatted.replace(english, daysIndonesian[english]);
    });

    // Format adjustment for full date
    if (format === 'full') {
        // Convert "Hari, Tanggal Bulan Tahun" format
        const parts = formatted.split(', ');
        if (parts.length === 2) {
            formatted = `${parts[0]}, ${parts[1]}`;
        }
    }

    return formatted;
};