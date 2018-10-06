
//顶点着色器程序
let VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n'+
    'void main(){\n' + 
    'gl_Position = a_Position;\n'+//设置坐标
    'gl_PointSize = 10.0;\n' + //设置尺寸
    '}\n';
//片元着色器程序
let FSHADER_SOURCE = 
    'precision mediump float;\n' + 
    'uniform vec4 u_FragColor;\n'+
    'void main() {\n' + 
    'gl_FragColor = u_FragColor;\n' + //设置颜色
    '}\n';

const main = ()=>{
    let canvas = document.getElementById('webgl');
    if(!canvas){
        console.log('fail to get canvas');
        return;
    }
    let gl = getWebGLContext(canvas);
    if(!gl){
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    //初始化着色器
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('Failed to initialize shaders');
        return;
    }
    //获取attribute 变量的存储位置
    let a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if(a_Position < 0){
        console.log('Failed to get the storage location of a_Position');
        return;
    }
    //获取 u_FragColor变量存储位置
    let u_FragColor = gl.getUniformLocation(gl.program,'u_FragColor');
    if(!u_FragColor){
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }
    //注册鼠标点击事件响应函数
    canvas.onmousedown = (ev)=>{
        click(ev,gl,canvas,a_Position,u_FragColor);
    }
    

    //指定清空<canvas>的颜色
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
}
let g_points = [];
let g_colors = [];
const click = (ev,gl,canvas,a_Position,u_FragColor)=>{
    let x = ev.clientX;
    let y = ev.clientY;
    let rect = ev.target.getBoundingClientRect();
    x = ((x-rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y-rect.top))/(canvas.width/2);
    //将坐标存储到g_points 数组中
    g_points.push([x,y]);
    if(x >= 0.0 && y >= 0.0){
        g_colors.push([1.0,0.0,0.0,1.0]);
    }
    else if(x <0.0 && y<0.0){
        g_colors.push([0.0,1.0,0.0,1.0]);
    }
    else{
        g_colors.push([0.0,0.0,1.0,1.0]);
    }
    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    let len = g_points.length;
    // gl.vertexAttrib3f(a_Position,x,y,0.0);
    for(let i=0; i<len; i++){
        //将顶点位置传输给 attribute 变量
        let xy = g_points[i];
        let rbga = g_colors[i];
        gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);
        gl.uniform4f(u_FragColor,rbga[0],rbga[1],rbga[2],rbga[3]);
        gl.drawArrays(gl.POINTS,0,1);
    }
    

}