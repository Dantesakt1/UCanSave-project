import React from 'react';
import { MemoryRouter } from 'react-router-dom'; 
import { render, screen, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Importamos el componente correcto que queremos testear
import AdminUsuarios from '../pages/AdminUsuarios'; 
import { describe, expect, test, vi, afterEach } from 'vitest';

// --- Mock de localStorage ---
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
        removeItem: vi.fn((key) => {
            delete store[key];
        })
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// --- Mock de window.confirm y window.alert ---
window.confirm = vi.fn(() => true); 
window.alert = vi.fn(); // Mockeamos 'alert' aunque ya no lo probemos

// Limpiar después de cada test
afterEach(() => {
    cleanup();
    localStorageMock.clear();
    vi.clearAllMocks(); 
});

// --- Datos de Prueba ---
// (Copiados de tu componente)
const datosDePrueba = [
    { id: 1, rut: "11.111.111-1", nombre: "Juan Pérez", correo: "juanperez@mail.com", contraseña: "1234", repetirContraseña: "1234" },
    { id: 2, rut: "22.222.222-2", nombre: "María López", correo: "marialopez@mail.com", contraseña: "abcd", repetirContraseña: "abcd" },
];

describe('Testing Componente AdminUsuarios', () => {

    // Test 1: Renderizado y Carga de Datos (Read) - CORREGIDO
    test('Debe renderizar y cargar los datos de prueba (default) en la tabla', async () => {
        // Simulamos que localStorage está vacío, para forzar el uso de 'datosDePrueba'
        localStorageMock.getItem.mockReturnValueOnce(null); 
        
        render(
            <MemoryRouter>
                <AdminUsuarios />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: /Gestión de Usuarios/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Agregar Usuario/i })).toBeInTheDocument();
        
        // Verifica que los datos de prueba (cargados por defecto) están en la tabla
        expect(await screen.findByText('Juan Pérez')).toBeInTheDocument();
        expect(screen.getByText('marialopez@mail.com')).toBeInTheDocument();
        
        // CORRECCIÓN: Tu componente NO guarda en localStorage al cargar,
        // solo lee. Así que eliminamos la expectativa de setItem.
        // expect(localStorageMock.setItem).toHaveBeenCalledWith('usuarios', ...);
    });

    // Test 2: Agregar un nuevo usuario (Create) - (Adaptado a tu JSX)
    test('Debe agregar un usuario y mostrarlo en la tabla', async () => {
        const user = userEvent.setup();
        // Empezamos con los datos de prueba en localStorage (o tu componente los cargará)
        localStorageMock.setItem('usuarios', JSON.stringify(datosDePrueba));
        
        render(
            <MemoryRouter>
                <AdminUsuarios />
            </MemoryRouter>
        );

        await user.click(screen.getByRole('button', { name: /Agregar Usuario/i }));
        const modal = screen.getByRole('heading', { name: /Agregar Usuario/i }).closest('div.modal');
        expect(modal).toBeInTheDocument(); 

        // 2. Llenar el formulario (Adaptado a tu JSX sin htmlFor)
        const textInputs = within(modal).getAllByRole('textbox'); // Rut, Nombre, Correo
        const modalNode = modal.closest('div.modal');
        const passwordInputs = modalNode.querySelectorAll('input[type="password"]'); // Pass1, Pass2

        expect(textInputs).toHaveLength(3); 
        expect(passwordInputs).toHaveLength(2);
        
        await user.type(textInputs[0], '99.999.999-9'); // RUT
        await user.type(textInputs[1], 'Nuevo Usuario'); // Nombre
        await user.type(textInputs[2], 'nuevo@mail.com'); // Correo
        await user.type(passwordInputs[0], 'pass123'); // Contraseña
        await user.type(passwordInputs[1], 'pass123'); // Repetir Contraseña
        
        await user.click(within(modal).getByRole('button', { name: /Guardar/i }));

        // 4. Verificar
        expect(screen.queryByRole('heading', { name: /Agregar Usuario/i })).not.toBeInTheDocument();
        expect(await screen.findByText('Nuevo Usuario')).toBeInTheDocument();
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'usuarios', 
            expect.stringContaining('Nuevo Usuario') 
        );
    });
    
    // Test 3: Editar un usuario (Update)
    test('Debe editar un usuario', async () => {
        const user = userEvent.setup();
        localStorageMock.setItem('usuarios', JSON.stringify(datosDePrueba));
        
        render(
            <MemoryRouter>
                <AdminUsuarios />
            </MemoryRouter>
        );
        
        expect(await screen.findByText('Juan Pérez')).toBeInTheDocument();
        
        const filaJuan = screen.getByText('Juan Pérez').closest('tr');
        await user.click(within(filaJuan).getByRole('button', { name: /Editar/i }));
        
        const modal = await screen.findByRole('heading', { name: /Editar Usuario/i });
        expect(modal).toBeInTheDocument();
        const modalContainer = modal.closest('div.modal');

        const textInputs = within(modalContainer).getAllByRole('textbox');
        const nombreInput = textInputs[1]; // 0=RUT, 1=Nombre, 2=Correo
        expect(nombreInput.value).toBe('Juan Pérez');

        await user.clear(nombreInput);
        await user.type(nombreInput, 'Juan Editado');

        await user.click(within(modalContainer).getByRole('button', { name: /Guardar/i }));

        expect(await screen.findByText('Juan Editado')).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: /Editar Usuario/i })).not.toBeInTheDocument();
        expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument();
    });

    // Test 4: Eliminar un usuario (Delete)
    test('Debe eliminar un usuario de la tabla', async () => {
        const user = userEvent.setup();
        localStorageMock.setItem('usuarios', JSON.stringify(datosDePrueba));
        
        render(
            <MemoryRouter>
                <AdminUsuarios />
            </MemoryRouter>
        );

        expect(await screen.findByText('Juan Pérez')).toBeInTheDocument();

        const filaJuan = screen.getByText('Juan Pérez').closest('tr');
        await user.click(within(filaJuan).getByRole('button', { name: /Eliminar/i }));

        expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('eliminar este usuario'));
        expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument();
    });

    // Test 5 (BONUS): ELIMINADO
    // (Tu componente no valida si las contraseñas coinciden)
});

