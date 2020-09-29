var rope = require("rope");

cc.Class({
    extends: cc.Component,

    properties: {
        menuAudio: {
            default: null,
            url: cc.AudioClip
        },
    },
    
    // use this for initialization
    onLoad: function () {
        cc.audioEngine.play(this.menuAudio, true);
    },
    
    onDestroy: function () {
        cc.audioEngine.pauseAll();
    }

    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {
        
    //},
});
