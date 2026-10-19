class ProjectPaperRenderer {
  constructor(layer) {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'paper-mesh-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');
    this.gl = this.canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!this.gl) throw new Error('Paper rendering unavailable');
    const vertex = `
      precision mediump float;
      attribute vec2 a_uv;
      uniform vec4 u_from;
      uniform vec4 u_to;
      uniform vec2 u_view;
      uniform float u_progress;
      varying vec2 v_uv;
      varying vec2 v_size;
      varying float v_shade;
      float settle(float value) {
        return value * value * value * (value * (value * 6.0 - 15.0) + 10.0);
      }
      void main() {
        vec2 travel = u_to.xy + u_to.zw * 0.5 - u_from.xy - u_from.zw * 0.5;
        vec2 direction = travel / max(length(travel), 1.0);
        vec2 leading = mix(1.0 - a_uv, a_uv, step(vec2(0.0), direction));
        float distanceToEdge = (leading.x * 0.58 + leading.y * 0.42);
        float delay = (1.0 - distanceToEdge) * 0.17;
        float local = clamp((u_progress - delay) / (1.0 - delay), 0.0, 1.0);
        float progress = settle(local);
        vec2 first = u_from.xy + a_uv * u_from.zw;
        vec2 last = u_to.xy + a_uv * u_to.zw;
        vec2 point = mix(first, last, progress);
        float wave = sin(local * 3.14159265);
        float curve = sin(a_uv.x * 3.14159265) * sin(a_uv.y * 3.14159265);
        float lift = wave * (curve * 0.65 + distanceToEdge * 0.35);
        float strength = min(length(travel) * 0.1, min(u_view.x, u_view.y) * 0.08);
        point += vec2(-direction.y, direction.x) * wave * curve * strength * 0.26;
        float depth = lift * min(strength, 64.0);
        point = u_view * 0.5 + (point - u_view * 0.5) / (1.0 - depth / 1600.0);
        gl_Position = vec4(point.x / u_view.x * 2.0 - 1.0, 1.0 - point.y / u_view.y * 2.0, 0.0, 1.0);
        v_uv = a_uv;
        v_size = mix(u_from.zw, u_to.zw, progress);
        v_shade = wave * (curve - distanceToEdge) * 0.09;
      }
    `;
    const fragment = `
      precision mediump float;
      uniform sampler2D u_image;
      uniform vec2 u_imageSize;
      varying vec2 v_uv;
      varying vec2 v_size;
      varying float v_shade;
      void main() {
        float imageAspect = u_imageSize.x / u_imageSize.y;
        float paperAspect = v_size.x / max(v_size.y, 1.0);
        vec2 crop = vec2(min(paperAspect / imageAspect, 1.0), min(imageAspect / paperAspect, 1.0));
        vec2 coordinates = (v_uv - 0.5) * crop + 0.5;
        vec4 color = texture2D(u_image, coordinates);
        gl_FragColor = vec4(color.rgb * (1.0 + v_shade), color.a);
      }
    `;
    const gl = this.gl;
    this.program = gl.createProgram();
    this.shaders = [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]].map(([type, source]) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Paper shader unavailable');
      gl.attachShader(this.program, shader);
      return shader;
    });
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) throw new Error('Paper program unavailable');
    gl.useProgram(this.program);
    const vertices = [];
    const columns = 24;
    const rows = 18;
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const left = column / columns;
        const right = (column + 1) / columns;
        const top = row / rows;
        const bottom = (row + 1) / rows;
        vertices.push(left, top, left, bottom, right, top, right, top, left, bottom, right, bottom);
      }
    }
    this.vertexCount = vertices.length / 2;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    const attribute = gl.getAttribLocation(this.program, 'a_uv');
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
    this.uniforms = Object.fromEntries(['from', 'to', 'view', 'progress', 'image', 'imageSize'].map((name) => [name, gl.getUniformLocation(this.program, `u_${name}`)]));
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const ratio = Math.min(devicePixelRatio || 1, 1.75);
    this.canvas.width = Math.round(innerWidth * ratio);
    this.canvas.height = Math.round(innerHeight * ratio);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.uniform2f(this.uniforms.view, innerWidth, innerHeight);
    gl.uniform1i(this.uniforms.image, 0);
    this.entries = [];
    this.frame = null;
    this.lost = false;
    this.disposed = false;
    this.canvas.addEventListener('webglcontextlost', (event) => {
      if (this.disposed) return;
      event.preventDefault();
      this.lost = true;
      this.entries.forEach((entry) => entry.resolve());
    });
    layer.append(this.canvas);
  }

  animate(source, from, to, { duration, delay, order }) {
    if (this.lost || this.disposed || !source.image.complete || !source.image.naturalWidth) return null;
    const gl = this.gl;
    const texture = gl.createTexture();
    try {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source.image);
    } catch {
      gl.deleteTexture(texture);
      return null;
    }
    const result = new Promise((resolve) => {
      this.entries.push({ source, from, to, duration, order, texture, start: performance.now() + delay, progress: 0, resolve });
    });
    this.canvas.dataset.sheetCount = String(this.entries.length);
    if (this.frame === null) this.frame = requestAnimationFrame((now) => this.draw(now));
    return result;
  }

  draw(now) {
    this.frame = null;
    if (this.lost || this.disposed) return;
    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    let moving = false;
    [...this.entries].sort((first, second) => first.order - second.order).forEach((entry) => {
      entry.progress = Math.max(0, Math.min(1, (now - entry.start) / entry.duration));
      moving ||= entry.progress < 1;
      gl.uniform4f(this.uniforms.from, entry.from.left, entry.from.top, entry.from.width, entry.from.height);
      gl.uniform4f(this.uniforms.to, entry.to.left, entry.to.top, entry.to.width, entry.to.height);
      gl.uniform1f(this.uniforms.progress, entry.progress);
      gl.uniform2f(this.uniforms.imageSize, entry.source.image.naturalWidth, entry.source.image.naturalHeight);
      gl.bindTexture(gl.TEXTURE_2D, entry.texture);
      gl.drawArrays(gl.TRIANGLES, 0, this.vertexCount);
      if (entry.progress === 1) entry.resolve();
    });
    if (moving) this.frame = requestAnimationFrame((time) => this.draw(time));
  }

  bounds() {
    return new Map(this.entries.map((entry) => {
      const progress = entry.progress ** 3 * (entry.progress * (entry.progress * 6 - 15) + 10);
      return [entry.source.picture, Object.fromEntries(['left', 'top', 'width', 'height'].map((name) => [name, entry.from[name] + (entry.to[name] - entry.from[name]) * progress]))];
    }));
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    this.entries.forEach((entry) => {
      entry.resolve();
      this.gl.deleteTexture(entry.texture);
    });
    this.gl.deleteBuffer(this.buffer);
    this.shaders.forEach((shader) => this.gl.deleteShader(shader));
    this.gl.deleteProgram(this.program);
    this.gl.getExtension('WEBGL_lose_context')?.loseContext();
    this.canvas.remove();
  }
}
