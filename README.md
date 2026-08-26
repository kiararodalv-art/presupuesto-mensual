# Presupuesto

Una herramienta de gestión de presupuesto mensual construida con JavaScript vanilla, HTML y CSS — sin frameworks, con Chart.js como única librería externa para visualización de datos.

## Sobre el proyecto

Este proyecto nació con un objetivo concreto: practicar validación de formularios robusta, algo que mis proyectos anteriores apenas tocaban. Permite registrar ingresos y gastos organizados por categorías personalizables, definir metas de ahorro con seguimiento visual del progreso, y ver de un vistazo cómo se distribuyen los gastos por categoría en un gráfico de tarta.

## Funcionalidades

- Registro de ingresos y gastos con validación completa (campos vacíos, valores no numéricos, cantidades negativas)
- Categorías de gasto personalizables, creadas por el usuario, sin duplicados
- Balance calculado en tiempo real, con color según sea positivo o negativo
- Metas de ahorro con barra de progreso animada
- Gráfico de tarta (Chart.js) con la distribución de gastos por categoría
- Persistencia completa de datos con `localStorage`
- Layout responsive de dos columnas

## Tecnologías

- JavaScript (vanilla)
- HTML5
- CSS3 (CSS Grid)
- Chart.js

## Qué aprendí

- Validación de formularios con mensajes de error específicos por caso
- Los métodos `.filter()`, `.map()` y `.reduce()` de array, y cómo combinarlos para agrupar y calcular totales
- Integración de una librería externa (Chart.js) y su ciclo de vida (crear, destruir y volver a dibujar un gráfico al cambiar los datos)
- CSS Grid para layouts de varias columnas con comportamiento responsive
- Gestión de múltiples estructuras de datos relacionadas entre sí (ingresos, gastos, categorías, metas) persistidas juntas en `localStorage`

## Cómo usar

Pruébalo aquí: [https://kiararodalv-art.github.io/presupuesto-mensual/](https://kiararodalv-art.github.io/presupuesto-mensual/)

---

Hecho por Kiara Álvarez