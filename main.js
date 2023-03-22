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

            this.topMovies = allMovies.slice(0, 10);
        },

        addToFavorites(movie) {
            this.favorites.push(movie);
        },

        removeFromFavorites(index) {
            this.favorites.splice(index, 1);
        },

        showFavorites() {
            let button = document.getElementById("myFavorites");
            let favPage = button.value === "My favorites";

            if (favPage) {
                document.querySelector("#topMovies").style.display = "none";
                document.querySelector("#favorites-list").style.display = "block";
                button.value = "Top Movies";
            }

            else {
                document.querySelector("#topMovies").style.display = "block";
                document.querySelector("#favorites-list").style.display = "none";
                button.value = "My favorites";
            }
        },

        searchMovies() {
        }
    }
}).mount("#app");