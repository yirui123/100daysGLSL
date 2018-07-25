uniform vec2 resolution;
uniform float time;

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

float sphere( vec3 pos, vec3 center, float radius )
{
    return length( pos - center ) - radius;
}

float box( vec3 pos, vec3 center, vec3 size, float corner )
{
    return length( max( abs( pos-center )-size, 0.0 ) )-corner;
}

float unite( float a, float b){return min(a, b);}
float subtract( float a, float b ){ return max(-a, b); }
float intersect( float a, float b ){ return max(a, b); }
float sdf(vec3 p) {

    //we build a sphere
    float s = sphere( p, vec3( 0. ), 0.9);

    //we build a box
    float b = box( p, vec3( 0. ), vec3( 0.35 + 0.05*sin(time/10.) ), .0);

    //we return the combination of both:
    // subtracting the sphere from the box
    return subtract( s,b  );
}

 
void main() {
	vec2 uv = ( gl_FragCoord.xy / resolution.xy ) * 2.0 - 1.0;
    uv *= noise( uv + time/1.5);
	uv.x *= resolution.x / resolution.y;
    // camera position and ray direction
	vec3 pos = vec3( 0.0,0.,-3.);
    
	vec3 dir = normalize( vec3( uv, 1. ) );

	vec3 ip;
	float t = 0.0;
	for( int i = 0; i < 6; i++) {
        ip = pos + dir * t;
        float temp = sdf( ip );
		if( temp < 0.1 ) break;
		t += temp;
	}
	gl_FragColor = vec4( ip, 1.0);
}