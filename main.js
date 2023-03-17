Vue.createApp({
    data() {
        return {
            search: "",
            movies: [],
            searchResults: [],
            jsonData: null
        };
    },
    created() {
        fetch('.json')
            .then(response => response.json())
            .then(json => {
                this.jsonData = json;
            });
    },
    methods: {
        movieLibrary() {

            // const regexPattern = new RegExp(this.search.split("").join(".*?"), "i");
            // this.searchResults = [];

            // if (this.search === "") {
            //     return;
            // }

            // for (let i = 0; i < movieGenreArrays.length; i++) {
            //     const movie = movieGenreArrays[i];

            //     if (regexPattern.test(movie)) {
            //         this.searchResults.push(movie);
            //     }
            // }

        }
    }
}).mount("#app");