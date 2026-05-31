export function generarArchivoCsv(
  encabezados: string[],
  filas: any[][],
): string {
  // 1. Recorremos cada fila de la matriz
  const filasFormateadas = filas.map((fila) => {
    // 2. Recorremos cada celda dentro de esa fila
    const celdasProcesadas = fila.map((celda) => {
      // Si la celda no tiene valor, devolvemos "N/A"
      if (celda === null || celda === undefined || celda === '') {
        return '"N/A"';
      }

      // Convertimos el dato a texto y escapamos comillas dobles
      const celdaString = String(celda).replace(/"/g, '""');

      // Envolvemos obligatoriamente en comillas dobles y RETORNAMOS
      return `"${celdaString}"`;
    });

    // 3. Unimos las celdas procesadas con una coma y RETORNAMOS la fila
    return celdasProcesadas.join(',');
  });

  // 4. Unimos los encabezados y las filas con un salto de línea (\n)
  // El \uFEFF es vital para que Excel lea los acentos de "Córdoba" y "Ríos"
  return '\uFEFF' + [encabezados.join(','), ...filasFormateadas].join('\n');
}
