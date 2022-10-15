const mongoose = require('mongoose');

const DB_URI = process.env.ATLAS_URI || "mongodb://localhost/project-management"

const connect = async () => {
  try {
    const x = await mongoose.connect(DB_URI);
    console.log(`Connected to DB: ${x.connections[0].name}`);
  } catch (error) {
    console.error('Error trying to connect to DB.', error);
  }
}

connect();