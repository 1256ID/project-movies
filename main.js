Vue.createApp({
    data() {
        return {
            search: "",
            movies: [],
            favorites: [],
            topMovies: [],
            searchResults: [],
            newMovie: { title: '', year: null },
            currentPage: 'topMovies',
            sortBy: "title",
            selectedGenre: "all",
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
        selectRandom(array) {
            return array[Math.floor(Math.random() * array.length)];
        },

        allMovies() {
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

            this.movies = allMovies;
        },

        addMoviePosters(movie) {
            const comedyImages = this.jsonData.comedyImages;
            const actionImages = this.jsonData.actionImages;
            const dramaImages = this.jsonData.dramaImages;
            const zombiesImages = this.jsonData.zombiesImages;
            const vampiresImages = this.jsonData.vampiresImages;
            const aliensImages = this.jsonData.aliensImages;
            const robotsImages = this.jsonData.robotsImages;
            let moviePoster;

            if (movie.genre === "Comedy") {
                moviePoster = this.selectRandom(comedyImages);
            }

            else if (movie.genre === "Action") {
                moviePoster = this.selectRandom(actionImages);
            }

            else if (movie.genre === "Drama" || movie.genre === "Romance") {
                moviePoster = this.selectRandom(dramaImages);
            }

            else if (movie.genre === "Zombies") {
                moviePoster = this.selectRandom(zombiesImages);
            }

            else if (movie.genre === "Vampires") {
                moviePoster = this.selectRandom(vampiresImages);
            }

            else if (movie.genre === "Aliens") {
                moviePoster = this.selectRandom(aliensImages);
            }

            else if (movie.genre === "Robots") {
                moviePoster = this.selectRandom(robotsImages);
            }

            movie.image = moviePoster;
            this.movies.push(movie);
        },

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
            this.currentPage = 'searchResults';
        },

        getTopMovies() {
            // Combines all genre arrays into one.
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

            // Sorts the highest rated movies.
            allMovies = allMovies.sort((a, b) => {
                if (a.rating > b.rating) {
                    return -1;
                }
            });

            for (let i = 0; i < allMovies.length; i++) {
                this.addMoviePosters(allMovies[i]);
            }

            this.topMovies = allMovies.slice(0, 10);
        },

        showTopMovies() {
            this.currentPage = 'topMovies';
        },

        addToFavorites(movie) {
            this.favorites.push(movie);
        },

        removeFromFavorites(index) {
            this.favorites.splice(index, 1);
        },

        showFavorites() {
            this.currentPage = 'favorites';
        },

        showMyMovies() {
            this.currentPage = 'myMovies';
        },


        addMovie() {

        },

        showAddMovies() {
            this.currentPage = 'addMovies';
        },

        showGenres() {
            this.currentPage = 'genres';
        },

        sortMovieResults() {
            //ChatGPT help
            if (this.sortBy === 'title') {
                return this.searchResults.sort((a, b) => a.title.localeCompare(b.title));
            }

            else if (this.sortBy === 'year') {
                return this.searchResults.sort((a, b) => b.year - a.year);
            }

            else if (this.sortBy === 'genre') {
                return this.searchResults.sort((a, b) => a.genre.localeCompare(b.genre));
            }

            else if (this.sortBy === 'ratingHigh') {
                return this.searchResults.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                });
            }

            else if (this.sortBy === 'ratingLow') {
                return this.searchResults.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return -1;
                    }
                });
            }

            else {
                return this.searchResults;
            }
        },

        sortAllMovies() {
            let sortedMovies = this.movies.slice();

            if (this.selectedGenre === "comedy") {
                sortedMovies = sortedMovies.filter(movie => movie.genre === "Comedy");
            }

            else if (this.selectedGenre === "drama") {
                sortedMovies = sortedMovies.filter(movie => movie.genre === "Drama");
            }

            else if (this.selectedGenre === "action") {
                sortedMovies = sortedMovies.filter(movie => movie.genre === "Action");
            }

            else if (this.selectedGenre === "horror") {
                return this.movies.filter(movie => movie.genre === "Aliens" || movie.genre === "Robots"
                    || movie.genre === "Zombies" || movie.genre === "Vampires");
            }

            if (this.sortBy === "title") {
                sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
            }

            else if (this.sortBy === "year") {
                sortedMovies.sort((a, b) => b.year - a.year);
            }

            else if (this.sortBy === "ratingHigh") {
                sortedMovies.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                });
            }

            else if (this.sortBy === "ratingLow") {
                sortedMovies.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return -1;
                    }
                });
            }

            return sortedMovies;

        }
    }
}).mount("#app");