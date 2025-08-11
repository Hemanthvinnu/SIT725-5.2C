const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myprojectDB')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

// 2. Define the Project model
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
const Project = mongoose.model('Project', ProjectSchema);

const sampleProjects = [
  {
    title: "Kitten 1",
    image: "images/kitten.jpg",
    link: "About Kitten 1",
    description: "Sweet little kitten saying hello!",
    details: {
      age: "2 months",
      breed: "Tabby",
      personality: "Friendly and playful"
    }
  },
  {
    title: "Kitten 2",
    image: "images/kitten-2.jpg",
    link: "About Kitten 2",
    description: "Adorable little furball looking for cuddles",
    details: {
      age: "3 months",
      breed: "Siamese",
      personality: "Calm and affectionate"
    }
  },
  {
    title: "Kitten 3",
    image: "images/kitten-3.jpg",
    link: "About Kitten 3",
    description: "Playful kitten ready for adventures",
    details: {
      age: "1.5 months",
      breed: "Persian",
      personality: "Energetic and curious"
    }
  }
];

// 4. Seed function
async function seedDatabase() {
  try {
    // Clear existing data
    await Project.deleteMany();
    console.log("🧹 Cleared previous kitten data");

    await Project.insertMany(sampleProjects);
    console.log("🐱 Successfully seeded 3 kittens!");

    // Verify counts
    const count = await Project.countDocuments();
    console.log(`📊 Total kittens in database: ${count}`);

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

// Run after connection is established
mongoose.connection.once('open', seedDatabase);