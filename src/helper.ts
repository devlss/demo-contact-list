export function debounce(fn: Function, ms = 1000, leading = false) {
	let timeout: NodeJS.Timeout;
	let idle = false;
	return async (...args: unknown[]) => {
		const callFn = fn.bind(null, ...args);
		clearTimeout(timeout);
		if (leading) {
			if (!idle) {
				await callFn();
				idle = true;
			}
			timeout = setTimeout(() => {
				idle = false;
			}, ms);
		} else {
			timeout = setTimeout(callFn, ms);
		}
	};
}

export function throttle(fn: Function, ms = 1000) {
	let idle = false;
	let cache: unknown[];
	return async (...args: unknown[]) => {
		cache = args;
		if (!idle) {
			await fn(...cache);
			idle = true;
			setTimeout(() => {
				idle = false;
				fn(...cache);
			}, ms);
		}
	};
}
