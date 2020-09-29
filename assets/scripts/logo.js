cc.Class({
    extends: cc.Component,

    properties: {
        timer: 0,
        
        duracaoLogo: 0,
        
        logoSong: {
            default: null,
            url: cc.AudioClip
        },
    },

    // use this for initialization
    onLoad: function () {
        this.timer = 0;
        cc.audioEngine.playEffect(this.logoSong, false);

    },
    
    vaiPraMain: function(){
        cc.director.loadScene("main");
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.timer > this.duracaoLogo) {
            this.vaiPraMain();
            
        }
        this.timer += dt;

    },
});
