export const getVegansBook = async (str) => {
  const result = await fetch(`https://gp-js-test.herokuapp.com/pizza/world-diets-book/${str}`);
  return result.json();
};
