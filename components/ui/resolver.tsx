import { PiArrowFatUpBold } from 'react-icons/pi';
import { RxExit } from 'react-icons/rx';
import { FiLock } from 'react-icons/fi';

export const Icons = {
  arrowBigUp: PiArrowFatUpBold,
  exit: RxExit,
  arrowBigUp: PiArrowFatUpBold,
  lock: FiLock,
  play: () => (
    <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_ddi_12731_855)">
        <circle cx="14" cy="13.5" r="12" fill="#1F1F1F" />
      </g>
      <path d="M12.125 10.125L17.375 13.5L12.125 16.875V10.125Z" fill="white" />
      <defs>
        <filter
          id="filter0_ddi_12731_855"
          x="0"
          y="0.5"
          width="28"
          height="28"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_12731_855"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0352941 0 0 0 0 0.0352941 0 0 0 0 0.0431373 0 0 0 0.8 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12731_855" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0352941 0 0 0 0 0.0352941 0 0 0 0 0.0431373 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_12731_855"
            result="effect2_dropShadow_12731_855"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_12731_855"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.75" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="shape" result="effect3_innerShadow_12731_855" />
        </filter>
      </defs>
    </svg>
  ),
  degenchain: ({ className }: { className?: string }) => (
    <svg fill="currentColor" viewBox="0 0 789 668" className={className}>
      <path d="M115.185 411.477L118.367 469.444C118.575 473.392 120.055 477.107 122.552 480.15C140.007 501.282 218.264 575.014 394.616 575.014C570.968 575.014 648.278 502.234 666.38 480.544C669.108 477.27 670.68 473.206 670.934 468.933L674.089 411.517C695.084 399.997 716.758 386.98 716.758 386.98C750.835 368.518 788.866 395.038 788.935 433.936C789.051 496.87 739.877 561.545 673.548 602.301C598.758 648.258 487.117 667.324 394.664 667.324C302.211 667.324 190.57 648.258 115.78 602.301C49.4513 561.545 0.277187 496.893 0.392781 433.936C0.462138 395.038 38.4929 368.518 72.5702 386.98C72.5702 386.98 94.207 399.965 115.185 411.477Z"></path>
      <path d="M394.641 0.113525C538.834 0.113525 577.929 3.48079 636.558 10.2154H636.535C663.561 13.3272 685.224 33.438 683.212 60.6782L661.616 354.872C654.858 356.83 647.488 359.303 639.223 362.077C595.905 376.615 527.997 399.404 394.64 399.404C261.283 399.404 193.376 376.615 150.057 362.077C141.784 359.3 134.407 356.825 127.643 354.866L106.047 60.6782C104.059 33.438 125.652 12.8395 152.724 10.2154C210.637 4.59548 270.932 0.113525 394.641 0.113525ZM137.991 495.835L138.067 496.869L139.557 497.212C139.024 496.748 138.502 496.289 137.991 495.835ZM649.85 497.178L651.193 496.869L651.262 495.928C650.8 496.341 650.329 496.757 649.85 497.178Z"></path>
    </svg>
  ),
};
