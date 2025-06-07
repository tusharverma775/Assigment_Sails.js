

module.exports.routes = {
  
'GET /fetch-authors': 'AuthorController.fetchAndSave',
'GET /authors': 'AuthorController.search',

  '/': { view: 'pages/homepage' },


};
