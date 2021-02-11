
const numeral = require("numeral");

initLocalId();

class Number 
{

  static random(length = 1)
  {
		if (typeof length !== "number") {
			throw new Error("Invalid length");
		}
		let chars = '0123456789';
		let randomNumbers = '';
    for (let i = length; i > 0; --i) {
			randomNumbers += chars[Math.floor(Math.random() * chars.length)];
		}
    return randomNumbers;
	}

	static currency(params)
	{
		if (!params || !params.amount) {
			throw new Error('Invalid params');
		}
		if (params.locale && typeof params.locale !== "string") {
			throw new Error('Invalid params');
		}
		numeral.locale(params.locale || 'id');

		let formatedCurrency = '';
		if (params.prefix) {
			formatedCurrency += `${params.prefix}`;
		}

		formatedCurrency += `${numeral(params.amount).format('0,00')}`;

		return formatedCurrency;
	}

}

module.exports = Number;

function initLocalId()
{
	if (numeral.locales['id'] === undefined) {
		numeral.register('locale', 'id', {
			delimiters: {
				thousands: '.',
				decimal: ','
			},
			abbreviations: {
				thousand: 'Rb',
				million: 'Jt',
				billion: 'Mil',
				trillion: 'Tril'
			},
			ordinal: function (number) {
				return number === 1 ? 'er' : 'ème';
			},
			currency: {
				symbol: 'Rp'
			}
		});
	}	
}