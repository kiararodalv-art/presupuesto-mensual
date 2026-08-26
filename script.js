let ingresos = JSON.parse(localStorage.getItem('ingresos')) || [];
let categorias = JSON.parse(localStorage.getItem('categorias')) || [];
let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
let metas = JSON.parse(localStorage.getItem('metas')) || [];

const formIngreso = document.querySelector('.form-ingreso');
const inputNombreIngreso = document.querySelector('.input-nombre-ingreso');
const inputCantidadIngreso = document.querySelector('.input-cantidad-ingreso');
const errorIngreso = document.getElementById('error-ingreso');
const listaIngresos = document.getElementById('lista-ingresos');

formIngreso.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nombre = inputNombreIngreso.value.trim();
    const cantidad = Number(inputCantidadIngreso.value);

    if (nombre === '') {
        errorIngreso.textContent = 'Escribe un nombre para el ingreso.';
        return;
    }

    if (inputCantidadIngreso.value === '' || isNaN(cantidad)) {
        errorIngreso.textContent = 'Introduce una cantidad válida.';
        return;
    }

    if (cantidad <= 0) {
        errorIngreso.textContent = 'La cantidad debe ser mayor que 0.';
        return;
    }

    errorIngreso.textContent = '';

    const nuevoIngreso = { nombre: nombre, cantidad: cantidad };
    ingresos.push(nuevoIngreso);
    localStorage.setItem('ingresos', JSON.stringify(ingresos));
    crearFilaIngreso(nuevoIngreso);
    actualizarResumen();

    inputNombreIngreso.value = '';
    inputCantidadIngreso.value = '';
});

function crearFilaIngreso(ingreso) {
    const li = document.createElement('li');
    li.classList.add('item-fila');

    const nombre = document.createElement('span');
    nombre.classList.add('item-nombre');
    nombre.textContent = ingreso.nombre;

    const cantidad = document.createElement('span');
    cantidad.classList.add('item-cantidad');
    cantidad.textContent = ingreso.cantidad.toFixed(2) + '€';

    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('item-eliminar');
    btnEliminar.textContent = '×';
    btnEliminar.addEventListener('click', function () {
        const indice = ingresos.indexOf(ingreso);
        ingresos.splice(indice, 1);
        localStorage.setItem('ingresos', JSON.stringify(ingresos));
        li.remove();
        actualizarResumen();
    });

    li.appendChild(nombre);
    li.appendChild(cantidad);
    li.appendChild(btnEliminar);
    listaIngresos.appendChild(li);
}

function actualizarResumen() {
    const totalIngresos = ingresos.reduce(function (suma, ingreso) {
        return suma + ingreso.cantidad;
    }, 0);

    const totalGastos = gastos.reduce(function (suma, gasto) {
        return suma + gasto.cantidad;
    }, 0);

    document.getElementById('total-ingresos').textContent = totalIngresos.toFixed(2) + '€';
    document.getElementById('total-gastos').textContent = totalGastos.toFixed(2) + '€';

    const balance = totalIngresos - totalGastos;
    const balanceEl = document.getElementById('balance');
    balanceEl.textContent = balance.toFixed(2) + '€';

    if (balance >= 0) {
        balanceEl.classList.add('positivo');
        balanceEl.classList.remove('negativo');
    } else {
        balanceEl.classList.add('negativo');
        balanceEl.classList.remove('positivo');
    }
}

const formCategoria = document.querySelector('.form-categoria');
const inputNuevaCategoria = document.querySelector('.input-nueva-categoria');
const errorCategoria = document.getElementById('error-categoria');
const selectCategoria = document.getElementById('select-categoria');

formCategoria.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nombreCategoria = inputNuevaCategoria.value.trim();

    if (nombreCategoria === '') {
        errorCategoria.textContent = 'Escribe un nombre para la categoría';
        return;
    }

    if (categorias.includes(nombreCategoria)) {
        errorCategoria.textContent = 'Esa categoría ya existe';
        return;
    }

    errorCategoria.textContent = '';
    categorias.push(nombreCategoria);
    localStorage.setItem('categorias', JSON.stringify(categorias));

    const option = document.createElement('option');
    option.value = nombreCategoria;
    option.textContent = nombreCategoria;
    selectCategoria.appendChild(option);

    inputNuevaCategoria.value = '';
});

const formGasto = document.querySelector('.form-gasto');
const inputNombreGasto = document.querySelector('.input-nombre-gasto');
const inputCantidadGasto = document.querySelector('.input-cantidad-gasto');
const errorGasto = document.getElementById('error-gasto');
const listaGastos = document.getElementById('lista-gastos');

formGasto.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nombre = inputNombreGasto.value.trim();
    const cantidad = Number(inputCantidadGasto.value);
    const categoria = selectCategoria.value;

    if (nombre === '') {
        errorGasto.textContent = 'Escribe un nombre para el gasto.';
        return;
    }

    if (inputCantidadGasto.value === '' || isNaN(cantidad)) {
        errorGasto.textContent = 'Introduce una cantidad válida.';
        return;
    }

    if (cantidad <= 0) {
        errorGasto.textContent = 'La cantidad debe ser mayor que 0.';
        return;
    }

    if (categoria === '') {
        errorGasto.textContent = 'Selecciona una categoría.';
        return;
    }

    errorGasto.textContent = '';

    const nuevoGasto = { nombre: nombre, cantidad: cantidad, categoria: categoria };
    gastos.push(nuevoGasto);
    localStorage.setItem('gastos', JSON.stringify(gastos));
    renderizarGastos();
    actualizarGrafico();
    actualizarResumen();

    inputNombreGasto.value = '';
    inputCantidadGasto.value = '';
    selectCategoria.value = '';
});

