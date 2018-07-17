#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plotV(float pct, vec2 st){
  return  step( pct-0.02,st.x) -
          step( pct, st.x);
}

float plotH(float pct, vec2 st){
  return  step( pct-0.02, st.y) -
          step( pct, st.y);
}

float random (vec2 st) {
    return fract(
      sin( dot ( st.yx, vec2(12.9898,78.233)))* abs(sin(u_time)) * 1234.4
    );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    // st.y *= 2.0*abs(sin(u_time));
    // random texture
    vec2 fpos = fract(st);
    vec3 random = vec3(random( fpos ));

    // black lines
    float line0 = plotV(0.07,st);
    float line1 = plotV(0.2,st);
    float line2 = plotV(0.97,st);
    float line3 = plotV(0.7,st);

    float line4 = plotH(0.1,st);
    float line5 = plotH(0.72,st);
    float line6 = plotH(0.85,st);

    // yellow block
    vec2 newSt = vec2(st.x-0.25, st.y);
    vec2 bl = step(vec2(0.72),newSt);
    vec2 tr = step(vec2(0),1.0-newSt);
    vec3 colorB = vec3(vec2(bl.x * bl.y * tr.x * tr.y * 0.2), 0.6 * abs(sin(u_time)));
    colorB = colorB.bgr;

    // red block
    vec2 newUV = vec2(st.x+0.1, (1.0 - st.y));
    vec2 blr = step(vec2(0.72),1.0 - newUV);
    vec2 trr = step(vec2(0),newUV);
    vec3 colorC = vec3(abs(sin(u_time))*0.01 - 0.5, vec2(blr.x * blr.y * trr.x * trr.y));

    // blue block
    vec2 newVU = vec2(st.x+0.02, (0.8 - st.y));
    vec2 bly = step(vec2(0.72),newVU);
    vec2 try = step(vec2(0),1.0-st);
    vec3 colorD = vec3(vec2(bly.x * bly.y * try.x * try.y), 0.2 * abs(sin(u_time)));


    vec3 colorA = vec3(line0 + line1 + line2 + line3 + line4 + line5 + line6) * random;
    vec3 color = vec3(colorA + colorB + colorC + colorD);
    gl_FragColor = vec4((1.0-color*2.0),1.0);

}
