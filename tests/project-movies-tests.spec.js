const { test, expect } = require('@playwright/test');

// test("keyword 'adventure' gives 8 titles"), async ({ page }) => {

//     const movies = ["Armored Avenger Alliance - 2017",
//         "Ghost Reconnaissance - 2007",
//         "Hardline Hitters - 2006",
//         "Mad Dog Militia - 2012",
//         "Metallic Mayhem - 2000",
//         "Shadow Strike Force - 2004",
//         "Vigilante Vengeance - 2004",
//         "Zombie Apocalypse Assault - 2004"]

//     const search = page.getByPlaceholder("Search for a movie");

//     await page.goto('http://127.0.0.1:5500/index.html');

//     await search.fill("adventure");
//     await search.press("Enter");

//     await expect(page.locator('#resultList li')).toHaveText(movies);
// }

