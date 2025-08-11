const express = require("express");
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cardList = [
  {
    title: "Kitten 1",
    image: "images/kitten.jpg",
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
    description: "Playful kitten ready for adventures",
    details: {
      age: "1.5 months",
      breed: "Persian",
      personality: "Energetic and curious"
    }
  }
];

app.get('/api/projects', (req, res) => {
  res.json({
    statusCode: 200,
    data: cardList,
    message: "Success"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});