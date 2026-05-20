export const lerp      = (a, b, t) => a + (b - a) * t;
export const clamp     = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
export const mapRange  = (v, a, b, c, d) => ((v-a)/(b-a))*(d-c)+c;
export const smoothstep = (lo, hi, x) => {
  const t = clamp((x-lo)/(hi-lo), 0, 1);
  return t*t*(3-2*t);
};