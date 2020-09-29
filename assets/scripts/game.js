var rope = require("rope");

cc.Class({
    extends: cc.Component,

    properties: {
        gameAudio: {
            default: null,
            url: cc.AudioClip
        },
        
        rope: {
            default: null,
            type: cc.Node
        },
        
        btnJump: {
            default: null,
            type: cc.Node
        },
        
        background: {
            default: null,
            type: cc.Node
        },
        
        background2: {
            default: null,
            type: cc.Node
        },
        
        background3: {
            default: null,
            type: cc.Node
        },
        
        ground: {
            default: null,
            type: cc.Node
        },
        
        ground2: {
            default: null,
            type: cc.Node
        },
        
        ground3: {
            default: null,
            type: cc.Node
        },
        
        gameOverbackground: {
            default: null,
            type: cc.Node
        },
        
        fasternode: {
            default: null,
            type: cc.Node
        },
        
        randomtime: {
            default: null,
            type: cc.Node
        },
        
        score: {
            default: null,
            type: cc.Label
        },
        
        highScoreOnload: {
            default: null,
            type: cc.Label
        },
        
        hiScore: {
            default: null,
            type: cc.Label
        },
        
        contRegressiva: {
            default: null,
            type: cc.Label
        },
        
        daisy: {
            default: null,
            type: cc.Node
        },
        
        daisyhelpers: {
            default: null,
            type: cc.Node
        },
        
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        
        praTras: {
            default: null,
            type: cc.Node
        },
        
        scoreNode: {
            default: null,
            type: cc.Node
        },
        
        highScoreNode: {
            default: null,
            type: cc.Node
        },
        
        funcionaLoop: 0,
        
        contador: 0,
        
        save: 0,
        
        timer: 0,
        
        timerfaster: 0,
        
        some: 0,
        
        sobe: 0,
        
        desce: 0,
        
        BGStatus: 0,
        
        movStatus: 0,
        
        randomStatus: 0,
        
        statusLoop: 0,
        
        extra: 0,
        
        someFR: 0,
        
    },
    
    // use this for initialization
    onLoad: function () {
        cc.audioEngine.play(this.gameAudio, true);
        this.admobInit();
        this.cacheInterstitial();
        //sdkbox.PluginShare.init();
        this.funcionaLoop = 0;
        this.extra = 0;
        this.BGStatus = 0;
        this.movStatus = 0;
        this.randomStatus = 0;
        this.statusLoop = 1;
        this.background2.setOpacity(0);
        this.background3.setOpacity(0);
        this.ground2.setOpacity(0);
        this.ground3.setOpacity(0);
        this.some = 0;
        this.someFR = 255;
        this.timer = 4;
        this.timerfaster = 0;
        this.contador = 0;
        this.iniciarHighScore();
    },
    
    admobInit: function() {
        if(cc.sys.isMobile) {
            var self = this
            sdkbox.PluginAdMob.setListener({
                adViewDidReceiveAd: function(name) {
                    self.showInfo('adViewDidReceiveAd name=' + name);
                },
                adViewDidFailToReceiveAdWithError: function(name, msg) {
                    self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
                },
                adViewWillPresentScreen: function(name) {
                    self.showInfo('adViewWillPresentScreen name=' + name);
                },
                adViewDidDismissScreen: function(name) {
                    self.showInfo('adViewDidDismissScreen name=' + name);
                },
                adViewWillDismissScreen: function(name) {
                    self.showInfo('adViewWillDismissScreen=' + name);
                },
                adViewWillLeaveApplication: function(name) {
                    self.showInfo('adViewWillLeaveApplication=' + name);
                }
            });
            sdkbox.PluginAdMob.init();
        }
    },

    cacheInterstitial: function() {
        if(cc.sys.isMobile) {
            sdkbox.PluginAdMob.cache('gameover');
        }
    },

    showInterstitial: function() {
        if(cc.sys.isMobile) {
            sdkbox.PluginAdMob.show('gameover');
        }
    },
    
    /*shareOnTwitter: function(){
        var score = this.contador - 1;
        var shareInfo = {};
        shareInfo.text = "My score was "+score+", can you do better than me?";
        shareInfo.title = "I am Playing Jumping Daisy";
        shareInfo.link = "http://www.sdkbox.com";
        info.showDialog = false; //if you want share with dialog，set the value true
        shareInfo.platform = sdkbox.SocialPlatform.Platform_Twitter;
        plugin.share(shareInfo);
    },*/
    
    onDestroy: function () {
        cc.audioEngine.pauseAll();
    },
    
    
    //iniciar o highscore
    iniciarHighScore: function(){
        this.save = cc.sys.localStorage;
        if(this.save.getItem("highScore") === null){
            this.highScoreOnload.string = 'Hi-Score: 0';
        } else {
        this.highScoreOnload.string = 'Hi-Score: '+this.save.getItem("highScore");
        }
    },
    
    sobeCorda1: function (){
        var sobe = this.rope.getComponent(cc.Animation);
        var anima = sobe.playAdditive('sobeCorda');
        anima.speed = this.sobe;
        sobe.playAdditive('sobeCorda');
        var animaState1 = sobe.getAnimationState("sobeCorda");
        if(animaState1.isPlaying === true){
            this.funcionaLoop = 1;
        } 
    },
    
    desceCorda1: function (){
        var desce = this.rope.getComponent(cc.Animation);
        var anima = desce.playAdditive('desceCorda');
        anima.speed = this.desce;
        desce.playAdditive('desceCorda');
        var animaState2 = desce.getAnimationState("desceCorda");
        if(animaState2.isPlaying === true){
            this.funcionaLoop = 0;
        }
    },
    
    //Passa a corda para frente da tela
    vaiPraFrente: function(){
        this.praTras.removeChild(this.rope);
        this.daisyhelpers.addChild(this.rope);
        this.rope.setPosition(315, 6);
    },
    
    //Passa a corda para tras da tela
    vaiPraTras: function(){
        this.daisyhelpers.removeChild(this.rope);
        this.praTras.addChild(this.rope);
        this.rope.setPosition(123, 67);
    },
    
    //Funçao para setar o valor randomico na velocidade das cordas
    setVelRandomica: function(){
        this.sobe = Math.floor((Math.random() * 2.5) + 0.5);
        this.desce = this.sobe;
    },
    
    seForZero: function(){
        if(this.desce === 0 || this.sobe === 0){
            this.sobe = Math.floor((Math.random() * 2.5) + 0.5);
            this.desce = this.sobe;
        }
    },
    
    setStatusLoop: function(){
        this.statusLoop = Math.floor((Math.random() * 3) + 1);
    },
    
    
    /*Funçoes usadas para verificar as posiçoes 
    e executar os loops de movimento da corda*/
    loop1: function(){
        this.randomStatus = 0;
        var anima = this.rope.getComponent(cc.Animation);
        var animaState1 = anima.getAnimationState("sobeCorda");
        var animaState2 = anima.getAnimationState("desceCorda");
        if(this.funcionaLoop === 0 && animaState2.isPlaying === false){
                this.sobeCorda1();
                this.vaiPraTras();
                this.contador += 1;
                this.verificaColisao();
                this.atualizaBGStatus();
                this.resetaSome();
                this.mudaMovStatusFaster();
            } else if(this.funcionaLoop == 1 && animaState1.isPlaying === false){
               this.desceCorda1();
               this.vaiPraFrente();
               this.verificaColisao();
               this.trocaVelocidadeCorda();
            } 
    },
    
    loopFast: function(){
        this.randomStatus = 0;
        var anima = this.rope.getComponent(cc.Animation);
        var animaState1 = anima.getAnimationState("sobeCorda");
        var animaState2 = anima.getAnimationState("desceCorda");
        if(this.funcionaLoop === 0 && animaState2.isPlaying === false){
                this.sobeCorda1();
                this.vaiPraTras();
                this.contador += 1;
                this.verificaColisao();
                this.atualizaBGStatus();
                this.resetaSome();
            } else if(this.funcionaLoop == 1 && animaState1.isPlaying === false){
               this.desceCorda1();
               this.vaiPraFrente();
               this.verificaColisao();
            } 
    },
    
    loopRandom: function(){
        this.randomStatus = 1;
        var anima = this.rope.getComponent(cc.Animation);
        var animaState1 = anima.getAnimationState("sobeCorda");
        var animaState2 = anima.getAnimationState("desceCorda");
        if(this.funcionaLoop === 0 && animaState2.isPlaying === false){
                this.sobeCorda1();
                this.vaiPraTras();
                this.contador += 1;
                this.verificaColisao();
                this.atualizaBGStatus();
                this.resetaSome();
                this.extra = 1;
            } else if(this.funcionaLoop == 1 && animaState1.isPlaying === false){
               this.desceCorda1();
               this.vaiPraFrente();
               this.verificaColisao();
               this.setVelRandomica();
            }  
    },
    
    trocaVelocidadeCorda: function(){
        if(this.movStatus === 0){
            this.sobe = 0.5;
            this.desce = 0.5;
            } else if(this.movStatus == 1){
                this.sobe = 1;
                this.desce = 1;
            } else if(this.movStatus == 2){
                this.sobe = 1.5;
                this.desce = 1.5;
            } else if(this.movStatus == 3){
                this.sobe = 2;
                this.desce = 2;
            } else if(this.movStatus == 4){
                this.sobe = 2.5;
                this.desce = 2.5;
            } 
    },
    
    //verifica se o score atual ultrapassou a o hiScore e o salva
    salvaHiScore: function(){
        if(this.contador >= this.save.getItem("highScore")){
            var savehighscore = this.contador - 1;
            this.save.setItem("highScore", savehighscore);
        } else if(this.contador === 0){
            this.save.setItem("highScore", 0);
        }
    },
    
    /*exibe as informaçoes de game over, a pontuaçao
    a pontuaçao maxima adquirida no jogo e o botao para jogar novamente*/
    gameOver:function(){
        this.salvaHiScore();
        var moveBG = this.gameOverbackground.getComponent(cc.Animation);
        moveBG.playAdditive('moveGameOver');
        var caiButton = this.btnJump.getComponent(cc.Animation);
        caiButton.playAdditive('caiBtnJump');
        var cont = this.contador - 1;
        this.contador = cont;
        this.score.string = 'Score: '+ cont;
        this.hiScore.string = 'Hi-Score: '+this.save.getItem("highScore");
    },
    
    //Funçao para verificar a colisao do jogador com a corda
    verificaColisao: function(){
        var anima = this.rope.getComponent(cc.Animation);
        var animaState1 = anima.getAnimationState("sobeCorda");
        var animaState2 = anima.getAnimationState("desceCorda");
        if(animaState1.time <= 0.05 && animaState2.time >= 0.95 && this.daisy.getPositionY() <= -137){
            this.funcionaLoop = 3;
            this.daisy.stopAllActions();
            this.gameOver();
        } 
    },
    
    faster: function(){
        this.timerfaster = 1;
        var animfaster = this.fasternode.getComponent(cc.Animation);
        var animRT = this.randomtime.getComponent(cc.Animation);
        if(this.movStatus == 1 && this.extra == 0){
            animfaster.playAdditive('animaFRT');
        } else if(this.movStatus == 2 && this.extra == 0){
            animfaster.playAdditive('animaFRT');
        } else if(this.movStatus == 3 && this.extra == 0){
            animfaster.playAdditive('animaFRT');
        } else if(this.movStatus == 4 && this.extra == 0){
            animfaster.playAdditive('animaFRT');
        } else if(this.randomStatus == 1 && this.extra == 0){
            animRT.playAdditive('animaFRT');
        } else if(this.contador === 0 || this.contador == 1){
            
        } else {
            
        }  
    },
    
    apagaFaster: function(){
        if(this.timerfaster > 0){
            this.contRegressiva.string = '';
        }
    },
    
    contagemRegressiva:function(){
        if(this.timer > 3){
        this.contRegressiva.string = '3';
        } else if(this.timer > 2){
        this.contRegressiva.string = '2';
        } else if(this.timer > 1){
        this.contRegressiva.string = '1';
        } else if(this.timer > 0){
        this.contRegressiva.string = 'Jump!';
        var animascore = this.scoreNode.getComponent(cc.Animation);
        var animahighscore = this.highScoreNode.getComponent(cc.Animation);
        var sobeButton = this.btnJump.getComponent(cc.Animation);
        animascore.play();
        animahighscore.play();
        sobeButton.playAdditive('sobeBtnJump');
        } 
    },
    
    multiplos: function(valor, multiple){
        if(this.contador === 0){
            
        }else {
            var resto = valor % multiple;
            if(resto === 0){
                return true;
            } else {
                return false;
            }
        }
    },
    
    atualizaBGStatus: function(){
        if(this.multiplos(this.contador, 3) && this.multiplos(this.contador, 10)){
            this.BGStatus += 1;
        } else if(this.BGStatus == 4){
            this.BGStatus = 0;
        }
    },
    
    trocaBackGround: function(){
        if(this.multiplos(this.contador, 3) && this.multiplos(this.contador, 10) 
        && this.BGStatus == 1){
            this.someBG();
            this.background2.setOpacity(this.some);
            this.ground2.setOpacity(this.some);
        } else if(this.multiplos(this.contador, 3) && this.multiplos(this.contador, 10) 
        && this.BGStatus == 2){
            this.someBG();
            this.background3.setOpacity(this.some);
            this.ground3.setOpacity(this.some);
        } else if(this.multiplos(this.contador, 3) && this.multiplos(this.contador, 10) 
        && this.BGStatus == 3){
            this.someBG();
            this.background2.setOpacity(0);
            this.background3.setOpacity(-this.some);
            this.ground2.setOpacity(0);
            this.ground3.setOpacity(-this.some);
        } 
    },
    
    mudaMovStatusFaster: function(){
        if(this.multiplos(this.contador, 2) === true){
            this.movStatus += 1;
            this.extra = 0;
        } else if(this.movStatus == 5){
            this.movStatus = 0;
            this.extra = 1;
        } else if(this.multiplos(this.contador, 2) === false){
            this.extra = 1;
        }
    },
    
    resetaSome: function(){
        this.some = 0;
        
    },
    
    someBG: function(){
        if(this.some >= 255){
            
        } else {
        this.some += 5;
        }
    },
    
    randomizaStatusLoop: function(){
        if(this.multiplos(this.contador, 10)){
            this.setStatusLoop();
        } else if(this.multiplos(this.contador, 100)){
            this.setStatusLoop();
        }
    },
    
    infinitePlay: function(){
        if(this.statusLoop == 1){
            this.loop1();
        } else if(this.statusLoop == 2){
            this.loopFast();
        } else if(this.statusLoop == 3){
            this.loopRandom();
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        this.trocaBackGround();
        
        this.apagaFaster();
        
        this.faster();
        
        this.seForZero();
        
        this.randomizaStatusLoop();
        
        if(this.timer > 0){
            this.trocaVelocidadeCorda();
            this.contagemRegressiva();
        } else if(this.contador < 10){
            this.loop1();
        } else if(this.contador >= 1 && this.contador < 20){
                this.loopFast();
        } else if(this.contador >= 20 && this.contador < 30){
            this.loopRandom();
        } else if(this.contador >= 30 && this.contador < 40){
            this.loop1();
        } else if(this.contador >= 40){
            this.infinitePlay();
        }
        
        this.timer -= dt;
        this.timerfaster -= dt;
        this.scoreDisplay.string = this.contador;
    },
});
