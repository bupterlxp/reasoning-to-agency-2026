// Original vector artwork: a continuous torus, a visual metaphor for the
// feedback loop between reasoning, interaction, and learning.
function project(u: number, v: number) {
  const radius = 142 + 57 * Math.cos(v)
  const x = radius * Math.cos(u)
  const y = radius * Math.sin(u)
  const z = 57 * Math.sin(v)
  const tilt = 0.72
  const yp = y * Math.cos(tilt) - z * Math.sin(tilt)
  const zp = y * Math.sin(tilt) + z * Math.cos(tilt)
  const turn = -0.48
  const perspective = 650 / (650 - zp)
  return {
    x: 260 + (x * Math.cos(turn) - yp * Math.sin(turn)) * perspective,
    y: 255 + (x * Math.sin(turn) + yp * Math.cos(turn)) * perspective,
    depth: zp,
  }
}

const longitudinal = Array.from({ length: 32 }, (_, i) => {
  const v = (i / 32) * Math.PI * 2
  const points = Array.from({ length: 161 }, (_, j) => project((j / 160) * Math.PI * 2, v))
  return points.map((p, j) => `${j ? 'L' : 'M'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') + 'Z'
})

const meridians = Array.from({ length: 68 }, (_, i) => {
  const u = (i / 68) * Math.PI * 2
  const points = Array.from({ length: 49 }, (_, j) => project(u, (j / 48) * Math.PI * 2))
  return {
    d: points.map((p, j) => `${j ? 'L' : 'M'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') + 'Z',
    depth: project(u, 0).depth,
  }
}).sort((a, b) => a.depth - b.depth)

export default function Orbit() {
  return (
    <div className="orbit-art" aria-hidden="true">
      <div className="orbit-ambient" />
      <svg className="orbit-svg" viewBox="0 0 520 510" fill="none">
        <defs>
          <linearGradient
            id="orbit-ink"
            x1="60"
            y1="80"
            x2="435"
            y2="430"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a6bd8d" />
            <stop offset=".44" stopColor="#729766" />
            <stop offset="1" stopColor="#254f3c" />
          </linearGradient>
          <radialGradient id="orbit-halo">
            <stop stopColor="#dbe7c4" stopOpacity=".7" />
            <stop offset="1" stopColor="#dbe7c4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="260" cy="255" r="235" fill="url(#orbit-halo)" />
        <circle
          cx="260"
          cy="255"
          r="234"
          stroke="#91a68c"
          strokeOpacity=".24"
          strokeDasharray="2 7"
        />
        <path d="M20 255H500M260 15V495" stroke="#8fa186" strokeOpacity=".12" />
        <g className="torus-lines" stroke="url(#orbit-ink)">
          {longitudinal.map((d, i) => (
            <path key={`l${i}`} d={d} strokeWidth=".65" opacity=".5" />
          ))}
          {meridians.map((line, i) => (
            <path
              key={`m${i}`}
              d={line.d}
              strokeWidth={line.depth > 0 ? '.85' : '.6'}
              opacity={line.depth > 0 ? '.82' : '.35'}
            />
          ))}
        </g>
        <path
          d="M115 128L86 104H45M427 201L464 176H494M284 421V453H372"
          stroke="#668467"
          strokeWidth=".8"
        />
        <circle cx="115" cy="128" r="4" fill="#325b43" stroke="#f7f8f2" strokeWidth="2" />
        <circle cx="427" cy="201" r="4" fill="#325b43" stroke="#f7f8f2" strokeWidth="2" />
        <circle cx="284" cy="421" r="4" fill="#325b43" stroke="#f7f8f2" strokeWidth="2" />
        <circle cx="260" cy="255" r="4" fill="#355c42" />
        <circle
          className="orbit-center-pulse"
          cx="260"
          cy="255"
          r="12"
          stroke="#355c42"
          strokeWidth=".6"
        />
      </svg>
      <span className="orbit-label label-learn">
        <span>01</span> Learn
      </span>
      <span className="orbit-label label-act">
        <span>02</span> Act
      </span>
      <span className="orbit-label label-adapt">
        <span>03</span> Adapt
      </span>
      <div className="orbit-caption">
        <span className="tiny-cross">+</span> INTELLIGENCE, IN THE LOOP{' '}
        <span className="tiny-cross">+</span>
      </div>
    </div>
  )
}
