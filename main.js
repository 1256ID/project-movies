Vue.createApp({
    data() {
        return {
            search: "",
            movies: [],
            searchResults: []
        };
    },
    methods: {
        movieLibrary() {
            const movieGenreArrays = {
                comedy: [
                    "Laugh Out Loud Landlord",
                    "The Awkward Family Trip",
                    "Clumsy Cupid Chronicles",
                    "Overly Ambitious Office Party",
                    "The Crazy Cat Lady Chronicles",
                    "The Hapless Housekeeper",
                    "The Bumbling Burglars",
                    "The Inept Inventors",
                    "The Dorky Detectives",
                    "The Accidental Arsonists",
                    "The Silly Spies",
                    "The Absent-Minded Accountant",
                    "The Quirky Quizmasters",
                    "The Fumbling Firefighters",
                    "The Goofy Ghost Hunters",
                    "The Zany Zookeepers",
                    "The Slapstick Salesmen",
                    "The Wacky Wedding Planners",
                    "The Awkward Acquaintances",
                    "The Comical Con Artists",
                    "The Lovable Losers",
                    "The Eccentric Entrepreneurs",
                    "The Offbeat Olympians",
                    "The Hilarious Housewives",
                    "The Dumbfounded Diners",
                    "The Nutty News Anchors",
                    "The Cheesy Chefs",
                    "The Bizarre Babysitters",
                    "The Clueless Carpenters",
                    "The Amusing Astronauts",
                    "The Witty Waitstaff",
                    "The Ditsy Divas",
                    "The Comical Construction Crew",
                    "The Kooky Kitchen Crew",
                    "The Silly Scientists",
                    "The Hilarious Hairdressers",
                    "The Quirky Quarterbacks",
                    "The Nonsensical Nannies",
                    "The Whimsical Weathermen",
                    "The Jocular Journalists",
                    "The Improbable Impostors",
                    "The Hysterical House Hunters",
                    "The Comical Counselors",
                    "The Eccentric Electricians",
                    "The Zany Zookeepers",
                    "The Madcap Magicians",
                    "The Wacky Wildlife Photographers",
                    "The Foolish Flight Attendants",
                    "The Dopey Deliverymen",
                    "The Goofy Gymnasts",
                ],

                action: [
                    "Code of Vengeance",
                    "Thunderbolt Protocol",
                    "Renegade Justice",
                    "Bloodline of Honor",
                    "Rampage Hunter",
                    "Shadow Sentinel",
                    "Bulletstorm Battalion",
                    "Warzone Wraith",
                    "Midnight Runners",
                    "Mercenary Outlaws",
                    "Vigilante Vengeance",
                    "Fury Road Warriors",
                    "Savage Siege",
                    "Dragonfire Decimation",
                    "Street Justice Syndicate",
                    "Gunfighter's Gamble",
                    "Exiled Assassins",
                    "Dead Man's Hand",
                    "Blackout Brigade",
                    "Cyclone Commandos",
                    "Desert Scorpions",
                    "Hellfire Heroes",
                    "Ironclad Infidels",
                    "Jungle Raiders",
                    "Killer Instincts",
                    "Lone Wolf Legacy",
                    "Mad Dog Militia",
                    "Neon Nightfall",
                    "Omega Squadrons",
                    "Phoenix Rising",
                    "Quick Draw Justice",
                    "Razor's Edge Retribution",
                    "Shadow Strike Force",
                    "Tactical Takedown",
                    "Urban Warriors",
                    "Viper Venom",
                    "Wasteland Warriors",
                    "Xenon X-treme",
                    "Yellow Jacket Yakuza",
                    "Zombie Apocalypse Assault",
                    "Armored Avenger Alliance",
                    "Bulletproof Battalion",
                    "Cipher Strike",
                    "Death Dealer Diversion",
                    "Elite Executioners",
                    "Final Hour Fighters",
                    "Ghost Reconnaissance",
                    "Hardline Hitters",
                    "Iron Will Warriors",
                    "Judgment Day Justice"
                ],

                romance: [
                    "Love in Paris",
                    "The Beach House",
                    "A Summer Romance",
                    "The Proposal",
                    "Heart of Gold",
                    "The Perfect Match",
                    "Love in the City",
                    "A Starry Night",
                    "The Love Letter",
                    "The Sunset Kiss",
                    "Under the Moonlight",
                    "The Wedding Planner",
                    "The Romantic Getaway",
                    "The Last First Kiss",
                    "Eternal Love",
                    "The Lake House",
                    "A Walk to Remember",
                    "The Perfect Date",
                    "The Enchanted Garden",
                    "The Secret Admirer",
                    "The Love Boat",
                    "The Romantic Road Trip",
                    "The Forever Love",
                    "The Love Connection",
                    "The Lost Love",
                    "The Valentine's Day Date",
                    "The Candlelit Dinner",
                    "The Love Song",
                    "The Soul Mate",
                    "The Love Story",
                    "The Love Affair",
                    "The Sweetheart Serenade",
                    "The Honeymooners",
                    "The Lovebirds",
                    "The Love Potion",
                    "The Heart's Desire",
                    "The Lover's Lane",
                    "The Romantic Comedy",
                    "The Love Triangle",
                    "The Amorous Adventure",
                    "The Romantic Reunion",
                    "The Wedding Singer",
                    "The Kiss of Love",
                    "The Endless Love",
                    "The Love in Bloom",
                    "The Perfect Proposal",
                    "The Heart's Journey",
                    "The Charming Matchmaker",
                    "The Cupid's Arrow",
                    "The Love in the Air",
                ],

                drama: [
                    "The Family Secret",
                    "Broken Dreams",
                    "The Betrayal",
                    "Unbroken Resolve",
                    "The Price of Redemption",
                    "The Inheritance",
                    "The Unforgiven",
                    "The Lost Heir",
                    "The Wounded Heart",
                    "The Promise",
                    "The Sacrifice",
                    "The Unspoken Truth",
                    "The Reckoning",
                    "The Redemption Road",
                    "The Legacy",
                    "The Hard Truth",
                    "The Long Road Home",
                    "The Hidden Agenda",
                    "The Bittersweet Goodbye",
                    "The Unfinished Business",
                    "The Silent Tears",
                    "The Temptation",
                    "The Burden of Guilt",
                    "The Forgotten Promise",
                    "The Heart of Betrayal",
                    "The Broken Bond",
                    "The Weight of Regret",
                    "The Cost of Justice",
                    "The Unforgotten Memories",
                    "The Lost Hope",
                    "The Endless Battle",
                    "The Path of Forgiveness",
                    "The Untold Story",
                    "The Broken Trust",
                    "The Shadow of Doubt",
                    "The End of Innocence",
                    "The Crossroads of Life",
                    "The Heartbreakers",
                    "The Struggle Within",
                    "The Shattered Dreams",
                    "The Undeniable Truth",
                    "The Life Changing Moment",
                    "The Cost of Love",
                    "The Unspoken Pain",
                    "The Tragic Destiny",
                    "The Unfulfilled Promises",
                    "The Dark Side of Ambition",
                    "The Broken Silence",
                    "The Past that Haunts",
                    "The Ultimate Sacrifice"
                ],

                horror: {
                    zombies: [
                        "Rise of the Undead Hordes",
                        "Night of the Living Dread",
                        "Corpse Carnage",
                        "The Last Stand of the Flesh Eaters",
                        "Zombie Apocalypse: Endgame",
                        "Graveyard Shift: Beyond the Grave",
                        "Flesh and Bone: A Zombie Love Story",
                        "Brain Dead: The Reckoning",
                        "Undead Uprising",
                        "The Walking Horde"
                    ],

                    vampires: [
                        "Bloodlust: Rise of the Vampires",
                        "Eternal Night: The Vampire Chronicles",
                        "The Fangs of Fate",
                        "Undead Love",
                        "Midnight's Kiss",
                        "Blood Moon: The Reckoning",
                        "Immortal Hunger",
                        "Darkness Eternal",
                        "The Thirst Within",
                        "Vampire's Embrace"
                    ],

                    robots: [
                        "The Rise of the Machines",
                        "Cybernetic Rebellion",
                        "The Metal Menace",
                        "Rust and Ruin",
                        "Artificial Intelligence: The Endgame",
                        "The Mechanized Apocalypse",
                        "Digital Domination",
                        "Robot Rampage",
                        "Metallic Mayhem",
                        "The Circuit Breaker"
                    ],

                    werewolf: [
                        "The Curse of the Full Moon",
                        "Lunar Howl",
                        "Savage Fury",
                        "Wolf's Bane",
                        "The Beast Within",
                        "Full Moon Fever",
                        "The Hunted",
                        "Wild Instincts",
                        "Moonlit Terror",
                        "The Last Werewolf"
                    ],

                    aliens: [
                        "Invasion Earth",
                        "Alien Abduction",
                        "Beyond the Stars",
                        "The Extraterrestrial Threat",
                        "Cosmic Menace",
                        "The Invasion Begins",
                        "Alien Encounter",
                        "Exoplanetary Terror",
                        "War of the Worlds",
                        "The Alien Menace"
                    ]
                }
            }

            //Osäker på om det här funkar                  //matchar varje bokstav i sökordet
            const regexPattern = new RegExp(this.search.split("").join(".*?"), "i");

            for (let i = 0; i < movieLibrary.length; i++) {
                const movie = movieLibrary[i];

                if (regexPattern.test(movie.title)) {
                    searchResults.push(movie);
                };
            };

            this.movies = movies;
        },

        searchMovies() {
            const regexPattern = new RegExp(this.search.split("").join("?.*"), "i");
            this.searchResults = [];

            if (this.search === "") {
                return;
            }

            for (let i = 0; i < movieLibrary.length; i++) {
                const movie = movieLibrary[i];

                if (regexPattern.test(movie.title)) {
                    this.searchResults.push(movie);
                }
            }
        }
    }
}).mount("#app");