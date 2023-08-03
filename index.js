const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";
//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    const cookie = {
      title: "Chocolate chip cookie",
      level: "Easy Peasy",
      ingredients: [
        "Butter",
        "Sugar",
        "Vanilla Extract",
        "Flour",
        "Eggs",
        "Chocolate Chips",
      ],
      cuisine: "American",
      dishType: "dessert",
      image:
        "https://www.ihearteating.com/wp-content/uploads/2016/08/Easiest-Chocolate-Chip-Cookies-800-2.jpg",
      duration: 18,
      creator: "Kate Bush",
    };
    let newRecipe = await Recipe.create(cookie);
    // console.log(newRecipe.title)

    let insertedRecipes = await Recipe.insertMany(data);

    let newRigatoni = await Recipe.findOneAndUpdate(
      { duration: 220 },
      { duration: 100 }
    );

    let deleteCake = await Recipe.deleteOne({ title: "Carrot Cake" });

    let databaseClose = await mongoose.connection.close(MONGODB_URI);
    console.log("Closed Database");

    // Run your code here, after you have insured that the connection was made
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
