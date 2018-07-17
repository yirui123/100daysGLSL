#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plotV(float pct, vec2 st){
  return  step( pct-0.02, st.x) -
          step( pct, st.x);
}

float plotH(float pct, vec2 st){
  return  step( pct-0.02, st.y) -
          step( pct, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float line1 = plotV(0.2,st);
    float line2 = plotV(0.95,st);
    float line3 = plotV(0.7,st);

    float line4 = plotH(0.05,st);
    float line5 = plotH(0.7,st);
    float line6 = plotH(0.85,st);


    vec3 color = vec3( (line1 + line2 + line3 + line4 + line5 + line6), st.x, st.y);

    gl_FragColor = vec4(color,1.0);

}
