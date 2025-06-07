const axios = require('axios');
const sails = require('sails')




module.exports = {
fetchAndSave: async function (req, res) {
    const Author = sails.models.author;
  try {
    const response = await axios.get('https://openlibrary.org/search/authors.json?q=twain');
    const authors = response.data.docs;

    const formattedAuthors = authors.map(author => ({
      key: author.key,
      name: author.name,
      top_subjects: author.top_subjects || [],
      alternate_names: author.alternate_names || [],
    }));

    // Upsert logic
    // for (const item of formattedAuthors) {
    //   let existing = await Author.find({ key: item.key });
    //   if (!existing) {
    //     await Author.create(item);
    //   }
    // }

    for (const item of formattedAuthors) {
  let existing = await Author.findOne({ key: item.key });
  if (!existing) {
    await Author.create(item);
  }
}

    return res.ok({ message: 'Authors saved successfully', count: formattedAuthors.length });
  } catch (err) {
    return res.serverError({ error: err.message });
  }
},


  search: async function (req, res) {
    const Author = sails.models.author;

    const nameQuery = req.query.name;
    if (!nameQuery) {
      return res.badRequest({ error: 'Missing "name" query parameter' });
    }

    try {
      const authors = await Author.find({
        where: { name: { contains: nameQuery } },
      });




      const result = authors.map(a => ({
        name: a.name,
        subjects: a.top_subjects || []
      }));

      return res.ok(result);
    } catch (err) {
      return res.serverError({ error: err.message });
    }
  }
};
