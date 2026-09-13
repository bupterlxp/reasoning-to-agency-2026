import { BrainCircuit } from 'lucide-react'

// A readable learning loop: knowledge informs reasoning, reasoning guides
// tool use, and observed outcomes become feedback for the next interaction.
export default function Orbit() {
  return (
    <div className="orbit-art">
      <svg
        className="orbit-svg"
        viewBox="0 0 540 535"
        fill="none"
        role="img"
        aria-labelledby="agent-loop-title agent-loop-description"
      >
        <title id="agent-loop-title">How foundation models learn, act, and adapt</title>
        <desc id="agent-loop-description">
          A foundation model reasons and plans at the center of a continuous loop. It learns from
          data and experience, acts through tools and environments, and adapts using feedback and
          memory. Outcomes improve its next action.
        </desc>
        <defs>
          <radialGradient id="agent-halo">
            <stop stopColor="#dce8c9" stopOpacity=".85" />
            <stop offset="1" stopColor="#eaf0df" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="agent-core"
            x1="180"
            y1="188"
            x2="365"
            y2="330"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3e5b42" />
            <stop offset="1" stopColor="#263e32" />
          </linearGradient>
          <pattern id="agent-grid" width="19" height="19" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".7" fill="#9aaa86" />
          </pattern>
          <filter id="agent-shadow" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="7" stdDeviation="9" floodColor="#345136" floodOpacity=".075" />
          </filter>
          <marker
            id="agent-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path
              d="M2 1L8 5L2 9"
              stroke="#6f875c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        <circle cx="270" cy="270" r="247" fill="url(#agent-halo)" />
        <rect
          x="42"
          y="24"
          width="456"
          height="477"
          rx="95"
          fill="url(#agent-grid)"
          opacity=".24"
        />
        <circle
          cx="270"
          cy="267"
          r="204"
          stroke="#b8caa5"
          strokeOpacity=".4"
          strokeDasharray="2 7"
        />

        {/* The outer arrows connect the three stages clockwise. */}
        <g markerEnd="url(#agent-arrow)">
          <path className="agent-cycle" d="M379 93C453 116 495 203 485 310" />
          <path className="agent-cycle" d="M405 470C330 517 209 517 135 470" />
          <path className="agent-cycle" d="M51 310C28 207 80 117 163 92" />
        </g>

        {/* Concrete information flows to and from the model. */}
        <g stroke="#6f875c" strokeWidth="1.4" strokeLinecap="round" markerEnd="url(#agent-arrow)">
          <path d="M270 161V181" />
          <path d="M370 271C404 274 425 295 434 324" />
          <path d="M107 324C118 292 140 273 170 269" />
        </g>
        <text className="agent-flow-label" x="285" y="175">
          knowledge
        </text>
        <text className="agent-flow-label" x="419" y="281" textAnchor="middle">
          actions
        </text>
        <text className="agent-flow-label" x="118" y="281" textAnchor="middle">
          feedback
        </text>

        {/* Model: a circuit brain on a chip, with reasoning and planning explicit. */}
        <g stroke="#7d946a" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M164 217H176M164 238H176M164 259H176M164 280H176" />
          <path d="M364 217H376M364 238H376M364 259H376M364 280H376" />
          <path d="M227 334V344M248 334V344M270 334V344M292 334V344M313 334V344" />
        </g>
        <rect
          x="178"
          y="189"
          width="184"
          height="144"
          rx="22"
          fill="url(#agent-core)"
          stroke="#536e46"
          filter="url(#agent-shadow)"
        />
        <rect
          x="185"
          y="196"
          width="170"
          height="130"
          rx="16"
          stroke="#adc593"
          strokeOpacity=".18"
        />
        <circle cx="270" cy="241" r="34" fill="#d9edb9" fillOpacity=".07" />
        <BrainCircuit
          x="244"
          y="213"
          width="52"
          height="52"
          color="#d9edb9"
          strokeWidth="1.3"
          aria-hidden="true"
        />
        <circle className="agent-indicator" cx="339" cy="212" r="3" fill="#c7e5a5" />
        <text className="agent-model-title" x="270" y="291" textAnchor="middle">
          Foundation model
        </text>
        <text className="agent-model-subtitle" x="270" y="312" textAnchor="middle">
          REASON · PLAN
        </text>

        {/* Learn: an open book and a page of examples. */}
        <g className="agent-stage">
          <rect
            className="agent-stage-card"
            x="182"
            y="30"
            width="176"
            height="124"
            rx="14"
            filter="url(#agent-shadow)"
          />
          <rect x="198" y="49" width="49" height="48" rx="11" fill="#eaf0dc" />
          <g
            stroke="#5e7950"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path
              d="M207 63C213 60 218 61 223 65C228 61 233 60 239 63V84C233 81 228 82 223 86C218 82 213 81 207 84Z"
              fill="#f9fcf3"
            />
            <path d="M223 65V86M211 68L218 69M211 73L218 74M228 69L235 67M228 74L235 72" />
            <path d="M202 56H213V61" stroke="#92a67c" />
          </g>
          <text className="agent-stage-number" x="340" y="47" textAnchor="end">
            01
          </text>
          <text className="agent-stage-title" x="257" y="67">
            Learn
          </text>
          <text className="agent-detail" x="257" y="86">
            Data &amp;
          </text>
          <text className="agent-detail" x="257" y="101">
            experience
          </text>
          <path d="M199 112H341" stroke="#dce5d1" />
          <text className="agent-stage-note" x="270" y="135" textAnchor="middle">
            Build useful knowledge
          </text>
        </g>

        {/* Act: a browser window with a cursor that takes an action. */}
        <g className="agent-stage">
          <rect
            className="agent-stage-card"
            x="351"
            y="333"
            width="176"
            height="127"
            rx="14"
            filter="url(#agent-shadow)"
          />
          <rect x="367" y="353" width="49" height="48" rx="11" fill="#e4ecdf" />
          <g
            stroke="#5e7950"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="372" y="360" width="36" height="29" rx="3" fill="#f9fcf3" />
            <path d="M372 368H408M379 375H389M379 380H395" />
            <circle cx="377" cy="364" r=".9" fill="#5e7950" stroke="none" />
            <circle cx="381" cy="364" r=".9" fill="#5e7950" stroke="none" />
            <path d="M397 378L412 386L405 389L402 396Z" fill="#cadfb2" />
            <path d="M406 390L411 396" />
          </g>
          <text className="agent-stage-number" x="509" y="350" textAnchor="end">
            02
          </text>
          <text className="agent-stage-title" x="426" y="369">
            Act
          </text>
          <text className="agent-detail" x="426" y="388">
            Tools &amp;
          </text>
          <text className="agent-detail" x="426" y="403">
            environments
          </text>
          <path d="M368 418H510" stroke="#dce5d1" />
          <text className="agent-stage-note" x="439" y="442" textAnchor="middle">
            Put plans into motion
          </text>
        </g>

        {/* Adapt: stored experience and a rising learning curve. */}
        <g className="agent-stage">
          <rect
            className="agent-stage-card"
            x="13"
            y="333"
            width="176"
            height="127"
            rx="14"
            filter="url(#agent-shadow)"
          />
          <rect x="29" y="353" width="49" height="48" rx="11" fill="#edf0dc" />
          <g
            stroke="#5e7950"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="35" y="367" width="31" height="26" rx="3" fill="#dce8c8" />
            <rect x="39" y="363" width="31" height="26" rx="3" fill="#ebf2df" />
            <rect x="43" y="359" width="31" height="26" rx="3" fill="#f9fcf3" />
            <path d="M48 378L54 373L59 375L68 366M63 366H68V371" />
            <path d="M39 397H64" stroke="#9eb087" />
          </g>
          <text className="agent-stage-number" x="171" y="350" textAnchor="end">
            03
          </text>
          <text className="agent-stage-title" x="88" y="369">
            Adapt
          </text>
          <text className="agent-detail" x="88" y="388">
            Feedback &amp;
          </text>
          <text className="agent-detail" x="88" y="403">
            memory
          </text>
          <path d="M30 418H172" stroke="#dce5d1" />
          <text className="agent-stage-note" x="101" y="442" textAnchor="middle">
            Improve the next step
          </text>
        </g>
      </svg>
      <div className="orbit-caption">
        <span className="tiny-cross" aria-hidden="true">
          +
        </span>
        INTELLIGENCE, IN THE LOOP
        <span className="tiny-cross" aria-hidden="true">
          +
        </span>
      </div>
    </div>
  )
}
