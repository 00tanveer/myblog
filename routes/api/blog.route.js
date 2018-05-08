var express = require('express');
var router = express.Router();
const jwt = require('express-jwt');
const jwtAuths = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
var BlogController = require('../../controllers/blog.controller');

const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://tansayshello.eu.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: `https://tansayshello.eu.auth0.com/api/v2/`,
    issuer: `https://tansayshello.eu.auth0.com/`,
    algorithms: ['RS256']
  });

router.get('/', BlogController.getBlogs);
router.post('/', checkJwt, BlogController.createBlog);
router.put('/', checkJwt, BlogController.updateBlog);
router.delete('/:id', BlogController.removeBlog);

module.exports = router;
