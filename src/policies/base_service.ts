"use strict";
import log4js = require("log4js");
import _ = require("lodash");

export default class BaseService {
  protected log: log4js.Logger;
  protected _: _.LoDashStatic;
  constructor() {
    this._ = _;
    this.log = log4js.getLogger(this.constructor.name);
  }

}
