"use strict";

var resolve = require("json-refs").resolveRefs;
var YAML = require("js-yaml");
var fs = require("fs");

const SwaggerParser = require("swagger-parser");

function buildSwagger() {
  var root = YAML.safeLoad(
    fs.readFileSync("swagger/src/index.yaml", "utf8")
  );
  var options = {
    filter: ["relative", "remote"],
    loaderOptions: {
      processContent: function(res, callback) {
        callback(null, YAML.safeLoad(res.text));
      }
    }
  };

  resolve(root, options).then(function(results) {
    var swaggerGen = YAML.dump(results.resolved);

    try {
      fs.writeFileSync("./swagger/swagger.yaml", swaggerGen);
      SwaggerParser.validate("swagger/swagger.yaml")
        .then(function(api) {
          console.info(
            " %s, Version: %s -----> swagger yaml structure is fine ✔",
            api.info.title,
            api.info.version
          );
        })
        .catch(function(err) {
          console.error(err);
        });
    } catch (e) {
      if (e.code !== "EEXIST") {
        console.error("Could not create swagger.yaml file, error was: ", e);
        process.exit(1);
      }
    }
  });

  return;
}
buildSwagger();