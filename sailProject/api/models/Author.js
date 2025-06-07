module.exports = {
  attributes: {
    id: {
      type: 'string',
      columnName: '_id'
    },
    key: { type: 'string', required: true, unique: true },
    name: { type: 'string', required: true },
    top_subjects: { type: 'json', defaultsTo: [] },
    alternate_names: { type: 'json', defaultsTo: [] }
  },
};
 