const ical = require('ical-generator').default;

function createICalFile(formatData) {
    const calendar = ical({
        domain: 'example.com',
        prodId: { company: 'Example Inc.', product: 'Calendar' },
        name: 'Generated Calendar',
        timezone: 'Europe/Prague'
    });

    // Vytvoření událostí z JSON dat
    formatData.forEach(eventData => {
        calendar.createEvent({
            start: new Date(eventData.start),
            end: new Date(eventData.end),
            summary: eventData.summary,
            description: eventData.description,
            location: eventData.location
        });
    });

    return calendar.toString();
}

module.exports = { createICalFile };
