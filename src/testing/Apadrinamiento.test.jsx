import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Apadrinamiento from '../pages/Apadrinamiento';
import { describe, expect, test, vi, afterEach, beforeEach } from 'vitest';

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
window.listaAnimalesInicial = [];

// --- (INICIO) CORRECCIÓN CLAVE: Mock "Inteligente" de appendChild ---

// 1. Guardar la función original ANTES de que sea espiada
const originalAppendChild = document.body.appendChild.bind(document.body);

beforeEach(() => {
    // 2. Espiar y reemplazar
    vi.spyOn(document.body, 'appendChild').mockImplementation((node) => {
        // 3. Revisar qué se está añadiendo
        if (node && node.tagName === 'SCRIPT') {
            // SI es un script, simular carga asíncrona
            Promise.resolve().then(() => {
                if (node.onload) {
                    node.onload();
                }
            });
            return node;
        }
        // NO es un script (ej: el div de RTL), llamar a la función original
        return originalAppendChild(node);
    });

    // Mocks de soporte
    vi.spyOn(document, 'querySelector').mockReturnValue(null);
    vi.spyOn(document.body, 'removeChild').mockImplementation(() => { });

    // Reseteos
    localStorageMock.clear();
    window.renderCatalogo.mockClear();
    window.agregarAnimal.mockClear();
    window.listaAnimalesInicial = [];
});

afterEach(() => {
    vi.restoreAllMocks(); // Restaura TODOS los spies, incluyendo appendChild
    cleanup();
});
// --- (FIN) CORRECCIÓN CLAVE ---


// Datos de prueba para los filtros
const mockAnimales = [
    { id: 1, nombre: 'Pudú', categoria: 'terrestre' },
    { id: 2, nombre: 'Delfín', categoria: 'marino' },
    { id: 3, nombre: 'Cóndor', categoria: 'aereo' },
    { id: 4, nombre: 'Zorro', categoria: 'terrestre' }
];

describe('Testing Componente Apadrinamiento', () => {

    // Test 1: Renderizado (Corregido con async/await)
    test('Debe renderizar el título y los botones de filtro', async () => {
        render(<MemoryRouter><Apadrinamiento /></MemoryRouter>);

        // 1. Verificar contenido estático (¡Ahora sí debería aparecer!)
        expect(screen.getByRole('heading', { name: /Apadrina algún animal/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Todos/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Terrestres/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Marinos/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Aéreos/i })).toBeInTheDocument();

        // 2. Esperar a que los efectos asíncronos (useEffect) terminen
        // 1ra llamada: renderCatalogo([]) (estado inicial)
        // 2da llamada: renderCatalogo([]) (después de cargar scripts con listaAnimalesInicial vacía)
        await vi.waitFor(() => {
            expect(window.renderCatalogo).toHaveBeenCalledTimes(2);
        });
    });

    // Test 2: Carga inicial de datos
    test('Debe cargar animales de localStorage y llamar a renderCatalogo con "todos"', async () => {
        localStorageMock.setItem('listaAnimales', JSON.stringify(mockAnimales));
        render(<MemoryRouter><Apadrinamiento /></MemoryRouter>);

        await vi.waitFor(() => {
            // 1. renderCatalogo([]) (estado inicial)
            // 2. renderCatalogo(mockAnimales) (después de cargar scripts y setear estado)
            expect(window.renderCatalogo).toHaveBeenCalledTimes(2);
        });
        expect(window.renderCatalogo).toHaveBeenLastCalledWith(mockAnimales);
    });

    // Test 3: Simulación de Evento (Clic en Filtro "Marinos")
    test('Debe llamar a renderCatalogo con animales filtrados al hacer clic en "Marinos"', async () => {
        const user = userEvent.setup();
        localStorageMock.setItem('listaAnimales', JSON.stringify(mockAnimales));
        render(<MemoryRouter><Apadrinamiento /></MemoryRouter>);

        // Espera carga inicial
        await vi.waitFor(() => {
            expect(window.renderCatalogo).toHaveBeenCalledTimes(2);
        });
        vi.clearAllMocks();

        // El botón ahora sí existe
        await user.click(screen.getByRole('button', { name: /Marinos/i }));

        await vi.waitFor(() => {
            expect(window.renderCatalogo).toHaveBeenCalledTimes(1);
        });

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

        await vi.waitFor(() => expect(window.renderCatalogo).toHaveBeenCalledTimes(2));
        vi.clearAllMocks();

        await user.click(screen.getByRole('button', { name: /Terrestres/i }));

        await vi.waitFor(() => expect(window.renderCatalogo).toHaveBeenCalledTimes(1));

        const animalesTerrestres = [
            { id: 1, nombre: 'Pudú', categoria: 'terrestre' },
            { id: 4, nombre: 'Zorro', categoria: 'terrestre' }
        ];
        expect(window.renderCatalogo).toHaveBeenCalledWith(animalesTerrestres);
    });

});