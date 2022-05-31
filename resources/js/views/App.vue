<template>
    <div class="container">
        <h1 class="text-center py-4">Repo finder</h1>

        <div class="input-group mb-2">
            <b-form-input
                v-model="query"
                :state="queryState"
                aria-describedby="input-live-feedback"
                debounce="1000"/>

            <b-button
                id="search"
                variant="danger"
                @click="fetchData"
                :disabled="isLoading || !queryState"
                v-text="text.searchBtn"/>

            <b-form-invalid-feedback
                id="input-live-feedback"
                v-text="text.notValidate"/>
        </div>

        <b-table
            id="results"
            hover
            :items="items"
            class="text-center"
            show-empty
            hidden>
            <template v-slot:empty="scope">
                <p>{{ text.emptyTable }}</p>
            </template>
        </b-table>

        <b-pagination
            v-model="page"
            :total-rows="rows"
            :per-page="size"
            align="center"
            id="pagination"
            hidden/>

        <b-overlay
            :show="isLoading"
            no-wrap/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            size: 10,
            page: 1,
            items: [],
            isLoading: false,
            rows: 0,
            text: {
                searchBtn: 'Szukaj',
                emptyTable: 'Brak wyników',
                errorFetch: 'Błąd pobierania danych. Spróbuj ponownie',
                notValidate: 'Wpisz co najmniej 3 znaki',
                refreshBtn: 'Odśwież',
                cancelBtn: 'Anuluj'
            }
        };
    },
    computed: {
        queryState() {
            return this.query.length > 2;
        }
    },
    watch: {
        page: function () {
            this.fetchData();
        },
        query: function () {
            this.fetchData();
        }
    },
    methods: {
        fetchData() {
            if (!this.isLoading && this.queryState) {
                this.isLoading = true;
                this.axios({
                    method: 'POST',
                    url: '/api/search',
                    header: {
                        'Access-Control-Allow-Origin': '*',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    data: {
                        q: this.query,
                        size: this.size,
                        page: this.page
                    }
                }).then(response => {
                    if (response.data.success) {
                        this.rows = response.data.data.total;
                        let packages = [];
                        response.data.data.results.map(function (item) {
                            packages.push({
                                nazwa: item.package.name,
                                repozytorium: item.package.links.repository
                            });
                        });
                        this.items = packages;
                        document.getElementById('pagination').removeAttribute('hidden');
                        document.getElementById('results').removeAttribute('hidden');
                        this.rows === 0 ? document.getElementById('pagination').setAttribute('hidden', 'true') : void 0;
                        this.isLoading = false;
                    } else {
                        this.isLoading = false;
                        const h = this.$createElement;
                        const element = h('div', [
                            h('strong', this.text.errorFetch),
                            h('br'),
                            h('i', response.data.error.message)
                        ]);
                        this.$bvModal.msgBoxConfirm(element, {
                            title: 'BŁĄD ' + response.data.error.code,
                            okVariant: 'primary',
                            okTitle: this.text.refreshBtn,
                            cancelVariant: 'danger',
                            cancelTitle: this.text.cancelBtn,
                            centered: true
                        }).then(value => {
                            value ? this.fetchData() : void 0;
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    const h = this.$createElement;
                    const element = h('div', [
                        h('strong', this.text.errorFetch),
                        h('br'),
                        h('i', error)
                    ]);
                    this.$bvModal.msgBoxConfirm(element, {
                        title: 'BŁĄD ' + error.message,
                        okVariant: 'primary',
                        okTitle: this.text.refreshBtn,
                        cancelVariant: 'danger',
                        cancelTitle: this.text.cancelBtn,
                        centered: true
                    }).then(value => {
                        value ? this.fetchData() : void 0;
                    });
                    this.isLoading = false;
                });
            }
        }
    }
}
</script>

<style>
#search {
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
}

#search:focus:not(:focus-visible) {
    outline: 0;
    box-shadow: none;
}

#pagination > li.active > button {
    background-color: #DC3545;
    border-color: #DC3545;
    color: #FFFFFF;
}

#pagination > li > button {
    color: #000000;
}
</style>
