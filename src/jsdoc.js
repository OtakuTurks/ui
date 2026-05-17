/**
 * @typedef {'primary' | 'secondary' | 'danger' | 'warning' | 'success'} OtVariant
 */

/**
 * @typedef {'sm' | 'md' | 'lg' | 'xl' | 'full'} OtSize
 */

/**
 * @typedef {{
 * variant?: OtVariant;
 * size?: OtSize;
 * disabled?: boolean;
 * fullWidth?: boolean;
 * startIcon?: string | object;
 * endIcon?: string | object;
 * }} OtButtonProps
 */

/**
 * @typedef {{
 * modelValue: string | number;
 * type?: 'text' | 'password' | 'email' | 'number' | 'search';
 * size?: OtSize;
 * placeholder?: string;
 * disabled?: boolean;
 * error?: boolean;
 * fullWidth?: boolean;
 * adornment?: string | object;
 * }} OtInputProps
 */

/**
 * @typedef {{
 * isOpen: boolean;
 * size?: OtSize;
 * closeOnOverlay?: boolean;
 * closeOnEscape?: boolean;
 * }} OtModalProps
 */

/**
 * @typedef {{
 * variant?: 'info' | 'success' | 'warning' | 'danger';
 * title?: string;
 * dismissible?: boolean;
 * }} OtAlertProps
 */

/**
 * @typedef {{
 * src?: string;
 * initials?: string;
 * size?: OtSize;
 * alt?: string;
 * }} OtAvatarProps
 */

/**
 * @typedef {{
 * content: string | number;
 * variant?: OtVariant;
 * max?: number;
 * showZero?: boolean;
 * dot?: boolean;
 * }} OtBadgeProps
 */

/**
 * @typedef {{
 * modelValue: boolean;
 * label?: string;
 * disabled?: boolean;
 * }} OtCheckboxProps
 */

/**
 * @typedef {{
 * modelValue: boolean;
 * disabled?: boolean;
 * size?: 'sm' | 'md' | 'lg';
 * activeText?: string;
 * inactiveText?: string;
 * }} OtSwitchProps
 */

/**
 * @typedef {{
 * message: string;
 * title?: string;
 * variant?: 'info' | 'success' | 'warning' | 'danger';
 * duration?: number;
 * visible?: boolean;
 * }} OtToastProps
 */

/**
 * @typedef {{
 * multiple?: boolean;
 * }} OtAccordionProps
 */

/**
 * @typedef {{
 * name: string | number;
 * title: string;
 * }} OtAccordionItemProps
 */

export {}
