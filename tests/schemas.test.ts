import { describe, expect, it } from 'vitest';
import { checkoutSchema } from '@/app/[locale]/components/CheckoutForm/checkoutSchema';
import { createRegisterSchema } from '@/app/[locale]/components/RegisterForm/registerSchema';

const t = (key: string) => key;

const order = {
	name: 'Ion',
	surname: 'Popescu',
	email: 'ion@example.com',
	phone: '61033551',
	paymentType: 'cash' as const,
	city: 'Chisinau',
	street: 'Stefan cel Mare 1',
};

describe('checkoutSchema', () => {
	it('accepts a cash order without SRL', () => {
		expect(checkoutSchema(t).safeParse(order).success).toBe(true);
	});

	it('requires SRL of 5..80 chars for a bank transfer', () => {
		const schema = checkoutSchema(t);
		const short = schema.safeParse({ ...order, paymentType: 'transfer', SRL: 'abc' });
		expect(short.success).toBe(false);
		expect(short.error?.issues[0].path).toEqual(['SRL']);
		expect(schema.safeParse({ ...order, paymentType: 'transfer', SRL: 'SRL Company' }).success).toBe(true);
	});

	it('rejects a phone that is not 8 digits', () => {
		expect(checkoutSchema(t).safeParse({ ...order, phone: '123' }).success).toBe(false);
	});
});

describe('registerSchema', () => {
	it('reports mismatched passwords on confirmPassword', () => {
		const res = createRegisterSchema(t).safeParse({
			name: 'Ion',
			surname: 'Popescu',
			email: 'ion@example.com',
			phone: '61033551',
			password: 'secret1',
			confirmPassword: 'secret2',
			locale: 'ru',
		});
		expect(res.success).toBe(false);
		expect(res.error?.issues[0]).toMatchObject({ path: ['confirmPassword'], message: 'passwordsDontMatch' });
	});
});
