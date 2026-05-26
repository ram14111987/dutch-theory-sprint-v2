import { useState } from 'react';

function ScanFarMidNearSvg({ step }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 260"
      width="480"
      height="260"
      role="img"
      aria-label="Diagram of the four scanning zones from the driver's seat: far for the horizon, mid for the middle distance, near for immediate area, plus the mirror for traffic behind."
    >
      <rect width="480" height="260" fill="#f4f6fa" />
      <text
        x="240"
        y="30"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="#222"
      >
        Scan: far → mid → near → mirror
      </text>
      <polygon
        points="160,250 320,250 280,90 200,90"
        fill="#dfe7f5"
        stroke="#7a8aa8"
        strokeWidth="2"
      />
      <line
        x1="240"
        y1="90"
        x2="240"
        y2="250"
        stroke="#7a8aa8"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      {step >= 1 && (
        <g>
          <circle cx="240" cy="100" r="6" fill="#1565c0" />
          <text x="248" y="104" fontFamily="Arial, sans-serif" fontSize="13" fill="#1565c0">
            Far (horizon)
          </text>
        </g>
      )}
      {step >= 2 && (
        <g>
          <circle cx="240" cy="160" r="6" fill="#2e7d32" />
          <text x="248" y="164" fontFamily="Arial, sans-serif" fontSize="13" fill="#2e7d32">
            Mid
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <circle cx="240" cy="220" r="6" fill="#ef6c00" />
          <text x="248" y="224" fontFamily="Arial, sans-serif" fontSize="13" fill="#ef6c00">
            Near
          </text>
        </g>
      )}
      {step >= 4 && (
        <g>
          <rect
            x="30"
            y="30"
            width="80"
            height="40"
            rx="6"
            fill="#ffffff"
            stroke="#444"
            strokeWidth="2"
          />
          <text
            x="70"
            y="55"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="13"
            fill="#444"
          >
            Mirror
          </text>
          <path
            d="M70 70 L150 150"
            stroke="#444"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />
        </g>
      )}
    </svg>
  );
}

function TwoSecondRuleSvg({ step }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 220"
      width="480"
      height="220"
      role="img"
      aria-label="Diagram comparing the 2-second following gap in dry conditions with a 4-second gap in wet conditions, both shown as two cars on the same stretch of road."
    >
      <defs>
        <marker
          id="step-reveal-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#222" />
        </marker>
      </defs>
      <rect width="480" height="220" fill="#f4f6fa" />
      <text
        x="240"
        y="40"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="#222"
      >
        The 2-second rule (double in wet)
      </text>
      <rect
        x="20"
        y="80"
        width="440"
        height="80"
        fill="#dfe7f5"
        stroke="#7a8aa8"
        strokeWidth="2"
      />
      <line
        x1="240"
        y1="80"
        x2="240"
        y2="160"
        stroke="#ffffff"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      {step >= 2 && (
        <g>
          <rect x="60" y="100" width="60" height="40" rx="6" fill="#1565c0" />
          <rect x="160" y="100" width="60" height="40" rx="6" fill="#ef6c00" />
          <text
            x="90"
            y="125"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="12"
            fill="#fff"
          >
            You
          </text>
          <text
            x="190"
            y="125"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="12"
            fill="#fff"
          >
            Ahead
          </text>
          <path
            d="M120 175 L160 175"
            stroke="#222"
            strokeWidth="2"
            markerEnd="url(#step-reveal-arrow)"
          />
          <text
            x="140"
            y="195"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="12"
            fill="#222"
          >
            2 s gap (dry)
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="300" y="100" width="40" height="40" rx="6" fill="#1565c0" />
          <rect x="420" y="100" width="40" height="40" rx="6" fill="#ef6c00" />
          <text
            x="320"
            y="125"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="11"
            fill="#fff"
          >
            You
          </text>
          <path
            d="M340 175 L420 175"
            stroke="#222"
            strokeWidth="2"
            markerEnd="url(#step-reveal-arrow)"
          />
          <text
            x="380"
            y="195"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="12"
            fill="#222"
          >
            4 s gap (wet)
          </text>
        </g>
      )}
    </svg>
  );
}

const STEP_SVGS = {
  'hazard-awareness/scan-far-mid-near.svg': ScanFarMidNearSvg,
  'hazard-awareness/two-second-rule.svg': TwoSecondRuleSvg,
};

function StepRevealImage({ image }) {
  const totalSteps = image.steps;
  const stepLabels = image.stepLabels || [];
  const [step, setStep] = useState(1);

  const SvgComponent = STEP_SVGS[image.src];
  if (!SvgComponent) return null;

  const isFinal = step >= totalSteps;
  const currentLabel = stepLabels[step - 1] || '';

  const handleNext = () => {
    if (!isFinal) setStep(step + 1);
  };
  const handleReset = () => setStep(1);

  return (
    <figure className="content-image content-image--lesson step-reveal">
      <div className="step-reveal__svg-wrap">
        <SvgComponent step={step} />
      </div>
      <div className="step-reveal__status" aria-live="polite">
        <span className="step-reveal__counter">
          Step {step} of {totalSteps}
        </span>
        {currentLabel && <span className="step-reveal__label">{currentLabel}</span>}
      </div>
      <div className="step-reveal__controls">
        <button
          type="button"
          className="btn btn--primary step-reveal__btn"
          onClick={handleNext}
          disabled={isFinal}
        >
          Next step
        </button>
        <button
          type="button"
          className="btn step-reveal__btn"
          onClick={handleReset}
          disabled={step === 1}
        >
          Reset
        </button>
      </div>
      {image.caption && (
        <figcaption className="content-image__caption">{image.caption}</figcaption>
      )}
    </figure>
  );
}

export default StepRevealImage;
