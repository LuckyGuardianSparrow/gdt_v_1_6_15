(function () {
    var ready = function () {
        // Quando a API estiver pronta, o código principal será executado
    };
    var error = function () {
        console.log("Erro ao carregar o mod dmCheatMod");
    };
    // Diz para a API do jogo carregar o seu script principal
    GDT.loadJs(['mods/dmCheatMod/main.js'], ready, error);
})();