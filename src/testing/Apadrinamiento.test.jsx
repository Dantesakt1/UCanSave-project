import React from 'react';
import { MemoryRouter } from 'react-router-dom'; 
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Apadrinamiento from '../pages/Apadrinamiento'; // Ajusta la ruta
import { describe, expect, test, vi, afterEach } from 'vitest';

// --- Mock de localStorage ---
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
        clear: vi.fn(() => { store = {}; }),
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// --- Mock de Funciones Globales (Script.js) ---
window.renderCatalogo = vi.fn();
window.agregarAnimal = vi.fn();

// --- Mock de script externo (si es necesario) ---
window.listaAnimalesInicial = [];

// Limpiar después de cada test
afterEach(() => {
    cleanup();
    localStorageMock.clear();
    vi.clearAllMocks(); 
});

// Datos de prueba para los filtros
const mockAnimales = [
    { id: 1, nombre: 'Pudú', categoria: 'terrestre' },
    { id: 2, nombre: 'Delfín', categoria: 'marino' },
    { id: 3, nombre: 'Cóndor', categoria: 'aereo' },
    { id: 4, nombre: 'Zorro', categoria: 'terrestre' }
];

describe('Testing Componente Apadrinamiento', () => {

    // Test 1: Renderizado inicial
    test('Debe renderizar el título y los botones de filtro', () => {
        render(<MemoryRouter><Apadrinamiento /></MemoryRouter>);

        expect(screen.getByRole('heading', { name: /Apadrina algún animal/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Todos/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Terrestres/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Marinos/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Aéreos/i })).toBeInTheDocument();
    });

    // Test 2: Carga inicial de datos (Renderizado de Lista)
    test('Debe cargar animales de localStorage y llamar a renderCatalogo con "todos"', async () => {
        
        localStorageMock.setItem('listaAnimales', JSON.stringify(mockAnimales));
        
        render(<MemoryRouter><Apadrinamiento /></MemoryRouter>);

        // Esperamos a que se completen las llamadas iniciales
        await vi.waitFor(() => {
            // CORRECCIÓN: Debe llamarse al menos una vez (o 2 veces)
            expect(window.renderCatalogo).toHaveBeenCalled(); 
        });

        // Verificamos que la *última* llamada (la del useEffect [filtroActivo, animales])
        // se hizo con TODOS los animales.
        expect(window.renderCatalogo).toHaveBeenLastCalledWith(mockAnimales);
    });

    // Test 3: Simulación de Evento (Clic en Filtro)
    test('Debe llamar a renderCatalogo con animales filtrados al hacer clic en "Marinos"', async () => {
        const user = userEvent.setup();
        localStorageMock.setItem('listaAnimales', JSON.stringify(mockAnimales));

        render(<MemoryRouter><Apadrinamiento /></MemoryRouter>);

        // Esperamos la carga inicial
        await vi.waitFor(() => {
            // CORRECCIÓN: Esperamos 2 llamadas iniciales (una del script.js, una del estado de React)
            expect(window.renderCatalogo).toHaveBeenCalledTimes(2);
        });

        // Limpiamos el contador de llamadas del mock
        vi.clearAllMocks();

        // 2. Simular clic en el filtro "Marinos"
        await user.click(screen.getByRole('button', { name: /Marinos/i }));

        // 3. Verificar
        // Esperamos a que se llame de nuevo (1 vez) por el cambio de estado 'filtroActivo'
        await vi.waitFor(() => {
            expect(window.renderCatalogo).toHaveBeenCalledTimes(1);
        });

        // Verificamos que se llamó SOLO con el animal marino
        const animalesMarinos = [
            { id: 2, nombre: 'Delfín', categoria: 'marino' }
        ];
        expect(window.renderCatalogo).toHaveBeenCalledWith(animalesMarinos);
    });

    // Test 4: Simulación de Evento (Clic en Filtro "Terrestres")
    test('Debe llamar a renderCatalogo con animales filtrados al hacer clic en "Terrestres"', async () => {
        const user = userEvent.setup();
        localStorageMock.setItem('listaAnimales', JSON.stringify(mockAnimales));
        
        render(<MemoryRouter><Apadrinamiento /></MemoryRouter>);
        
        // CORRECCIÓN: Esperamos 2 llamadas iniciales
        await vi.waitFor(() => expect(window.renderCatalogo).toHaveBeenCalledTimes(2));
        vi.clearAllMocks(); // Limpiar

        // 2. Simular clic
        await user.click(screen.getByRole('button', { name: /Terrestres/i }));

        // 3. Verificar (Esperamos 1 nueva llamada)
        await vi.waitFor(() => expect(window.renderCatalogo).toHaveBeenCalledTimes(1));

        const animalesTerrestres = [
            { id: 1, nombre: 'Pudú', categoria: 'terrestre' },
            { id: 4, nombre: 'Zorro', categoria: 'terrestre' }
        ];
        // Verifica que se llamó CON los dos animales terrestres
        expect(window.renderCatalogo).toHaveBeenCalledWith(animalesTerrestres);
    });

});

