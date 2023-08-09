const { Joi, celebrate } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const urlRegex = /^(http[s]?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
