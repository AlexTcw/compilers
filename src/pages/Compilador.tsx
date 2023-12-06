class Lexer {
    private input: string;
    private position: number = 0;
  
    constructor(input: string) {
      this.input = input;
    }
  
    public getNextToken(): string | null {
      while (this.position < this.input.length) {
        const currentChar = this.input[this.position];
  
        if (currentChar === ' ') {
          this.position++;
          continue;
        }
  
        if (currentChar.match(/[0-9]/)) {
          let number = '';
  
          while (
            this.position < this.input.length &&
            this.input[this.position].match(/[0-9.]/)
          ) {
            number += this.input[this.position];
            this.position++;
          }
  
          return number;
        }
  
        if (currentChar === '+' || currentChar === '-' || currentChar === '*' || currentChar === '/') {
          this.position++;
          return currentChar;
        }
  
        if (currentChar === '=') {
          this.position++;
          return '=';
        }
  
        if (currentChar === 'x') {
          this.position++;
          return 'x';
        }
  
        throw new Error(`Carácter no válido: ${currentChar}`);
      }
  
      return null;
    }
  }
  
  export default function parseEquation(input: string) {
    const lexer = new Lexer(input);
  
    // Coeficientes de la ecuación cuadrática
    let a = 0;
    let b = 0;
    let c = 0;
  
    let token: string | null;
  
    // Analizador sintáctico
    while ((token = lexer.getNextToken())) {
      if (token === 'x^2') {
        a = 1;
      } else if (token === 'x') {
        b = 1;
      } else if (token === '=') {
        token = lexer.getNextToken();
        if (token === '0') {
          c = 0;
        } else if ((token as string).match(/^-?\d+(\.\d+)?$/)) {
          c = parseFloat(token as string);
        } else {
          throw new Error(`Error de sintaxis: ${token}`);
        }
      } else if (token === '+') {
        // Sumar
        token = lexer.getNextToken();
        if (token === 'x') {
          b++;
        } else if (token === 'x^2') {
          a++;
        } else if ((token as string).match(/^-?\d+(\.\d+)?$/)) {
          c += parseFloat(token as string);
        } else {
          throw new Error(`Error de sintaxis: ${token}`);
        }
      } else if (token === '-') {
        // Restar
        token = lexer.getNextToken();
        if (token === 'x') {
          b--;
        } else if (token === 'x^2') {
          a--;
        } else if ((token as string).match(/^-?\d+(\.\d+)?$/)) {
          c -= parseFloat(token as string);
        } else {
          throw new Error(`Error de sintaxis: ${token}`);
        }
      } else {
        throw new Error(`Error de sintaxis: ${token}`);
      }
    }
  
    // Calcula las soluciones
    const discriminant = b * b - 4 * a * c;
    const solutions: number[] = [];
  
    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      solutions.push(x1, x2);
    } else if (discriminant === 0) {
      const x1 = -b / (2 * a);
      solutions.push(x1);
    }
  
    return solutions;
  }
  
  const input = 'x^2 - 3x + 2 = 0';
  const result = parseEquation(input);
  console.log(`Soluciones: ${result}`);
  