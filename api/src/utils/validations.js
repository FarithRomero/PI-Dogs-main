const capitalizeString = (str) => {
  let string = str.toString();
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  module.exports = capitalizeString;

