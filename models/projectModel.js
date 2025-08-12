const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
  details: {  
    age: String,
    breed: String,
    personality: String
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
