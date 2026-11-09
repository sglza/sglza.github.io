// Mask a one-pixel gradient to the outer contour, including the border.
// A ring keeps the corners continuous without detached inset-shadow tips.
// Size the face to the border box and prevent tiling into its transparent border.
// Nested controls share this face without adding another cast shadow.
export const controlFaceClassName =
  "border-transparent bg-origin-border bg-no-repeat bg-clip-border not-dark:bg-clip-border bg-[image:var(--control-surface)] before:pointer-events-none before:absolute before:-inset-px before:rounded-[inherit] before:p-px before:bg-[linear-gradient(180deg,var(--control-edge-top),transparent_50%,var(--control-edge-bottom))] before:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)] focus-visible:before:opacity-0 has-focus-visible:before:opacity-0 aria-invalid:before:opacity-0 has-aria-invalid:before:opacity-0";

// Keep the outer shadow in Tailwind's shadow channel so focus rings compose.
// The registry dependency installs these tokens even without the full theme.
export const controlSurfaceClassName = [
  controlFaceClassName,
  "shadow-(--control-shadow)",
].join(" ");

// Preserve the approved rounded button lighting independently of field edges.
export const controlButtonSurfaceClassName = [
  controlSurfaceClassName,
  "before:p-0 before:bg-none before:[mask:none] before:inset-shadow-[0_1px_var(--control-edge-top),0_-1px_var(--control-edge-bottom)]",
].join(" ");

// Native inputs cannot paint ::before. Fixed-size OTP slots draw the bevel on
// their own borderless face; focus, invalid and disabled states supply a border.
export const controlNativeInputSurfaceClassName =
  "border-0 bg-origin-border bg-no-repeat bg-clip-border not-dark:bg-clip-border bg-[image:var(--control-surface)] shadow-(--control-shadow) inset-shadow-[0_1px_var(--control-edge-top),0_-1px_var(--control-edge-bottom)] focus-visible:border focus-visible:inset-shadow-none aria-invalid:border aria-invalid:inset-shadow-none disabled:border data-disabled:border";

// Outlined faces let their surrounding surface show through.
export const controlOutlineSurfaceClassName =
  "bg-none shadow-(--control-shadow)";

export const controlSolidSurfaceClassName =
  "[--control-surface:var(--control-solid-surface)] [--control-edge-top:var(--control-solid-edge-top)] [--control-edge-bottom:var(--control-solid-edge-bottom)] [--control-disabled-border:transparent]";

// Pressing lowers the cast shadow while the face, border and bevel stay put.
// Persistent toggles also expose data-pressed; their selected fills stay local.
export const controlPressableClassName =
  "active:shadow-none data-pressed:shadow-none";

export const controlDisabledClassName =
  "disabled:border-[color:var(--control-disabled-border,var(--input))] disabled:bg-none disabled:shadow-none disabled:inset-shadow-none disabled:before:opacity-0 data-disabled:border-[color:var(--control-disabled-border,var(--input))] data-disabled:bg-none data-disabled:shadow-none data-disabled:inset-shadow-none data-disabled:before:opacity-0 in-data-disabled:before:opacity-0";

// Fields expose their disabled state on the inner input instead of the wrapper.
export const controlFieldClassName =
  "has-disabled:border-input has-disabled:bg-none has-disabled:shadow-none has-disabled:inset-shadow-none has-disabled:before:opacity-0";

// Movable knobs use a light face in either theme. Menu switches expose their
// disabled state on the containing item, rather than on the visual thumb.
export const controlThumbClassName = [
  controlSurfaceClassName,
  controlDisabledClassName,
  "bg-primary-foreground data-dragging:shadow-none in-data-disabled:border-input in-data-disabled:bg-none in-data-disabled:shadow-none in-data-disabled:inset-shadow-none",
].join(" ");

export const controlSwitchTrackClassName =
  "inline-flex h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] shrink-0 items-center rounded-full p-px transition-[background-color,box-shadow] duration-200 data-checked:bg-primary data-unchecked:bg-muted-alpha data-checked:not-disabled:not-data-disabled:active:bg-primary-pressed data-unchecked:not-disabled:not-data-disabled:active:bg-muted-pressed-alpha [[data-slot$=-checkbox-item][data-checked]:not([data-disabled]):active_&]:bg-primary-pressed [[data-slot$=-checkbox-item]:not([data-checked],[data-disabled]):active_&]:bg-muted-pressed-alpha";

// Borderless switch knobs retain a bevel to describe their rounded profile.
export const controlSwitchThumbClassName = [
  controlThumbClassName,
  "before:hidden inset-shadow-[0_1px_var(--switch-thumb-highlight),0_-1px_var(--switch-thumb-shade)] in-[[role=switch]:active,[data-slot$=-checkbox-item]:active,[data-slot=label]:active,[data-slot=field-label]:active]:shadow-none",
  "pointer-events-none block aspect-square h-full origin-left rounded-(--thumb-size) will-change-transform [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s] rtl:origin-right",
].join(" ");

// Badges are flat labels by default; their button/link renderings are controls.
export const controlInteractiveSurfaceClassName =
  "[button&,a&]:border-transparent [button&,a&]:bg-origin-border [button&,a&]:bg-no-repeat [button&,a&]:bg-clip-border [button&,a&]:bg-[image:var(--control-surface)] [button&,a&]:before:pointer-events-none [button&,a&]:before:absolute [button&,a&]:before:-inset-px [button&,a&]:before:rounded-[inherit] [button&,a&]:before:inset-shadow-[0_1px_var(--control-edge-top),0_-1px_var(--control-edge-bottom)] [button&,a&]:focus-visible:before:opacity-0 [button&,a&]:shadow-(--control-shadow) [button&,a&]:active:shadow-none [button&,a&]:data-pressed:shadow-none [button&,a&]:disabled:border-[color:var(--control-disabled-border,var(--input))] [button&,a&]:disabled:bg-none [button&,a&]:disabled:shadow-none [button&,a&]:disabled:inset-shadow-none [button&,a&]:disabled:before:opacity-0 [button&,a&]:data-disabled:border-[color:var(--control-disabled-border,var(--input))] [button&,a&]:data-disabled:bg-none [button&,a&]:data-disabled:shadow-none [button&,a&]:data-disabled:inset-shadow-none [button&,a&]:data-disabled:before:opacity-0";
