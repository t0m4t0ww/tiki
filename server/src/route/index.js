const websiteRoutes = require('./WebsiteRoutes');

function route(app) {
    app.get('/api/data', websiteRoutes);
    app.get('/api/getproduct', websiteRoutes);
    app.get('/api/search', websiteRoutes);
    app.post('/api/addproduct', websiteRoutes);
    app.post('/api/deleteproduct', websiteRoutes);
}

module.exports = route;
