(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bookmark'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li>\n	<a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"link\" style=\"padding-left: ";
  if (stack1 = helpers.levelPadding) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.levelPadding; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "px;\">\n		<img width=\"16\" height=\"16\" src=\"chrome://favicon/";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n	</a>\n</li>\n\n";
  return buffer;
  });
templates['folder'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li>\n	<div class=\"folder closed\" id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-level=\"";
  if (stack1 = helpers.level) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.level; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-parent=";
  if (stack1 = helpers.parentId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.parentId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " style=\"padding-left: ";
  if (stack1 = helpers.levelPadding) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.levelPadding; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "px;\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n</li>";
  return buffer;
  });
})();