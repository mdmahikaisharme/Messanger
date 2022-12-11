/**
 * cls - className
 * ---------------
 * @param classes class names
 * @returns string of class name
 */
export default function cls(...classes: Array<string>) {
	return classes.join(" ").trim();
}
