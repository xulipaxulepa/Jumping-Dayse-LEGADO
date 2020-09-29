cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight: 0,
        // main character's jump duration
        jumpDuration: 0,
        // maximal movement speed
        maxMoveSpeed: 0,
        // acceleration
        accel: 0,
        
        creditAudio: {
            default: null,
            url: cc.AudioClip
        },
    },
    
    setJumpAction: function () {
        // jump up
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight));
        // repeat
        return cc.repeatForever(jumpUp);
    },

    // use this for initialization
    onLoad: function () {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        cc.audioEngine.play(this.creditAudio, true);
    },
    
    onDestroy: function () {
        cc.audioEngine.pauseAll();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
