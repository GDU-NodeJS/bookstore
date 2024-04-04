import { connect } from 'mongoose';
import configData from './config/config.json' assert { type: 'json' };

const mongoDBURL = configData.mongoDBURL; 
(async () => {
  try {
    await connect(mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
})();
