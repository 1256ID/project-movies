Vue.createApp({
    data() {
        return {
            search: "",
            movies: [],
            favorites: [],
            topMovies: [],
            searchResults: [],
            jsonData: null
        };
    },
    created() {
        fetch('movieLibrary.json')
            .then(response => response.json())
            .then(json => {
                this.jsonData = json;
                this.getTopMovies();
            });
    },
    methods: {
        searchMovies() {
            const allMovies = [
                ...this.jsonData.comedy,
                ...this.jsonData.action,
                ...this.jsonData.drama,
                ...this.jsonData.romance,
                ...this.jsonData.horror.robots,
                ...this.jsonData.horror.aliens,
                ...this.jsonData.horror.zombies,
                ...this.jsonData.horror.vampires
            ];

            let result =
                allMovies.filter(movie =>
                    movie.title.toLowerCase().includes(this.search.toLowerCase())
                    || movie.tags.some(tag => tag.toLowerCase().includes(this.search.toLowerCase()))
                    || movie.genre.toLowerCase().includes(this.search.toLowerCase()) || movie.year == this.search);

            this.searchResults = result;
        },

        // addMoviePosters() {

        //     let allMovies = [
        //         ...this.jsonData.comedy,
        //         ...this.jsonData.action,
        //         ...this.jsonData.drama,
        //         ...this.jsonData.romance,
        //         ...this.jsonData.horror.robots,
        //         ...this.jsonData.horror.aliens,
        //         ...this.jsonData.horror.zombies,
        //         ...this.jsonData.horror.vampires
        //     ];

        //     const comedyImages = this.jsonData.comedyImages;
        //     const actionImages = this.jsonData.actionImages;
        //     const dramaImages = this.jsonData.dramaImages;
        //     const zombiesImages = this.jsonData.zombiesImages;
        //     const vampiresImages = this.jsonData.vampiresImages;
        //     const aliensImages = this.jsonData.aliensImages;
        //     const robotsImages = this.jsonData.robotsImages;

        //     let moviePoster;

        //     for (let i = 0; i < allMovies.lenght; i++) {

        //         if (genre === "comedy") {
        //             moviePoster = this.selectRandom(comedyImages);
        //         }

        //         if (genre === "action") {
        //             moviePoster = this.selectRandom(actionImages);
        //         }

        //         if (genre === "drama") {
        //             moviePoster = this.selectRandom(dramaImages);
        //         }

        //         if (genre === "romance") {
        //             moviePoster = this.selectRandom(dramaImages);
        //         }

        //         if (genre === "Zombies") {
        //             moviePoster = this.selectRandom(zombiesImages);
        //         }

        //         if (genre === "Vampires") {
        //             moviePoster = this.selectRandom(vampiresImages);
        //         }

        //         if (genre === "Aliens") {
        //             moviePoster = this.selectRandom(aliensImages);
        //         }

        //         if (genre === "Robots") {
        //             moviePoster = this.selectRandom(robotsImages);
        //         }

        //         let poster = {
        //             image: moviePoster
        //         }
        //         movies.push(poster);
        //         topMovies.push(poster);
        //         searchResults.push(poster);
        //     }
        // },

        getTopMovies() {
            //Combines all genre arrays into one.
            let allMovies = [
                ...this.jsonData.comedy,
                ...this.jsonData.action,
                ...this.jsonData.drama,
                ...this.jsonData.romance,
                ...this.jsonData.horror.robots,
                ...this.jsonData.horror.aliens,
                ...this.jsonData.horror.zombies,
                ...this.jsonData.horror.vampires
            ];

            //Sorts the highest rated movies.
            allMovies = allMovies.sort((a, b) => {
                if (a.rating > b.rating) {
                    return -1;
                }
            });

            const comedyImages = this.jsonData.comedyImages;
            const actionImages = this.jsonData.actionImages;
            const dramaImages = this.jsonData.dramaImages;
            const zombiesImages = this.jsonData.zombiesImages;
            const vampiresImages = this.jsonData.vampiresImages;
            const aliensImages = this.jsonData.aliensImages;
            const robotsImages = this.jsonData.robotsImages;

            let moviePoster;

            for (let i = 0; i < 10; i++) {

                if (json.genre === "comedy") {
                    moviePoster = this.selectRandom(comedyImages);
                }

                if (genre === "action") {
                    moviePoster = this.selectRandom(actionImages);
                }

                if (genre === "drama") {
                    moviePoster = this.selectRandom(dramaImages);
                }

                if (genre === "romance") {
                    moviePoster = this.selectRandom(dramaImages);
                }

                if (genre === "Zombies") {
                    moviePoster = this.selectRandom(zombiesImages);
                }

                if (genre === "Vampires") {
                    moviePoster = this.selectRandom(vampiresImages);
                }

                if (genre === "Aliens") {
                    moviePoster = this.selectRandom(aliensImages);
                }

                if (genre === "Robots") {
                    moviePoster = this.selectRandom(robotsImages);
                }

                let poster = {
                    image: moviePoster
                }
                topMovies.push(poster);
            }

            this.topMovies = allMovies.slice(0, 10);
        },

        showTopMovies() {

            // Enable/Disable active/inactive divs

            document.querySelector("#topMovies").style.display = "block";
            document.querySelector("#favorites-list").style.display = "none";
            document.querySelector("#myMoviesPage").style.display = "none";
            document.querySelector("#addMoviePage").style.display = "none";

            // Enable/Disable buttons.

            document.getElementById("topMovies").disabled = "true";
            document.getElementById("myFavorites").disabled = "false";
            document.getElementById("myMovies").disabled = "false";
            document.getElementById("addMovie").disabled = "false";
        },

        addToFavorites(movie) {
            this.favorites.push(movie);
        },

        removeFromFavorites(index) {
            this.favorites.splice(index, 1);
        },

        showFavorites() {

            // Enable/Disable active/inactive divs

            document.querySelector("#topMovies").style.display = "none";
            document.querySelector("#favorites-list").style.display = "block";
            document.querySelector("#myMoviesPage").style.display = "none";
            document.querySelector("#addMoviePage").style.display = "none";

            // Enable/Disable buttons.

            document.getElementById("topMovies").disabled = "false";
            document.getElementById("myFavorites").disabled = "true";
            document.getElementById("myMovies").disabled = "false";
            document.getElementById("addMovie").disabled = "false";
        },

        showMyMovies() {

            // Enable/Disable active/inactive divs

            document.querySelector("#topMovies").style.display = "none";
            document.querySelector("#favorites-list").style.display = "none";
            document.querySelector("#myMoviesPage").style.display = "block";
            document.querySelector("#addMoviePage").style.display = "none";

            // Enable/Disable buttons.

            document.getElementById("topMovies").disabled = "false";
            document.getElementById("myFavorites").disabled = "false";
            document.getElementById("myMovies").disabled = "true";
            document.getElementById("addMovie").disabled = "false";

        },


        addMovie() {

        },

        showAddMovie() {

            // Enable/Disable active/inactive divs

            document.querySelector("#topMovies").style.display = "none";
            document.querySelector("#favorites-list").style.display = "none";
            document.querySelector("#myMoviesPage").style.display = "none";
            document.querySelector("#addMoviePage").style.display = "block";

            // Enable/Disable buttons.

            document.getElementById("topMovies").disabled = "false";
            document.getElementById("myFavorites").disabled = "false";
            document.getElementById("myMovies").disabled = "false";
            document.getElementById("addMovie").disabled = "true";

        }



    }
}).mount("#app");