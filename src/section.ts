enum TokenType {
  /// The --- symbol
  TripleDash,
  /// The --? symbol
  DoubleDashQuestion,
  /// The --! symbol
  DoubleDashExclamation,
  /// A double newline
  DoubleNewline,
  /// A catch-all for the rest of the data
  Data,
}

interface Token {
  type: TokenType;
  start: number;
  end: number;
}

function lex(text: string): Token[] {
  const tokens: Token[] = [];
  let start = 0;
  let end = 0;
  while (end < text.length) {
    const triple = text.slice(start, start + 3);
    let token;
    if (triple === '---') {
      token = { type: TokenType.TripleDash, start: end, end: end + 3 };
    } else if (triple === '--?') {
      token = {
        type: TokenType.DoubleDashQuestion,
        start: end,
        end: end + 3,
      };
    } else if (triple === '--!') {
      token = {
        type: TokenType.DoubleDashExclamation,
        start: end,
        end: end + 3,
      };
    }
    if (token) {
      tokens.push({type: TokenType.Data, start, end})
      start = token.end;
      end = token.end;
      tokens.push(token);
    } else {
      end += 1;
    }
  }
  return tokens;
}

export class Section {}
