const { boolean, date, array } = require("joi");
const mongoose = require("mongoose");
const { Uda, udaSchema } = require("./uda");

// Watcher schema
const watcherSchema = mongoose.Schema({
  watcherName: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: false,
  },
  object: {
    type: String,
    required: false,
  },
  udaList: [udaSchema],
  options: {},
});

const Watcher = mongoose.model("watcher", watcherSchema);

exports.Watcher = Watcher;
exports.watcherSchema = watcherSchema;
