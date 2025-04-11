import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const User = sequelize.define('User', {
  User_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  date_of_birth: { type: DataTypes.DATE, allowNull: false },
  contact: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 9999999999 },
  alternate_contact: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 9999999999 },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  
  },
  password: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  pincode: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 999999 },
  state: { type: DataTypes.STRING, allowNull: false, defaultValue: "Unknown" },
  termsAccepted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  refresh_token: { type: DataTypes.TEXT, allowNull: true },

});




// import { DataTypes } from 'sequelize';
// import { sequelize } from '../config/db.js';

// export const User = sequelize.define('User', {
//   User_id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   first_name: { type: DataTypes.STRING, allowNull: false },
//   last_name: { type: DataTypes.STRING, allowNull: false },
//   date_of_birth: { type: DataTypes.DATEONLY, allowNull: false },
//   contact: {
//     type: DataTypes.STRING(10),
//     allowNull: false,
//     validate: {
//       is: /^[0-9]{10}$/,
//     },
//   },
//   alternate_contact: {
//     type: DataTypes.STRING(10),
//     allowNull: false,
//     validate: {
//       is: /^[0-9]{10}$/,
//     },
//   },
//   address: { type: DataTypes.STRING, allowNull: false },
//   pincode: {
//     type: DataTypes.STRING(6),
//     allowNull: false,
//     validate: {
//       is: /^[0-9]{6}$/,
//     },
//   },
//   state: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Unknown' },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: true,
//     },
//   },
//   mpi: {
//     type: DataTypes.STRING(4),
//     allowNull: false,
//     validate: {
//       is: /^[0-9]{4}$/,
//     },
//   },
//   gstNO: {
//     type: DataTypes.STRING(15),
//     allowNull: true,
//   },
//   termsAccepted: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   },
//   refresh_token: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
// });

