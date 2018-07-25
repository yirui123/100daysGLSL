#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 438.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f * f * (3.0 - 2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float shape(vec2 st, float radius) {
    st *= vec2(1) - st;
    st *= noise(st+u_time*.5);
    float dist = .0;
    vec2 center = vec2(0.5);
    dist = distance(st, center);

    float r = length(st)*2.0;
    float a = atan(st.y,st.x);
    float m = abs(mod(a+u_time*5.,PI*2.)-PI)/3.6;
    radius += sin(a*30.)*noise(st+u_time*5.5)*.1;
    radius += (sin(a*20.)*.1 * pow (m,2.) );
	return 1.-smoothstep(radius,radius+dist,r * dist);
}

float shapeBorder(vec2 st, float radius, float width) {
    return shape(st,radius)-shape(st,radius - width);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 pos = st.yx * vec2(5.,3. );
    pos = rotate2d( noise(pos) ) * pos * sin(u_time/40.);
	vec3 color = vec3(0.529*pos.x, 0.808, 0.922*pos.y) * shapeBorder(pos,0.2,0.5 * atan(pos.y,pos.x)) * 5.0;
	gl_FragColor = vec4( color, 1.0 );
}
