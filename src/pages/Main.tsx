import { useState } from "react";
import InputForm from "../components/inputs/InputForm";
import { Button } from "react-bootstrap";
import Alert from "../components/notification/Alert";
import {toaster } from "rsuite";
import CardC from "../components/CustomCard/CardC";
import CustomModal from "../components/modal/CustomModal";
import Layout from "../components/CustomCard/Layout";
import { sqrt } from 'mathjs';

export default function Main() {
  const [ecuacion, setEcuacion] = useState<string>("");
  const [result, setResult] = useState<Array<number | Complex>>([]);
  const [show, setShow]= useState<boolean>(false);

  //
  class Lexer {
    private input: string;
    private position: number = 0;

    constructor(input: string) {
      this.input = input;
    }

    public getNextToken(): string | null {
      while (this.position < this.input.length) {
        const currentChar = this.input[this.position];

        if (currentChar === " ") {
          this.position++;
          continue;
        }

        if (currentChar.match(/[0-9]/)) {
          let number = "";

          while (
            this.position < this.input.length &&
            this.input[this.position].match(/[0-9.]/)
          ) {
            number += this.input[this.position];
            this.position++;
          }

          return number;
        }

        if (
          currentChar === "+" ||
          currentChar === "-" ||
          currentChar === "*" ||
          currentChar === "/"
        ) {
          this.position++;
          return currentChar;
        }

        if (currentChar === "=") {
          this.position++;
          return "=";
        }

        if (currentChar === "x") {
          this.position++;
          if (
            this.position < this.input.length &&
            this.input[this.position] === "^"
          ) {
            this.position++;
            let exponent = "x^";
            while (
              this.position < this.input.length &&
              this.input[this.position].match(/[0-9]/)
            ) {
              exponent += this.input[this.position];
              this.position++;
            }
            return exponent;
          }
          return "x";
        }

        //throw new Error(`Carácter no válido: ${currentChar}`);
        toaster.push( 
          Alert({ type: "warning", message: `Carácter no válido: ${currentChar}` }),
          { placement: "topEnd" }
      );

      }

      return null;
    }
  }

  interface Complex {
    real: number;
    imag: number;
  }
  
  function add(a: number | Complex, b: number | Complex): number | Complex {
    if (typeof a === 'number' && typeof b === 'number') {
      // Suma de dos números reales
      return a + b;
    } else if (typeof a === 'object' && typeof b === 'object') {
      // Suma de dos números complejos
      return {
        real: a.real + b.real,
        imag: a.imag + b.imag,
      };
    } else {
      // En cualquier otro caso, devuelve un valor no válido o maneja el error según sea necesario
      throw new Error('Tipos no compatibles para la suma.');
    }
  }
  
  function solveQuadratic(a: number, b: number, c: number): { root1: number | Complex; root2: number | Complex } | null {
    const discriminant = b ** 2 - 4 * a * c;
  
    if (discriminant >= 0) {
      const sqrtDiscriminant = Math.sqrt(discriminant);
  
      const root1 = add((-b + sqrtDiscriminant) / (2 * a), 0);
      const root2 = add((-b - sqrtDiscriminant) / (2 * a), 0);
  
      return { root1, root2 };
    } else {
      const realPart = -b / (2 * a);
      const imagPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);
  
      const root1 = { real: realPart, imag: imagPart };
      const root2 = { real: realPart, imag: -imagPart };
  
      return { root1, root2 };
    }
  }
  
  function parseEquation(input: string) {
    const formattedInput = input.replace(/\s/g, ""); // Elimina espacios en blanco
  
    const equationRegex = /^([-+]?[0-9]*\.?[0-9]*)?\*?x\^2([-+][0-9]*\.?[0-9]*)\*?x([-+]?[0-9]*\.?[0-9]*)=0$/;
  
    const match = formattedInput.match(equationRegex);
  
    const parts = formattedInput.split('=');
  
    if (parts.length !== 2 && formattedInput !== "") {
      toaster.push(
        Alert({ type: "warning", message: 'La ecuación debe tener un signo igual "="' }),
        { placement: "topEnd" }
      );
    }
  
    if (!match && formattedInput !== "") {
      toaster.push(
        Alert({ type: "warning", message: 'La ecuación debe tener la forma "ax^2 + bx + c = 0"' }),
        { placement: "topEnd" }
      );
      if (!formattedInput.includes('^')) {
        toaster.push(
          Alert({ type: "warning", message: 'La ecuación no incluye "^"' }),
          { placement: "topEnd" }
        );
      }
      if (!formattedInput.includes('^2')) {
        toaster.push(
          Alert({ type: "warning", message: 'La ecuación debe ser cuadrática' }),
          { placement: "topEnd" }
        );
      }
    }
  
    const solutions: (number | Complex)[] = [];
  
    if (match && formattedInput) {
      const a = match[1] ? parseFloat(match[1]) : 1;
      const bMatch = match[2];
      const b = bMatch ? parseFloat(bMatch) : a === 1 ? 0 : 1;
      const c = parseFloat(match[3]);
  
      if (isNaN(c)) {
        toaster.push(
          Alert({ type: "warning", message: 'El coeficiente c debe ser un número válido.' }),
          { placement: "topEnd" }
        );
      }
  
      const discriminant = b * b - 4 * a * c;
  
      if (discriminant >= 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        solutions.push(x1, x2);
      } else {
        const realPart = -b / (2 * a);
        const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);
        const solution1: Complex = { real: realPart, imag: imaginaryPart };
        const solution2: Complex = { real: realPart, imag: -imaginaryPart };
        solutions.push(solution1, solution2);
      }
    } else {
      toaster.push(
        Alert({ type: "warning", message: 'Por favor ingrese una ecuación' }),
        { placement: "topEnd" }
      );
    }
  
    return solutions;
  }
  
  

  //const input = 'x^2 - 3x + 2 = 0';
  const handleSummmit = () => {
    const resulta= parseEquation(ecuacion);
    //setResult(resulta);
   if(resulta.length>0){ 
    setShow(true);
    setResult(resulta);
    console.log(show,'soif')
    
  }
    console.log(ecuacion, "ecuacion ");
    console.log(`Soluciones: ${resulta}`);
    console.log(show,"elshow")
  };

  //

  const handleOnChange = (e: any) => {
    setEcuacion(e.target.value);
  };

  return (
    <>
    <Layout>
    <CardC title="Calculadora de ecuaciones de segundo grado" shadow="lg" backgroundColor="dark">
      <InputForm
        placeholder="Escriba la ecuación"
        name="name"
        type="text"
        value={ecuacion}
        onChangeMethod={handleOnChange}
      />
      <div className="mt-4 container text-center mb-2">
      <Button onClick={handleSummmit} className="my-1 my-md-0 bg-info text-dark ">
        Calcular
      </Button>
      </div>
      <CustomModal solucion={result} show={show} setShow={setShow}/>
      </CardC>
      </Layout>
    </>
  );
}
