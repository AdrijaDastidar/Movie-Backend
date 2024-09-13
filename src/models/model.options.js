// Removes id field when converted from json to js objects

const modelOptions = {
  toJSON: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  versionKey: false, // Version tracking disabled
  timestamps: true, // Include createdAt and updatedAt fields
};

export default modelOptions;
