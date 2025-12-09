import React from 'react';
import { MemoryRouter } from 'react-router-dom'; 
import { render, screen, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminAnimales from '../pages/AdminAnimales'; 
import { describe, expect, test, vi, afterEach } from 'vitest';

// --- Mocks de localStorage ---
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => {
            store[key] = value.toString();
        }),
        clear: vi.fn(() => {
            store = {};
        }),
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
window.confirm = vi.fn(() => true); 
window.listaAnimalesInicial = [];

afterEach(() => {
    cleanup();
    localStorageMock.clear();
    vi.clearAllMocks(); 
});

describe('Testing Componente AdminAnimales', () => {

    // Test 1: Renderizado
    test('Debe renderizar la página de admin y la tabla vacía', () => {
        render(<MemoryRouter><AdminAnimales /></MemoryRouter>);
        expect(screen.getByRole('heading', { name: /¡Animales!/i })).toBeInTheDocument();
        const tbody = screen.getByRole('table').querySelector('tbody');
        expect(tbody.rows.length).toBe(0); 
    });

    // Test 2: Carga de Datos
    test('Debe cargar y mostrar animales desde localStorage', async () => {
        const mockAnimales = [{ id: 1, nombre: 'Panchito', especie: 'Pudú', precio: 5000, categoria: 'terrestre', img: 'pudu.jpg' }];
        localStorageMock.setItem('listaAnimales', JSON.stringify(mockAnimales));
        render(<MemoryRouter><AdminAnimales /></MemoryRouter>);
        expect(await screen.findByText('Panchito')).toBeInTheDocument();
        expect(screen.getByText('$5.000')).toBeInTheDocument(); 
    });

    // Test 3: Agregar un nuevo animal
    test('Debe agregar un animal y mostrarlo en la tabla', async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter>
                <AdminAnimales />
            </MemoryRouter>
        );

        // 1. Abrir el modal
        await user.click(screen.getByRole('button', { name: /Agregar Animal/i }));
        const modal = screen.getByRole('heading', { name: /Agregar Animal/i }).closest('div.modal');
        expect(modal).toBeInTheDocument(); 

        // 2. Llenar el formulario
        const textInputs = within(modal).getAllByRole('textbox');
        const numberInput = within(modal).getByRole('spinbutton'); 
        const selectInput = within(modal).getByRole('combobox'); 
        
        await user.type(textInputs[0], 'Nuevo Pudú');
        await user.type(textInputs[1], 'Pudu puda');
        await user.selectOptions(selectInput, 'terrestre');
        await user.clear(numberInput); 
        await user.type(numberInput, '7500'); 

        await user.type(textInputs[2], 'Peligroso'); 
        await user.type(textInputs[3], 'Rescatado'); 
        await user.type(textInputs[4], 'img.jpg'); 
        
        // 3. Guardar
        await user.click(within(modal).getByRole('button', { name: /Guardar/i }));

        // 4. Verificar
        expect(screen.queryByRole('heading', { name: /Agregar Animal/i })).not.toBeInTheDocument();
        expect(await screen.findByText('Nuevo Pudú')).toBeInTheDocument();
        expect(screen.getByText('$7.500')).toBeInTheDocument(); 
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'listaAnimales', 
            expect.stringContaining('7500') 
        );
    });
    
    // Test 4: Editar un animal 
    test('Debe editar un animal', async () => {
        const user = userEvent.setup();
        const mockAnimales = [
            { id: 1, nombre: 'Panchito', especie: 'Pudú', precio: 5000, categoria: 'terrestre', img: 'pudu.jpg', peligro: 'Caza', rescate: 'Encontrado herido' }
        ];
        localStorageMock.setItem('listaAnimales', JSON.stringify(mockAnimales));
        render(<MemoryRouter><AdminAnimales /></MemoryRouter>);
        
        expect(await screen.findByText('Panchito')).toBeInTheDocument();
        
        // 2. Click en Editar
        await user.click(screen.getByRole('button', { name: /Editar/i }));
        
        // 3. Verificar modal
        const modal = await screen.findByRole('heading', { name: /Editar Animal/i });
        const modalContainer = modal.closest('div.modal');

        // 4. Llenar TODOS los campos
        const textInputs = within(modalContainer).getAllByRole('textbox');
        const numberInput = within(modalContainer).getByRole('spinbutton');
        const selectInput = within(modalContainer).getByRole('combobox');
        
        await user.clear(textInputs[0]); 
        await user.type(textInputs[0], 'Panchito Editado');
        await user.type(textInputs[1], 'Pudu puda (Editado)'); 
        await user.selectOptions(selectInput, 'marino'); 
        await user.clear(numberInput); 
        await user.type(numberInput, '9990'); 
        await user.type(textInputs[2], 'Editado Peligro'); 
        await user.type(textInputs[3], 'Editado Rescate');
        await user.type(textInputs[4], 'img-editada.jpg'); 

        // 6. Guardar
        await user.click(within(modalContainer).getByRole('button', { name: /Guardar/i }));

        // 7. Verificar
        expect(await screen.findByText('Panchito Editado')).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: /Editar Animal/i })).not.toBeInTheDocument();
        expect(screen.queryByText('Panchito')).not.toBeInTheDocument();
    });

    // Test 5: Eliminar un animal 
    test('Debe eliminar un animal de la tabla', async () => {
        const user = userEvent.setup();
        const mockAnimales = [
            { id: 1, nombre: 'Panchito', especie: 'Pudú', precio: 5000, categoria: 'terrestre' }
        ];
        localStorageMock.setItem('listaAnimales', JSON.stringify(mockAnimales));
        render(<MemoryRouter><AdminAnimales /></MemoryRouter>);

        expect(await screen.findByText('Panchito')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: /Eliminar/i }));
        expect(window.confirm).toHaveBeenCalled();
        expect(screen.queryByText('Panchito')).not.toBeInTheDocument();
        expect(localStorageMock.setItem).toHaveBeenCalledWith('listaAnimales', '[]');
    });

});

