const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to the database`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Insert a single recipe
    return Recipe.create({
      title: 'Cheesecake',
      level: 'Amateur Chef',
      ingredients: [
        '8 cups grated carrots',
        '10 cup brown sugar',
        '1 cup raisins',
        '3 eggs',
        '1 1/2 cups white sugar',
        '5 cup vegetable oil',
        '2 teaspoons vanilla extract',
        '1 cup crushed pineapple, drained',
        '3 cups all-purpose flour',
        '1 1/2 teaspoons baking soda',
        '1 teaspoon salt',
        '4 teaspoons ground cinnamon'
      ],
      cuisine: 'American',
      dishType: 'dessert',
      image: 'https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg',
      duration: 130,
      creator: 'Chef La Vane'
    });
  })
  .then(recipe => {
    console.log('The recipe is saved and its value is: ', recipe);
    // Insert many recipes
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    console.log('The recipes are saved and their values are: ', recipes);
    // Update a recipe
    return Recipe.findOneAndUpdate( { title: 'Rigatoni alla Genovese' },{ duration: 100 },{ new: true }
    );
  })
  .then(recipe => {
    console.log('The recipe has been updated:', recipe);
    // delete carrot cake recipe
    return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
  })
  .then(recipe => {
    console.log('The recipe has been deleted:', recipe);
    // close database
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Disconnected from the database');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
