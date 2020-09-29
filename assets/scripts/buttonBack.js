cc.Class({
    extends: cc.Component,

    properties: {
        timer: 0,
    },
    
    goToGame: function(){
        cc.director.loadScene("main");
    },

    // use this for initialization
    onLoad: function () {
        this.timer = 15;

    },
    
    mostraBotao: function(){
        this.node.setPosition(-363, -209);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.timer < 1) {
            this.mostraBotao();
            
        }
        this.timer -= dt;

    },
});
