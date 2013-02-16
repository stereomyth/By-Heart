(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bookmark'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"folder unloaded\" id=\"774\" data-level=\"1\" data-parent=\"4\" style=\"padding-left: 15px;\">Apps</div>";
  });
templates['folder'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"folder closed\" id=\"4\" data-level=\"0\" data-parent=\"1\" style=\"padding-left: 0px;\">Design</div>";
  });
})();