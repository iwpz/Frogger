// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = changeXY('x',x);
    this.y = changeXY('y',y);
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = (this.x + changeXY('x','1') * dt);//向右移动网格坐标1 * dt距离。
    if (this.x >= changeXY('x','4')) {//如果到达最右侧
        this.x = 1;//重新回到最左侧
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x,y){
    this.x = changeXY('x',x);
    this.y = changeXY('y',y);
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(){

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.handleInput = function(key){
    if (key == 'left') {
        move(player,'left');
    }
     if (key == 'right') {
        move(player,'right');
    }
    if (key == 'up') {
        move(player,'up');
    }
    if (key == 'down') {
        move(player,'down');
    }
};

/**
* @description 移动一个对象
* @constructor
* @param {Player/Enemy} obj - 要移动的对象
* @param {string} direction - 要移动的方向
*/
var move = function(obj,direction){
    if (direction == 'left') {
        if (obj.x / 101 > 0) {
            obj.x = obj.x - 101;
        }
    }
    if (direction == 'right') {
        if (obj.x / 101 < 4) {
            obj.x = obj.x + 101;
        }
    }
    if (direction == 'up') {
        if (obj.y / 80 > 0) {
            obj.y = obj.y - 80;
        }
    }
    if (direction == 'down') {
        if (obj.y / 80 < 5) {
            obj.y = obj.y + 80;
        }
    }
}

/**
* @description 坐标转换
* @constructor
* @param {string} xory - X or Y
* @param {string} value - 要转换的坐标值，从网格坐标转换为像素坐标
*/
var changeXY = function(xory,value){
    if (xory == 'x') {
        return (value * 101);
    }
    if (xory == 'y') {
        return (value * 80);
    }
    return 0;
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var enemy1 = new Enemy(0.3,1);
var enemy2 = new Enemy(0.2,2);
var enemy3 = new Enemy(0.4,3);
/*
var enemy4 = new Enemy(2.3,1);
var enemy5 = new Enemy(2.2,2);
var enemy6 = new Enemy(2.4,3);
*/
var allEnemies = [enemy1,enemy2,enemy3/*,enemy4,enemy5,enemy6*/];
var player = new Player(2,5);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
