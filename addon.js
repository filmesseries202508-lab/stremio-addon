const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const builder = new addonBuilder({
    id: "org.exemplo.completo",
    version: "1.0.0",
    name: "Addon Completo de Teste",
    description: "Addon para testes",
    resources: ["catalog", "meta", "stream"],
    types: ["movie"],
    catalogs: [{
        type: "movie",
        id: "filmes",
        name: "Filmes Teste"
    }]
});

const filmes = [
{
    id: "bbb",
    type: "movie",
    name: "Big Buck Bunny",
    poster: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg",
    description: "Filme de teste."
},
{
    id: "sintel",
    type: "movie",
    name: "Sintel",
    poster: "https://download.blender.org/durian/poster/sintel_poster.jpg",
    description: "Curta open source."
}
];

builder.defineCatalogHandler(() => Promise.resolve({
    metas: filmes
}));

builder.defineMetaHandler(({ id }) => Promise.resolve({
    meta: filmes.find(f => f.id === id)
}));

builder.defineStreamHandler(({ id }) => {

    if (id === "bbb") {
        return Promise.resolve({
            streams: [{
                title: "Big Buck Bunny",
                url: "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"
            }]
        });
    }

    if (id === "sintel") {
        return Promise.resolve({
            streams: [{
                title: "Sintel",
                url: "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"
            }]
        });
    }

    return Promise.resolve({
        streams: []
    });
});

serveHTTP(builder.getInterface(), {
    port: process.env.PORT || 7000
});});

console.log("Addon iniciado!");
console.log("http://localhost:7000/manifest.json");