// lib/sri.ts

export const generarClaveAcceso = (
  fecha: Date,        // Objeto Date de JS
  tipoComprobante: string, // '06' (Guía de Remisión)
  ruc: string,        // 13 dígitos
  ambiente: string,   // '1' pruebas, '2' producción
  serie: string,      // '001001'
  secuencial: string, // '000000001'
  tipoEmision: string // '1' (Normal)
) => {
  // Formatear fecha a ddmmaa
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear().toString().slice(-2);
  const fechaStr = `${dia}${mes}${anio}`;

  const cadena = `${fechaStr}${tipoComprobante}${ruc}${ambiente}${serie}${secuencial}${fechaStr}${tipoEmision}`;
  
  // Módulo 11
  const dv = calcularModulo11(cadena);
  return cadena + dv;
};

const calcularModulo11 = (clave: string): string => {
  let multiplicador = 2;
  let suma = 0;
  for (let i = clave.length - 1; i >= 0; i--) {
    suma += parseInt(clave[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const residuo = suma % 11;
  const digito = 11 - residuo;
  if (digito === 11) return '0';
  if (digito === 10) return '1';
  return digito.toString();
};