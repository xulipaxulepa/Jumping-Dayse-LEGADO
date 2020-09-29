cc.Class({
    extends: cc.Component,

    properties: {
         // Altura do pulo do personagem principal
        jumpHeight: 0,
        // Duraçao do pulo do personagem principal
        jumpDuration: 0,
        // velocidade maxima de movimento
        maxMoveSpeed: 0,
        // aceleraçao
        accel: 0,
        
        timer: 0,
    },
    
    setJumpAction: function () {
        // sobe
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // desce
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // repete
        return cc.sequence(jumpUp, jumpDown);
    },
    
    jumpFunction: function(){
        if(this.node.getPositionY() == -137){
            this.jumpAction = this.setJumpAction();
            this.node.runAction(this.setJumpAction());
            var anim = this.getComponent(cc.Animation);
            anim.play('pulaADaisy');
        }
    },

    // use this for initialization
    onLoad: function () {
        this.timer = 0;
    },

    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {
        
    //},
});
