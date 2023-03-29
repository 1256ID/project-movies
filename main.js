Vue.createApp({
    data() {
        return {
            search: "",
            active: false,
            movies: [],
            favorites: [],
            topMovies: [],
            myMovies: [],
            searchResults: [],

            title: "",
            genre: "",
            year: '',
            rating: "",
            tag1: "",
            tag2: "",
            tag3: "",

            userHasSubmited: false,
            confirmationText: "",
            currentPage: 'topMovies',
            sortBy: "title",
            selectedGenre: "all",
            choosenGenre: "comedy",
            heading: '',
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

    
    computed : {
        years () {
          const year = new Date().getFullYear()
          return Array.from({length: year - 1900}, (value, index) => 1901 + index)
        },
        
        ratingList () {     
            return Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (x) => x)
        },

        
    },

    methods: {
        selectRandom(array) {
            return array[Math.floor(Math.random() * array.length)];
        },
        //Adds all movies from the json-file to movies:[]
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
        //Adds random images to the movies according to their genre
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


        //Searches "movies:[]" based on user input "search:[]"
        searchMovies() {
            let result =
                this.movies.filter(movie =>
                    movie.title.toLowerCase().includes(this.search.toLowerCase())
                    || movie.tags.some(tag => tag.toLowerCase().includes(this.search.toLowerCase()))
                    || movie.genre.toLowerCase().includes(this.search.toLowerCase()) || movie.year == this.search);

            this.searchResults = result;
            this.currentPage = 'searchResults';
        },


        //Get all movies and returns 10 with the highest rating
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
            this.selectedGenre = 'all';
            this.userHasSubmited = false;
        },

        addToFavorites(movie) {
            this.favorites.push(movie);
            this.selectedGenre = 'all';
        },

        removeFromFavorites(index) {
            this.favorites.splice(index, 1);
        },

        showMyFavorites() {
            this.currentPage = 'myfavorites';
            this.selectedGenre = 'all';
            this.userHasSubmited = false;
        },

        showMyMovies() {
            this.currentPage = 'myMovies';
            this.selectedGenre = 'all';
            this.userHasSubmited = false;
        },

        showAddMovies() {

            if (this.confirmationText !== "The form was incomplete, please try again") 
            {
                this.title = "",
                this.genre = "",
                this.year = '',
                this.rating = "",
                this.tag1 = "",
                this.tag2 = "",
                this.tag3 = ""
            }
  
            this.currentPage = 'addMovies';
            this.selectedGenre = 'all';
            this.userHasSubmited = false;
        },

        addMovie() {

            if (this.title === ""|| this.genre === "" || this.year === '' 
            || this.rating === "" || this.tag1 === "" || this.tag2 === ""
            || this.tag3 === "") 
            {
                this.confirmationText = "The form was incomplete, please try again";
            }

            else 
            {
                this.myMovies.push({
                    title: this.title,
                    genre: this.genre,
                    year: this.year,
                    rating: this.rating,
                    tags: [
                        this.tag1,
                        this.tag2,
                        this.tag3
                    ]           
                });
                
                this.confirmationText = "The movie" + " " + this.title + " " + "has now been added to My Movies";
            }

            this.userHasSubmited = true;
            this.selectedGenre = 'all';
        },

        removeFromMyMovies(index) {
            this.myMovies.splice(index, 1);
        },

      
        toggleCategories () {
            this.active = !this.active
        },  

        showGenre(genre) {

            this.currentPage = 'genres';
            this.selectedGenre = genre;
            this.userHasSubmited = false;

            if (genre === 'comedy') {
                this.heading = 'Comedy Movies';
                this.selectedGenre = genre;
            }

            else if (genre === 'drama') {
                this.heading = 'Drama Movies';
                this.selectedGenre = genre;
            }

            else if (genre === 'action') {
                this.heading = 'Action Movies';
                this.selectedGenre = genre;
            }

            else if (genre === 'horror') {
                this.heading = 'Horror Movies';
                this.selectedGenre = genre;
            } 
           
        },

        //Sorts movies based on options that the user selects
        sortMovieResults() {
            let sortedMovies = this.searchResults.slice();

            if (this.sortBy === 'title') {
                sortedMovies = sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
            }

            else if (this.sortBy === 'year') {
                sortedMovies = sortedMovies.sort((a, b) => b.year - a.year);
            }

            else if (this.sortBy === 'genre') {
                sortedMovies = sortedMovies.sort((a, b) => a.genre.localeCompare(b.genre));
            }

            else if (this.sortBy === 'ratingHigh') {
                sortedMovies = sortedMovies.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                });
            }

            else if (this.sortBy === 'ratingLow') {
                sortedMovies = sortedMovies.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return -1;
                    }
                });
            }

            return sortedMovies;
        },

        //Sorts movies based on options that the user selects
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
                sortedMovies = sortedMovies.filter(movie => movie.genre === "Aliens" || movie.genre === "Robots"
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