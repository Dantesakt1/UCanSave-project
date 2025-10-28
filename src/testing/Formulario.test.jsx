import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Formulario from "../pages/Formulario";
import { describe, expect, test } from "vitest";

describe("testing formulario", () => {
  test("render", () => {
    render(<Formulario />);
    const titulo = screen.getByRole("heading", { name: /¿Quieres ser parte de U Can Save\?/i });
    expect(titulo).toBeInTheDocument();
  });

  test("ingreso en formulario", async () => {
    render(<Formulario />);
    const nombreInput = screen.getByRole("textbox", { name: /Nombre completo/i });
    const correoInput = screen.getByRole("textbox", { name: /Correo/i });
    const descripcionInput = screen.getByRole("textbox", { name: /Cuéntanos/i });
    const cvInput = screen.getByLabelText(/Adjunta tu CV/i);
    const boton = screen.getByRole("button", { name: /Postular/i });

    const usuario = userEvent.setup();
    await usuario.type(nombreInput, "Juan Pérez");
    await usuario.type(correoInput, "juan@correo.com");
    await usuario.type(descripcionInput, "Me apasiona ayudar");

    const file = new File(["curriculum"], "cv.pdf", { type: "application/pdf" });
    await usuario.upload(cvInput, file);

    await usuario.click(boton);

    const mensaje = await screen.findByRole("alert");
    expect(mensaje).toBeInTheDocument();
    expect(mensaje).toHaveTextContent(/Gracias Juan Pérez, tu postulación fue enviada/i);
  });
});