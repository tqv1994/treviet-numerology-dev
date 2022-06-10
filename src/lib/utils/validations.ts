export function getPasswordStrengthValue(password: string): number {
	let strength = 0;
	if (password.match(/[a-z]+/)) {
		strength += 1;
	}
	if (password.match(/[A-Z]+/)) {
		strength += 1;
	}
	if (password.match(/[0-9]+/)) {
		strength += 1;
	}
	if (password.match(/[$@#$%^&*!]+/)) {
		strength += 1;
	}
	switch (strength) {
		case 0:
			return 0;
		case 1:
			return 25;
		case 2:
			return 50;
		case 3:
			return 70;
		case 4:
			return 100;
		default:
			return 0;
	}
}

export function getPasswordStrengthLabel(password: string): string {
	const value = getPasswordStrengthValue(password);
	if (value <= 100) {
		if (value <= 70) {
			if (value <= 50) {
				if (value <= 25) {
					if (value === 0) {
						return 'rất yếu';
					}
					return 'yếu';
				}
				return 'bình thường';
			}
			return 'mạnh';
		}
		return 'rất mạnh';
	}
	return 'rất yếu';
}

export function getPasswordStrengthType(password: string): 'danger' | 'warning' | 'success' {
	const value = getPasswordStrengthValue(password);
	if (value <= 100) {
		if (value <= 70) {
			if (value <= 50) {
				if (value <= 25) {
					if (value === 0) {
						return 'danger';
					}
					return 'danger';
				}
				return 'warning';
			}
			return 'success';
		}
		return 'success';
	}
	return 'danger';
}