function renderizarGastos() {
    listaGastos.innerHTML = '';

    categorias.forEach(function (categoria) {
        const gastosDeCategoria = gastos.filter(function (gasto) {
            return gasto.categoria === categoria;
        });

        if (gastosDeCategoria.length === 0) {
            return;
        }

        const grupo = document.createElement('div');
        grupo.classList.add('categoria-grupo');

        const titulo = document.createElement('p');
        titulo.classList.add('categoria-titulo');
        titulo.textContent = categoria;
        grupo.appendChild(titulo);

        gastosDeCategoria.forEach(function (gasto) {
            const fila = document.createElement('div');
            fila.classList.add('item-fila');

            const nombre = document.createElement('span');
            nombre.classList.add('item-nombre');
            nombre.textContent = gasto.nombre;

            const cantidad = document.createElement('span');
            cantidad.classList.add('item-cantidad');
            cantidad.textContent = gasto.cantidad.toFixed(2) + '€';

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('item-eliminar');
            btnEliminar.textContent = '×';
            btnEliminar.addEventListener('click', function () {
                const indice = gastos.indexOf(gasto);
                gastos.splice(indice, 1);
                localStorage.setItem('gastos', JSON.stringify(gastos));
                renderizarGastos();
                actualizarGrafico();
                actualizarResumen();
            });

            fila.appendChild(nombre);
            fila.appendChild(cantidad);
            fila.appendChild(btnEliminar);
            grupo.appendChild(fila);
        });

        listaGastos.appendChild(grupo);
    });
}

let grafico = null;

function actualizarGrafico() {
    const totalesPorCategoria = categorias.map(function (categoria) {
        return gastos
            .filter(function (gasto) {
                return gasto.categoria === categoria;
            })
            .reduce(function (suma, gasto) {
                return suma + gasto.cantidad;
            }, 0);
    });

    const ctx = document.getElementById('grafico-gastos');

    if (grafico !== null) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categorias,
            datasets: [{
                data: totalesPorCategoria,
                backgroundColor: ['#8f6b76', '#5c8a6e', '#a15d5d', '#6b7a8f', '#8f8a6b', '#7a6b8f']
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

const formMeta = document.querySelector('.form-meta');
const inputNombreMeta = document.querySelector('.input-nombre-meta');
const inputObjetivoMeta = document.querySelector('.input-objetivo-meta');
const errorMeta = document.getElementById('error-meta');
const listaMetas = document.getElementById('lista-metas');

formMeta.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nombre = inputNombreMeta.value.trim();
    const objetivo = Number(inputObjetivoMeta.value);

    if (nombre === '') {
        errorMeta.textContent = 'Escribe un nombre para la meta.';
        return;
    }

    if (inputObjetivoMeta.value === '' || isNaN(objetivo)) {
        errorMeta.textContent = 'Introduce una cantidad objetivo válida.';
        return;
    }

    if (objetivo <= 0) {
        errorMeta.textContent = 'El objetivo debe ser mayor que 0.';
        return;
    }

    errorMeta.textContent = '';

    const nuevaMeta = { nombre: nombre, objetivo: objetivo, ahorrado: 0 };
    metas.push(nuevaMeta);
    localStorage.setItem('metas', JSON.stringify(metas));
    renderizarMetas();

    inputNombreMeta.value = '';
    inputObjetivoMeta.value = '';
});

function renderizarMetas() {
    listaMetas.innerHTML = '';

    metas.forEach(function (meta) {
        const card = document.createElement('div');
        card.classList.add('meta-card');

        const header = document.createElement('div');
        header.classList.add('meta-header');

        const nombre = document.createElement('p');
        nombre.classList.add('meta-nombre');
        nombre.textContent = meta.nombre;

        const cifras = document.createElement('p');
        cifras.classList.add('meta-cifras');
        cifras.textContent = meta.ahorrado.toFixed(2) + '€ / ' + meta.objetivo.toFixed(2) + '€';

        header.appendChild(nombre);
        header.appendChild(cifras);

        const barraFondo = document.createElement('div');
        barraFondo.classList.add('meta-barra-fondo');

        const barraProgreso = document.createElement('div');
        barraProgreso.classList.add('meta-barra-progreso');
        const porcentaje = Math.min((meta.ahorrado / meta.objetivo) * 100, 100);
        barraProgreso.style.width = porcentaje + '%';

        barraFondo.appendChild(barraProgreso);

        const acciones = document.createElement('div');
        acciones.classList.add('meta-acciones');

        const btnAnadir = document.createElement('button');
        btnAnadir.classList.add('meta-btn');
        btnAnadir.textContent = '+ Añadir';
        btnAnadir.addEventListener('click', function () {
            const cantidad = prompt('¿Cuánto quieres añadir a "' + meta.nombre + '"?');
            const numero = Number(cantidad);

            if (cantidad !== null && !isNaN(numero) && numero > 0) {
                meta.ahorrado = meta.ahorrado + numero;
                localStorage.setItem('metas', JSON.stringify(metas));
                renderizarMetas();
            }
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('meta-btn');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', function () {
            const indice = metas.indexOf(meta);
            metas.splice(indice, 1);
            localStorage.setItem('metas', JSON.stringify(metas));
            renderizarMetas();
        });

        acciones.appendChild(btnAnadir);
        acciones.appendChild(btnEliminar);

        card.appendChild(header);
        card.appendChild(barraFondo);
        card.appendChild(acciones);
        listaMetas.appendChild(card);
    });
}

ingresos.forEach(function (ingreso) {
    crearFilaIngreso(ingreso);
});

renderizarGastos();
actualizarGrafico();
renderizarMetas();
actualizarResumen();

categorias.forEach(function (categoria) {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    selectCategoria.appendChild(option);
});