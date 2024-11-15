export const numberToFrenchWords = (num: number): string => {
  const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const tens = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];

  if (num === 0) return 'zéro';
  
  const numStr = num.toString();
  let result = '';
  
  if (num >= 1000) {
    const thousands = Math.floor(num / 1000);
    if (thousands === 1) result += 'mille ';
    else result += numberToFrenchWords(thousands) + ' mille ';
    num %= 1000;
  }
  
  if (num >= 100) {
    const hundreds = Math.floor(num / 100);
    if (hundreds === 1) result += 'cent ';
    else result += units[hundreds] + ' cent ';
    num %= 100;
  }
  
  if (num >= 70 && num <= 79) {
    result += 'soixante-' + teens[num - 70];
  } else if (num >= 90 && num <= 99) {
    result += 'quatre-vingt-' + teens[num - 90];
  } else if (num >= 20) {
    const ten = Math.floor(num / 10);
    result += tens[ten];
    const unit = num % 10;
    if (unit > 0) {
      if (ten === 8) result += '-' + units[unit];
      else result += '-' + units[unit];
    }
  } else if (num >= 10) {
    result += teens[num - 10];
  } else if (num > 0) {
    result += units[num];
  }
  
  return result.trim();
};