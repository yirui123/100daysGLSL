uniform vec2 resolution;
uniform float time;
uniform float fov;
uniform float raymarchMaximumDistance;
uniform float raymarchPrecision;
uniform vec3 camera;
uniform vec3 target;

uniform vec3 color0;
uniform vec3 color1;

uniform vec3 light0;
uniform vec3 light1;


float sphere( vec3 pos, vec3 center, float radius ){
    return length( pos - center ) - radius;
}

float box( vec3 pos, vec3 center, vec3 size, float corner ){
    return length( max( abs( pos-center )-size, 0.0 ) )-corner;
}

float sdTorus( vec3 p, vec2 t )
{
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}

float unite( float a, float b){return min(a, b);}
float subtract( float a, float b ){ return max(-a, b); }
float intersect( float a, float b ){ return max(a, b); }
float sdf(vec3 p) {
    float s = sphere( p, vec3( 0. ), 1.25 );
    float b = box( p, vec3( 0. ), vec3( 1. ), .0 );
    float t = sdTorus(p, vec2(0.5));
    return subtract( t, s );
}

void main() {
	vec2 uv = ( gl_FragCoord.xy / resolution.xy ) * 2.0 - 1.0;
    //uv *= noise( uv + time/1.5);
	uv.x *= resolution.x / resolution.y;
    // camera position and ray direction
	vec3 pos = vec3( 0.0,0.,-4.0 *sin(time/10.));
    
	vec3 dir = normalize( vec3( uv, 1. ) );

	vec3 ip;
	float t = 0.0;
	for( int i = 0; i < 32; i++) {
        ip = pos + dir * t;
        float temp = sdf( ip );
		if( temp < 0.1 ) break;
		t += temp;
	}

	gl_FragColor = vec4( ip, 1.0);
}