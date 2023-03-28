const { test, expect } = require('@playwright/test');

test("keyword 'adventure' gives 8 titles", async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');

    const movies = [
        "Armored Avenger Alliance - 2017",
        "Ghost Reconnaissance - 2007",
        "Hardline Hitters - 2006",
        "Mad Dog Militia - 2012",
        "Metallic Mayhem - 2000",
        "Shadow Strike Force - 2004",
        "Vigilante Vengeance - 2004",
        "Zombie Apocalypse Assault - 2004"
    ];

    const search = page.locator('[placeholder="Search for a movie"]');
    await search.fill("adventure");
    await search.press("Enter");

    await expect(page.locator('#resultList li p')).toHaveText(movies);
});

test("keyword 'dark' and order by 'year'", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/index.html");

    const movies = [
        "The Dark Side of Ambition - 2018",
        "Darkness Eternal - 2011",
        "Vampire's Embrace - 2003"
    ];

    const search = page.locator("[placeholder='Search for a movie']");
    await search.fill("dark");
    await search.press("Enter");

    // const resultList = page.locator("#resultList li p");
    await page.locator("select.resultFilter").selectOption("year");
 
    const resultList = await page.locator("#resultList li p");
    await expect(resultList).toHaveText(movies);
});

test("add movie to 'Favorites'", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/index.html");

    const search = page.locator("[placeholder='Search for a movie']");
    await search.fill("crazy");
    await search.press("Enter");

    const resultList = page.locator("#resultList li p");
    await expect(resultList).toHaveText("The Crazy Cat Lady Chronicles - 2010");

    let addFav = page.locator("#addFav");
    await addFav.click();

    let favPage = page.locator("#myFavorites");
    await favPage.click();

    const favList = page.locator("#favoritesList li p");
    await expect(favList).toHaveText("The Crazy Cat Lady Chronicles - 2010");
});

