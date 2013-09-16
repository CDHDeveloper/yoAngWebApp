/*
* Module dependencies
*/

var i18n = require('i18next')

module.exports = function(app, config){

//Localization Config
i18n.init({
  ns: config.i18n.ns,
  lng: config.i18n.lng,
  detectLngQS: config.i18n.detectLngQS,
  cookieName: config.i18n.cookieName,
  supportedLngs: config.i18n.supportedLngs,
  fallbackLng: config.i18n.fallbackLng,
  preload: config.i18n.preload,
  load: config.i18n.load,
  sendMissing: config.i18n.sendMissing,
  resGetPath: config.i18n.resGetPath,
  ignoreRoutes: config.i18n.ignoreRoutes,
  debug: config.i18n.debug
})

//Client API
i18n.serveClientScript(app)
  .serveDynamicResources(app)
  .serveMissingKeyRoute(app)
  .serveChangeKeyRoute(app)
  .serveRemoveKeyRoute(app)

//Helper
app.locals.t = i18n.t

}