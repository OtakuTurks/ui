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

/**
 * @typedef {{
 * size?: 'sm' | 'md' | 'lg' | 'xl';
 * variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white';
 * }} OtSpinnerProps
 */

/**
 * @typedef {{
 * isOpen: boolean;
 * position?: 'left' | 'right' | 'top' | 'bottom';
 * size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
 * closeOnOverlay?: boolean;
 * title?: string;
 * }} OtDrawerProps
 */

/**
 * @typedef {{
 * currentPage: number;
 * totalPages: number;
 * siblingCount?: number;
 * }} OtPaginationProps
 */

/**
 * @typedef {{
 * to?: string | object;
 * active?: boolean;
 * }} OtBreadcrumbItemProps
 */

/**
 * @typedef {{
 * modelValue?: string | number;
 * placeholder?: string;
 * disabled?: boolean;
 * error?: boolean;
 * fullWidth?: boolean;
 * rows?: number | string;
 * autoResize?: boolean;
 * maxLength?: number;
 * }} OtTextareaProps
 */

/**
 * @typedef {{
 * modelValue?: number;
 * min?: number;
 * max?: number;
 * step?: number;
 * disabled?: boolean;
 * showValue?: boolean;
 * }} OtSliderProps
 */

/**
 * @typedef {{
 * title: string;
 * description?: string;
 * icon?: string | object;
 * }} OtEmptyStateProps
 */

/**
 * @typedef {{
 * modelValue?: string | number | boolean;
 * value: string | number | boolean;
 * label?: string;
 * disabled?: boolean;
 * }} OtRadioProps
 */

export {}
