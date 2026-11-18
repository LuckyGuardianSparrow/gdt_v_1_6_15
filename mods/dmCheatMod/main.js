(function () {
    var dmMod = {};
    
    dmMod.init = function () {
        var dm1 = GameManager;
        var dm2 = dm1.company;

        // 1. Dinheiro Infinito
        setInterval(function () {
            if (dm1 && dm1.company) {
                dm1.company.cash = 999999999999999;
            }
        }, 1000);

        // 2. Destravar Conquistas
        if (dm1 && dm1.achievements) {
            var dm3 = dm1.achievements;
            for (var dm4 = 0; dm4 < dm3.length; dm4++) {
                if (!dm3[dm4].isUnlocked) {
                    dm1.unlockAchievement(dm3[dm4].id);
                }
            }
        }

        // 3. Notas 10 Absolutas (Substituição da Engine de Reviews)
        if (typeof Review !== "undefined") {
            // Intercepta a geração de reviews antes delas serem processadas
            var originalGetReviews = Review.getReviews;
            Review.getReviews = function (game, company) {
                // Chama a função original para criar a estrutura correta das 4 revistas
                var reviews = originalGetReviews.apply(this, arguments);
                
                // Força todas as 4 notas para 10 e muda a mensagem
                for (var i = 0; i < reviews.length; i++) {
                    reviews[i].score = 10;
                    reviews[i].message = "10/10 Obra-prima indiscutivel!";
                }
                
                // Garante que a nota interna do jogo também seja 10
                if (game) {
                    game.score = 10;
                }
                
                return reviews;
            };
        }

        // Garante que o Game.score não seja recalculado depois
        if (typeof Game !== "undefined" && Game.prototype) {
            Game.prototype.calculateScore = function() {
                this.score = 10;
                return 10;
            };
        }

        // 4. Funcionários Imortais
        if (typeof Character !== "undefined") {
            var dm10 = Character.prototype.update;
            Character.prototype.update = function () {
                this.fatigue = 0;
                this.needsVacation = false;
                this.motivation = 1.0;
                return dm10.apply(this, arguments);
            };
        }

        // 5. Barris Vermelhos Infinitos
        if (dm1 && typeof Action !== "undefined") {
            var dm11 = new Action({
                id: "dmRedBarrels",
                name: "Usar Barris Vermelhos",
                isAvailable: function (dm12, dm13) {
                    return dm13 && dm13.gamePhase !== -1;
                },
                action: function (dm14, dm15) {
                    if (dm15) {
                        dm15.designPoints += 2000;
                        dm15.technologyPoints += 2000;
                        dm15.bugs = 0;
                    }
                }
            });
            
            if (dm2) {
                if (!dm2.actions) {
                    dm2.actions = [];
                }
                var dm16 = false;
                for (var dm17 = 0; dm17 < dm2.actions.length; dm17++) {
                    if (dm2.actions[dm17].id === "dmRedBarrels") {
                        dm16 = true;
                        break;
                    }
                }
                if (!dm16) {
                    dm2.actions.push(dm11);
                }
            }
        }
    };

    // Carrega o mod
    if (typeof GDT !== "undefined") {
        GDT.on(GDT.eventKeys.gameplay.loadGame, dmMod.init);
        GDT.on(GDT.eventKeys.gameplay.newGame, dmMod.init);
    }
    
    setTimeout(dmMod.init, 2000);
})();