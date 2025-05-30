const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const { v4: uuidv4 } = require('uuid');
const Event = require('../models/Event');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/analytics';

const EVENT_TYPES = ['view', 'click', 'location'];

const generatePayload = (type) => {
  switch (type) {
    case 'view':
      return {
        url: faker.internet.url(),
        title: faker.lorem.words(3)
      };
    case 'click':
      return {
        element_id: faker.string.uuid(),
        text: faker.lorem.word(),
        xpath: `/html/body/div[${faker.number.int({ min: 1, max: 10 })}]/button[1]`
      };
    case 'location':
      return {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        accuracy: faker.number.float({ min: 5, max: 100 })
      };
    default:
      return {};
  }
};


const generateEvents = async (count = 2000) => {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB for event generation');

  const events = [];

  for (let i = 0; i < count; i++) {
    const type = faker.helpers.arrayElement(EVENT_TYPES);

const randomDate = faker.date.between({
  from: new Date('2025-05-01'),
  to: new Date('2025-05-29')
});

    events.push({
      event_id: uuidv4(),
      user_id: faker.internet.username(),
      event_type: type,
      timestamp: randomDate,
      payload: generatePayload(type)
    });
  }

  await Event.insertMany(events);
  console.log(`🎉 Inserted ${count} events successfully!`);
  mongoose.disconnect();
};

generateEvents();
