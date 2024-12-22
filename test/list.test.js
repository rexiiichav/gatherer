const list = require("../controllers/list");

test("adds 1 + 2", () => {
  expect(list.listChosenRecipes([])).toBe([]);
});
