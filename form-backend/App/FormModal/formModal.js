const { Schema, default: mongoose } = require("mongoose");

let formModals = new Schema({
    name: {
      type: String,
      required: true,
      match: /^[a-zA-Z\s]+$/ // Allows only alphabets and spaces for names
    },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    phone: {
      type: Number,
      required: true,
      match: /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
    },
    message: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9\s,.'-]{3,}$/,
    }
}, {timestamps: true});

const deleteFormSchema = new Schema({

  name: String,
  email: String,
  phone: String,
  message: String,
  deletedAt: { type: Date, default: Date.now }

})

let collectionForm = mongoose.model("formsData", formModals);
let deleteCollection = mongoose.model("DeleteData",deleteFormSchema)

module.exports = {collectionForm,deleteCollection};
