import "./CustomToolTip.css";
import { cn } from "../../helpers/utils";
import { Button } from "../buttons/Button";

function CustomTooltip(props) {
  const {
    continuous,
    index,
    primaryProps,
    skipProps,
    step,
    tooltipProps,
    size,
    isLastStep,
  } = props;

  return (
    <div
      className={cn(
        "tooltip__body bg-yellowRadial p-6 rounded-2xl shadow-popupYellow relative",
        step.customClass
      )}
      {...tooltipProps}
    >
      {step.customArrow && (
        <div className="clip-path-triangle absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-5 h-7" />
      )}

      <div className="flex-center gap-5 max-w-md">
        <div className="flex flex-col gap-1 ">
          <span className="text-sm">{`${index + 1} / ${size}`}</span>
          {step.title && (
            <h6 className="tooltip__title font-bold ">{step.title}</h6>
          )}
          <div
            className="tooltip__content font-normal text-sm leading-[1.7] mt-1"
            dangerouslySetInnerHTML={{ __html: step.content }}
          ></div>
        </div>

        {step.image && (
          <img
            src={step.image}
            alt="tooltip"
            className="tooltip__image rounded-lg w-34"
            loading="lazy"
          />
        )}
      </div>

      <div className="tooltip__footer flex flex-center justify-end gap-6 mt-5 max-sm:mt-1">
        {!isLastStep && (
          <button className="tooltip__button" {...skipProps}>
            Skip tour
          </button>
        )}
        <div className="tooltip__spacer flex">
          {continuous && (
            <Button
              className="tooltip__button tooltip__button--primary w-[7.5rem]"
              {...primaryProps}
              label={
                isLastStep ? "Got it!" : index === 0 ? "Let's go!" : "Next"
              }
              variant="neutral"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomTooltip;
