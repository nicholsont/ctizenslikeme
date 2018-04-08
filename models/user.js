'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName:  DataTypes.STRING,
    email:     DataTypes.STRING,
    year_born: DataTypes.INTEGER,
    ethnicity: DataTypes.ARRAY(DataTypes.TEXT),
    state:     DataTypes.STRING
  }, {});

  return User;
};
