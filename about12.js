          const canvas = document.getElementById('webgl-canvass');
        const gl = canvas.getContext('webgl');
        function createShader(gl, type, src) {
            const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s;
        }
        const prog = gl.createProgram();
        gl.attachShader(prog, createShader(gl, gl.VERTEX_SHADER, document.getElementById('vs').text));
        gl.attachShader(prog, createShader(gl, gl.FRAGMENT_SHADER, document.getElementById('fs').text));
        gl.linkProgram(prog); gl.useProgram(prog);
        const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
        const p = gl.getAttribLocation(prog, "position"); gl.enableVertexAttribArray(p);
        gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
        const tL = gl.getUniformLocation(prog, "time");
        const rL = gl.getUniformLocation(prog, "res");

        function draw(now) {
            canvas.width = window.innerWidth; canvas.height = window.innerHeight;
            gl.viewport(0,0,canvas.width, canvas.height);
            gl.uniform1f(tL, now * 0.001); gl.uniform2f(rL, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);