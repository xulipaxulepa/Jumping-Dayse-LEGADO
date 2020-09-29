cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    
    goToCredits: function(){
        cc.director.loadScene("credits");
    },

    // use this for initialization
    onLoad: function () {
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
