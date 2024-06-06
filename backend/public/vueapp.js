Vue.createApp({
    data: function () {
        return {
            headerString: "Grive",
            fileNames: [],
            audioFiles: [],
        };
    },
    methods: {
        handleSubmit: function(event) {
            const form = event.currentTarget;
            const url = new URL(form.action);
            const formData = new FormData(form);
            const searchParams = new URLSearchParams(formData);

            const fetchOptions = {
                method: form.method,
            };

            if (form.method.toLowerCase() === 'post') {
                if (form.enctype === 'multipart/form-data') {
                    fetchOptions.body = formData;
                } else {
                    fetchOptions.body = searchParams;
                }
            } else {
                url.search = searchParams;
            }

            fetch(url, fetchOptions).then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    this.getFileNames()
                }
            })
            event.preventDefault();
        },
        getFileNames: function () {
            fetch("/uploads").then((response) => {
                if (response.status === 200) {
                    response.json().then((files_from_server) => {
                        // console.log(files_from_server);
                        this.fileNames = files_from_server;
                        this.sortFiles();
                        console.log("audiofiles:", this.audioFiles);
                    })
                }
            })
        },
        sortFiles: function () {
            this.audioFiles = [];
            for (let audioFile of this.fileNames) {
                if (audioFile.endsWith("mp4") || audioFile.endsWith("mp3")) {
                    this.audioFiles.push(audioFile);
                }
            }
            // console.log("audiofiles:", this.audioFiles);
        },
        fileClicked: function (filename) {
            fetch("/uploads/" + filename).then((response) => {
                console.log(response.status);
            })
        },
        deleteFile: function (filename) {
            let yes = true; //confirm("Are you sure you want to delete " + filename + "?")
            if (yes) {
                fetch("/uploads/" + filename, {
                    method: "DELETE",
                }).then((response) => {
                    this.getFileNames();
                });
            }
        },
    },
    mounted: function () {
        const form = document.querySelector("form");
        form.addEventListener('submit', this.handleSubmit.bind(this));
    },
    created: function () {
        this.getFileNames();


    }
}).mount("#app")
