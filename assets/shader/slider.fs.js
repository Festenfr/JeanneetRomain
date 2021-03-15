export const fragmentShader = `
uniform float uTime;
uniform float alpha;
uniform float progress;
uniform float intensity;
uniform float strength;
uniform sampler2D texture1;
uniform sampler2D texture2;
varying vec2 vUv;

  vec4 transition(vec2 vUv) {
    vec4 fTex = texture2D(texture1, vUv);
    vec4 tTex = texture2D(texture2, vUv);
    float m = step(distance(fTex, tTex), progress);
    return mix(mix(fTex, tTex, m),tTex,pow(progress, strength));
  }
void main()	{
  vec4 color = transition(vUv);
  gl_FragColor = vec4(color) *alpha;
}`
