interface iReg {
    small: RegExp;
    capital: RegExp;
    numeric: RegExp;
    special: RegExp;
}
interface iValidator {
    valid: boolean;
    error: iValidatorError;
    first: string;
}
interface iValidatorOptions {
    min?: number;
    max?: number;
    small?: boolean;
    capital?: boolean;
    numeric?: boolean;
    special?: RegExp;
    pattern?: RegExp;
    require?: boolean;
}
export interface iValidatorError {
    require?: string;
    small?: string;
    capital?: string;
    numeric?: string;
    special?: string;
    min?: string;
    max?: string;
    pattern?: string;
}

const reg: iReg = {
    small: new RegExp(/[a-z]+/),
    capital: new RegExp(/[A-Z]+/),
    numeric: new RegExp(/[0-9]+/),
    special: new RegExp(/[@_-]+/),
};

/**
 * Validator
 * -----------
 * fullstack input validation
 * @param name fieldName
 * @param value fieldValue
 * @param options validationOptions
 * @returns vaild, error, firstError as first
 */
export default function validator(
    name: string,
    value: string,
    options: iValidatorOptions
): iValidator {
    const { min, max, small, capital, numeric, special, pattern, require } =
        options;

    // errors holder
    const error: iValidatorError = {};

    // start validation
    if (require && !value) {
        error.require = `${name} is required!`;
    }
    if (small && !value.match(reg.small)) {
        error.small = `${name} needs a small letter.`;
    }
    if (capital && !value.match(reg.capital)) {
        error.capital = `${name} needs a capital letter.`;
    }
    if (numeric && !value.match(reg.numeric)) {
        error.numeric = `${name} needs a numeric letter.`;
    }
    if (special && !value.match(special)) {
        error.special = `${name} needs a special letter.`;
    }
    if (min && value.length < min) {
        error.min = `${name} is too short.`;
    }
    if (max && value.length > max) {
        error.max = `${name} is too big.`;
    }
    if (pattern && !value.match(pattern)) {
        error.pattern = `${name} is invalid.`;
    }

    // return object
    const errorArray: Array<[string, string]> = Object.entries(error);
    const valid: boolean = errorArray.length === 0;
    const first: string = valid ? "" : errorArray[0][1];

    return { valid, error, first };
}
