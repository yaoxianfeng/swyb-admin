
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://139.196.148.44:8888/api/private/v1/"'
   //BASE_API: '"http://51wangshi.com:8085"'
})
