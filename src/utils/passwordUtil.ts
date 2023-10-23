const symbolList = [
  '`',
  '~',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '-',
  '=',
  '+',
  '[',
  ']',
  '{',
  '}',
  '\\',
  '|',
  ';',
  ':',
  "'",
  '"',
  '<',
  ',',
  '.',
  '>',
  '/',
  '?',
  '.',
  '~',
  '·',
  '！',
  '@',
  '#',
  '￥',
  '%',
  '…',
  '&',
  '*',
  '（',
  '）',
  '-',
  '—',
  '=',
  '+',
  '【',
  '】',
  '｛',
  '｝',
  '、',
  '｜',
  '；',
  '：',
  '‘',
  '“',
  '，',
  '《',
  '。',
  '》',
  '、',
  '？',
  '｀',
  '～',
  '！',
  '＊',
  '／',
  '＼',
  '［',
  '］',
  '｛',
  '｝',
  '；',
  '：',
  '’',
  '”',
  '《',
  '》',
  '.',
];
const checkPasswordLenScore = (pass: string) => {
  const len = pass?.length;
  let score = 0;
  if (len <= 6) {
    score = 0;
  } else if (len < 10) {
    score = 10;
  } else {
    score = 25;
  }
  return score;
};
const lowercaseScore = (pass: string) => {
  const reg = /[a-z]/;
  let score = 0;
  if (reg.test(pass)) {
    score = 10;
  } else {
    score = 0;
  }
  return score;
};
const uppercaseScore = (pass: string) => {
  const reg = /[A-Z]/;
  let score = 0;
  if (reg.test(pass)) {
    score = 10;
  } else {
    score = 0;
  }
  return score;
};

const numberScore = (pass: string) => {
  let numberTotal = 0;
  for (let i = 0; i < pass.length; i++) {
    const number = pass.charAt(i);

    if (!Number.isNaN(Number(number))) {
      numberTotal++;
    }
  }
  if (numberTotal >= 1 && numberTotal < 3) {
    return 10;
  } else if (numberTotal >= 3) {
    return 20;
  }
  return numberTotal;
};

const symbolScore = (pass: string) => {
  let symbolTotal = 0;
  for (let i = 0; i < pass.length; i++) {
    const number = pass.charAt(i);
    if (symbolList.includes(number)) {
      symbolTotal++;
    }
  }
  if (symbolTotal == 1) {
    return 10;
  } else if (symbolTotal > 1) {
    return 25;
  }
  return symbolTotal;
};

export const getPasswordLevel = (password: string) => {
  if (!password) {
    return 0;
  }
  let result = 0;
  const score = checkPasswordLenScore(password);
  const lowercaseScor = lowercaseScore(password);
  const uppercaseScor = uppercaseScore(password);
  const numberScor = numberScore(password);
  const symbolScor = symbolScore(password);

  result = score + lowercaseScor + uppercaseScor + numberScor + symbolScor;
  if (lowercaseScor != 0 && uppercaseScor != 0 && numberScor != 0 && symbolScor != 0) {
    result += 5;
  } else if ((lowercaseScor != 0 || uppercaseScor != 0) && numberScor != 0 && symbolScor != 0) {
    result += 2;
  }
  // console.log('总得分' + result)
  if (result > 50 && result <= 70) {
    return 2;
  } else if (result > 70) {
    return 3;
  } else {
    return 1;
  }
};
