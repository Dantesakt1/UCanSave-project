import { render, screen } from "@testing-library/react";
import Formulario from "../pages/Formulario";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

describe('testing de formulario de postulación', () => {
    test('render', () => {
        render(<Formulario />);
        const titulo = screen.getByRole('heading', { name: /¿Quieres ser parte de U Can Save?/i });
        expect(titulo).toBeInTheDocument();
    });

    test('simular ingreso completo de formulario', async () => {
        render(<Formulario />);
        const usuario = userEvent.setup();

        const nombre = screen.getByRole('textbox', { name: /Nombre completo/i });
        const correo = screen.getByRole('textbox', { name: /Correo electrónico/i });
        const experiencia = screen.getByRole('combobox', { name: /Años de experiencia/i });
        const descripcion = screen.getByRole('textbox', { name: /Cuéntanos más sobre ti/i });
        const cv = screen.getByLabelText(/Adjunta tu CV/i);
        const boton = screen.getByRole('button', { name: /Postular/i });

        await usuario.type(nombre, 'Juan Pérez');
        await usuario.type(correo, 'juan@correo.com');
        await usuario.selectOptions(experiencia, '1 - 2 años');
        await usuario.type(descripcion, 'Me apasiona la conservación animal');

        const file = new File(['curriculum'], 'cv.pdf', { type: 'application/pdf' });
        await usuario.upload(cv, file);

        await usuario.click(boton);

        const alerta = screen.getByRole('alert');
        expect(alerta).toHaveTextContent(/Gracias Juan Pérez, tu postulación fue enviada/i);
    });

    test('mostrar errores cuando el formulario está vacío', async () => {
        render(<Formulario />);
        const usuario = userEvent.setup();

        const boton = screen.getByRole('button', { name: /Postular/i });
        await usuario.click(boton);

        const alerta = screen.getByRole('alert');
        expect(alerta).toHaveTextContent(/Nombre es requerido/i);
        expect(alerta).toHaveTextContent(/Correo es requerido/i);
        expect(alerta).toHaveTextContent(/Adjunta tu CV/i);
    });

    test('validar correo inválido', async () => {
        render(<Formulario />);
        const usuario = userEvent.setup();

        const nombre = screen.getByRole('textbox', { name: /Nombre completo/i });
        const correo = screen.getByRole('textbox', { name: /Correo electrónico/i });
        const descripcion = screen.getByRole('textbox', { name: /Cuéntanos más sobre ti/i });
        const cv = screen.getByLabelText(/Adjunta tu CV/i);
        const boton = screen.getByRole('button', { name: /Postular/i });

        // Llenar todos los campos excepto el correo correctamente
        await usuario.type(nombre, 'Juan Pérez');
        await usuario.type(correo, 'correo-invalido');
        await usuario.type(descripcion, 'Me gusta ayudar');
        
        const file = new File(['cv'], 'curriculum.pdf', { type: 'application/pdf' });
        await usuario.upload(cv, file);

        await usuario.click(boton);

        const alerta = screen.getByRole('alert');
        expect(alerta).toHaveTextContent(/Correo inválido/i);
    });

    test('resetear formulario después de envío exitoso', async () => {
        render(<Formulario />);
        const usuario = userEvent.setup();

        const nombre = screen.getByRole('textbox', { name: /Nombre completo/i });
        const correo = screen.getByRole('textbox', { name: /Correo electrónico/i });
        const descripcion = screen.getByRole('textbox', { name: /Cuéntanos más sobre ti/i });
        const cv = screen.getByLabelText(/Adjunta tu CV/i);
        const boton = screen.getByRole('button', { name: /Postular/i });

        await usuario.type(nombre, 'Ana García');
        await usuario.type(correo, 'ana@correo.com');
        await usuario.type(descripcion, 'Quiero ayudar');

        const file = new File(['cv'], 'curriculum.pdf', { type: 'application/pdf' });
        await usuario.upload(cv, file);

        await usuario.click(boton);

        expect(nombre).toHaveValue('');
        expect(correo).toHaveValue('');
        expect(descripcion).toHaveValue('');
    });
});