#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float gain(float x, float k)
{
    float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x), k);
    return (x<0.5)?a:1.0-a;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.1, pct, st.y) -
          smoothstep( pct, pct+0.1, st.y);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x += abs(sin((u_time/50.0) * PI));
    float y = gain(st.x,sin(u_time)*0.5);
    float z = gain(st.x,sin(u_time));
    float p = gain(st.x,sin(u_time)*0.1);
    float w = gain(st.x + 0.5,sin(u_time)*0.4);
    float q = gain(st.x - 0.5,cos(u_time)*0.4);
    float pct = plot(st,y);
    float pct2 = plot(st,z);
    float pct3 = plot(st,w);
    float pct4 = plot(st,q);
    float pct5 = plot(st,p);
    vec3 color = (pct+pct2+pct3+pct4+pct5)*vec3(st.x*st.y,st.x*0.2,st.y);
    gl_FragColor = vec4(color,q*3.0);

}
