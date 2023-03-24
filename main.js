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
            disabledButton: 'topMoviesButton',
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

            else if (movie.genre === "Drama"|| movie.genre === "Romance") {
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
            this.disabledButton = 'topMoviesButton';
        },

        addToFavorites(movie) {
            this.favorites.push(movie);
        },

        removeFromFavorites(index) {
            this.favorites.splice(index, 1);
        },

        showFavorites() {

            this.currentPage = 'favorites';
            this.disabledButton = 'favoritesButton';

            /*
            // Enable/Disable active/inactive divs

            document.querySelector("#topMovies").style.display = "none";
            document.querySelector("#favorites").style.display = "block";
            document.querySelector("#myMoviesPage").style.display = "none";
            document.querySelector("#addMoviePage").style.display = "none";

            // Enable/Disable buttons.

            document.getElementById("topMovies").enabled = "true";
            document.getElementById("myFavorites").disabled = "true";
            document.getElementById("myMovies").enabled = "true";
            document.getElementById("addMovie").enabled = "true";
            */
        },

        showMyMovies() {
            this.currentPage = 'myMovies';
            this.disabledButton = 'myMoviesButton';
        },


        addMovie() {
           
        },

        showAddMovies() {
            this.currentPage = 'addMovies';
            this.disabledButton = 'addMoviesButton';
        },



    }
}).mount("#app");