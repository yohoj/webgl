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
    //指定清空<canvas>的颜色
    gl.clearColor(1.0,0.0,0.0,1.0);
    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
}