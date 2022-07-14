const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose.connect(
    "mongodb+srv://Prathamesh:sonofsarika@cluster0.otw2b.mongodb.net/notebook?retryWrites=true&w=majority",
    () => console.log("connected to mongo successfully")
  );
};

module.exports = connectToMongo;
