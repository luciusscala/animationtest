uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 distortedUv = vUv + (uMouse - 0.5) * 0.1 * sin(uTime);
  gl_FragColor = texture2D(uTexture, distortedUv);
}
