<template>
    <div class="container">
        <h1 class="text-center py-4">Repo finder</h1>

        <div class="input-group mb-2">
            <input class="form-control" v-model="query" type="text">
            <button class="btn btn-danger" type="button" @click="fetchData">Szukaj</button>
        </div>

        <b-table hover :items="items" :current-page="currentPage" :per-page="10"></b-table>
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="itemList"
            align="center">
        </b-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query: null,
            items: [],
            currentPage: null,
            rows: null,
            totalPages: null,
            perPage: 10
        }
    },
    methods: {
        fetchData() {
            this.axios({
                method: 'POST',
                url: '/search',
                header: {
                    'Access-Control-Allow-Origin': '*',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                data: {
                    q: this.query
                }
            })
                .then(response => {
                    this.items = response.data.data
                    this.currentPage = 1
                    this.rows = this.items.length
                    this.totalPages = this.rows / this.perPage
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>

<style scoped>
button {
    border-radius: 10px;
    display: inline-block;
}
</style>
