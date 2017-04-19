var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.speed = getRandomFloat(3);
    // **现在敌人有速度属性了
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
    this.x += changeXY('x','1') * dt * this.speed * 2;//**向右移动网格坐标1 * dt * 速度 距离。
    if (this.x >= changeXY('x','4')) {//如果到达最右侧
        this.x = 1;//重新回到最左侧
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Gem = function(x,y){
    this.x = changeXY('x',x);
    this.y = changeXY('y',y);
    this.sprite = 'images/Gem Blue.png';
};

Gem.prototype.update = function(){

};

Gem.prototype.render = function(){
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

/**
* @description 移动一个对象
* @constructor
* @param {string} direction - 要移动的方向
*/
Player.prototype.move = function(direction){
    if (direction == 'left') {
        if (this.x / TILE_WIDTH > 0) {
            this.x = this.x - TILE_WIDTH;
        }
    }
    if (direction == 'right') {
        if (this.x / TILE_WIDTH < 4) {
            this.x = this.x + TILE_WIDTH;
        }
    }
    if (direction == 'up') {
        if (this.y / TILE_HEIGHT > 0) {
            this.y = this.y - TILE_HEIGHT;
        }
    }
    if (direction == 'down') {
        if (this.y / TILE_HEIGHT < 5) {
            this.y = this.y + TILE_HEIGHT;
        }
    }
};

Player.prototype.handleInput = function(key){
    this.move(key);
};

/**
* @description 坐标转换
* @constructor
* @param {string} xory - X or Y
* @param {string} value - 要转换的坐标值，从网格坐标转换为像素坐标
*/
var changeXY = function(xory,value){
    if (xory == 'x') {
        return (value * TILE_WIDTH);
    }
    if (xory == 'y') {
        return (value * TILE_HEIGHT);
    }
    return 0;
};

/**
* @description 产生随机数
* @constructor
* @param {int} value - 倍数
*/
var getRandomFloat = function(value)
{//生成0-1之间浮点数value倍的随机数，范围为[0,value)
    var Rand = Math.random() * value;
    return Rand;
};

var getRandomInt = function(Min,Max)
{   
var Range = Max - Min;   
var Rand = Math.random();   
return(Min + Math.round(Rand * Range));   
}

var removeObjWithArr = function (_arr,_obj) {
    var length = _arr.length;
    for(var i = 0; i < length; i++)
    {
        if(_arr[i] == _obj)
        {
            if(i == 0)
            {
                _arr.shift(); //删除并返回数组的第一个元素
                return;
            }
            else if(i == length-1)
            {
                _arr.pop();  //删除并返回数组的最后一个元素
                return;
            }
            else
            {
                _arr.splice(i,1); //删除下标为i的元素
                return;
            }
        }
    }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

// **使用for循环添加敌人
var allEnemies = new Array();
for (var i = 0; i < 3; i++) {
    var enemy = new Enemy(getRandomFloat(2),(i+1));
    allEnemies[i] = enemy;
}

var allGems = new Array();
for (var i = 0; i < 3; i++) {
    var gem = new Gem(getRandomInt(0,5),(i+1));
    allGems[i] = gem;
}

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
