Vue.createApp({
    data() {
        return {
            currentPage: 'topMovies',   
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
        selectRandom(array) {
            return array[Math.floor(Math.random() * array.length)];
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

            let moviePoster;

            const comedyImages = this.jsonData.comedyImages;
            const actionImages = this.jsonData.actionImages;
            const dramaImages = this.jsonData.dramaImages;
            const zombiesImages = this.jsonData.zombiesImages;
            const vampiresImages = this.jsonData.vampiresImages;
            const aliensImages = this.jsonData.aliensImages;
            const robotsImages = this.jsonData.robotsImages;

            for (let i = 0; i < allMovies.length; i++) {

                if (allMovies[i].genre === "Comedy") {
                    moviePoster = this.selectRandom(comedyImages);
                }

                if (allMovies[i].genre === "Action") {
                    moviePoster = this.selectRandom(actionImages);
                }

                if (allMovies[i].genre === "Drama") {
                    moviePoster = this.selectRandom(dramaImages);
                }

                if (allMovies[i].genre === "Romance") {
                    moviePoster = this.selectRandom(dramaImages);
                }

                if (allMovies[i].genre === "Zombies") {
                    moviePoster = this.selectRandom(zombiesImages);
                }

                if (allMovies[i].genre === "Vampires") {
                    moviePoster = this.selectRandom(vampiresImages);
                }

                if (allMovies[i].genre === "Aliens") {
                    moviePoster = this.selectRandom(aliensImages);
                }

                if (allMovies[i].genre === "Robots") {
                    moviePoster = this.selectRandom(robotsImages);
                }

                allMovies[i].image = moviePoster;

                this.topMovies.push(allMovies[i]);
            }


            this.topMovies = allMovies.slice(0, 10);
        },

        showTopMovies() {

           
            
            /*

            // Enable/Disable active/inactive divs

            document.querySelector("#topMovies").style.display = "block";
            document.querySelector("#favorites-list").style.display = "none";
            document.querySelector("#myMoviesPage").style.display = "none";
            document.querySelector("#addMoviePage").style.display = "none";

            // Enable/Disable buttons.

            document.getElementById("topMovies").disabled = "true";
            document.getElementById("myFavorites").enabled = "true";
            document.getElementById("myMovies").enabled = "true";
            document.getElementById("addMovie").enabled = "true";
            */
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
                
            document.getElementById("topMovies").enabled = "true";
            document.getElementById("myFavorites").disabled = "true";
            document.getElementById("myMovies").enabled = "true";
            document.getElementById("addMovie").enabled = "true";
        },

        showMyMovies() {

            // Enable/Disable active/inactive divs

            document.querySelector("#topMovies").style.display = "none";
            document.querySelector("#favorites-list").style.display = "none";
            document.querySelector("#myMoviesPage").style.display = "block";
            document.querySelector("#addMoviePage").style.display = "none";

           // Enable/Disable buttons.
               
           document.getElementById("topMovies").enabled = "true";
           document.getElementById("myFavorites").enabled = "true";
           document.getElementById("myMovies").disabled = "true";
           document.getElementById("addMovie").enabled = "true";

        },


        addMovie() {

        },

        showAddMovie() {

          

            /*
            // Enable/Disable active/inactive divs

            document.querySelector("#topMovies").style.display = "none";
            document.querySelector("#favorites-list").style.display = "none";
            document.querySelector("#myMoviesPage").style.display = "none";
            document.querySelector("#addMoviePage").style.display = "block";


           // Enable/Disable buttons.
               
           document.getElementById("topMovies").enabled = "true";
           document.getElementById("myFavorites").enabled = "true";
           document.getElementById("myMovies").enabled = "true";
           document.getElementById("addMovie").disabled = "true";
            */
        }



    }
}).mount("#app");