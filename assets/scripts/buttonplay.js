cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    
    goToGame: function(){
        cc.director.loadScene("game");
    },
    
        // use this for initialization
    onLoad: function () {
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
