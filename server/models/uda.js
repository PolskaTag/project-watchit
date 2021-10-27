const { boolean, date, array } = require("joi");
const mongoose = require("mongoose");

// Uda (User defined Action) schema
const udaSchema = mongoose.Schema({
  /**
   * Action: send a picture
   * What picture
   * Where are we sending it to
   * Where are we sending it from
   * When are we sending it
   *
   * Action: turn a light on
   * What light are we turning on
   * Api call to make?
   *
   * Action: Playing a sound
   * What device are we playing a sound on
   * What sound are we playing
   * How many times are we playing the sound
   * How loud are we playing the sound
   *
   * Action: sending a video
   * What video are we sending
   * Where are we sending the video
   * Where are we sending it from
   */

  udaName: {
    type: String,
    required: true,
  },
  script: {
    type: String,
    required: true,
  },
  params: {
    type: Array,
    required: true,
  },
});

const Uda = mongoose.model("uda", udaSchema);

exports.Uda = Uda;
exports.udaSchema = udaSchema;