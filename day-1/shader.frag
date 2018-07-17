#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
// uniform vec2 u_mouse;
uniform float u_time;


// dot() returns the dot product of two vectors
float random (vec2 st) {
    return fract(
      sin( dot ( st.xy, vec2(12.9898,78.233)))* abs(tan(u_time) * 2.0 )
    );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.yx;

    st.y *= 5.0; // Scale the coordinate system
    st = ( st - vec2(3.0) ) * u_time;
    vec2 ipos = floor(st);  // get the integer coords
    vec2 fpos = fract(st * 12.0);  // get the fractional coords

    // Assign a random value based on the integer coord
    vec3 color = vec3(random( ipos ));  // get cubes
    // vec3 color = vec3(random( fpos )); // get noises

    gl_FragColor = vec4(vec3(color)*2.0, 1.0);
}
