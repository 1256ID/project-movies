Vue.createApp({
    data() {
        return {
            search: "",
            movies: [],
            topMovies:[],
            searchResults: [],
            jsonData: null
        };
    },
    created() {
        fetch('movieLibrary.json')
            .then(response => response.json())
            .then(json => {
                this.jsonData = json;
            });
    },
    methods: {
        topMovies() {
            
        },

        searchMovies() {

        }
    }
}).mount("#app");