var rope = require("rope");

cc.Class({
    extends: cc.Component,

    properties: {
        rope: {
            default: null,
            type: cc.Prefab
        },
        
        background: {
            default: null,
            type: cc.Node
        },
        
        daisyhelpers: {
            default: null,
            type: cc.Node
        },
        
        
    },
    
    sobe: function(){
        var jumpUp = cc.moveBy(5, cc.p(0, 301)).easing(cc.easeCubicActionOut());
        //return cc.repeat(jumpUp, 0);
        return jumpUp;
    },
    
    sobeCorda: function (corda){
        // put the newly added node under the Canvas node
        this.background.addChild(corda);
        corda.setPosition(0, -190);
        // sobe
        return this.sobe();
        },
        
    desceCorda: function (){
        var corda = cc.instantiate(this.rope);
        
        this.daisyhelpers.addChild(corda);
        corda.setPosition(350, 210);
        var jumpDown = cc.moveBy(5, cc.p(0, -300)).easing(cc.easeCubicActionIn());
        corda.runAction(cc.repeat(jumpDown, 1));
    },
    
    // use this for initialization
    onLoad: function () {
        var corda = cc.instantiate(this.rope);
        this.sobeCorda = this.sobeCorda(corda);
        corda.runAction(this.sobeCorda);
        //this.sobeCorda();
        //this.desceCorda();
            
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.sobe().isDone() === true){
            //corda.setOpacity(0);
            var corda = cc.instantiate(this.rope);
            this.daisyhelpers.addChild(corda);
            corda.setPosition(0, 0);
            
        }
        
    },
});
