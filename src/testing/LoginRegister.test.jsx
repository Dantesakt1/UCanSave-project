import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LoginRegister from "../pages/LoginRegister";
import { describe, expect, test } from "vitest";

describe("testing LoginRegister", () => {
  test("render", () => {
    render(
      <MemoryRouter>
        <LoginRegister />
      </MemoryRouter>
    );
    const titulo = screen.getByText(/Login/i);
    expect(titulo).toBeInTheDocument();
  });

  test("login muestra error cuando contraseña vacía", async () => {
    render(
      <MemoryRouter>
        <LoginRegister />
      </MemoryRouter>
    );
    // hay dos inputs con el mismo placeholder; tomamos el primero (login)
    const correo = screen.getAllByPlaceholderText(/Ingresa tu correo/i)[0];
    const boton = screen.getByRole("button", { name: /Ingresar/i });

    const usuario = userEvent.setup();
    await usuario.type(correo, "usuario@duoc.cl");
    await usuario.click(boton);

    const mensaje = await screen.findByText(/La contraseña no puede estar vacía\./i);
    expect(mensaje).toBeInTheDocument();
  });

  test("login exitoso para usuario con dominio válido", async () => {
    render(
      <MemoryRouter>
        <LoginRegister />
      </MemoryRouter>
    );
    const correo = screen.getAllByPlaceholderText(/Ingresa tu correo/i)[0];
    const pass = screen.getByPlaceholderText(/Ingresa tu contraseña/i);
    const boton = screen.getByRole("button", { name: /Ingresar/i });

    const usuario = userEvent.setup();
    await usuario.type(correo, "ana@ucansave.com");
    await usuario.type(pass, "cualquierpass");
    await usuario.click(boton);

    const mensaje = await screen.findByText(/Inicio de sesión exitoso/i);
    expect(mensaje).toBeInTheDocument();
  });

  test("login ADMIN muestra mensaje de admin", async () => {
    render(
      <MemoryRouter>
        <LoginRegister />
      </MemoryRouter>
    );
    const correo = screen.getAllByPlaceholderText(/Ingresa tu correo/i)[0];
    const pass = screen.getByPlaceholderText(/Ingresa tu contraseña/i);
    const boton = screen.getByRole("button", { name: /Ingresar/i });

    const usuario = userEvent.setup();
    await usuario.type(correo, "admin@ucansave.com");
    await usuario.type(pass, "admin123");
    await usuario.click(boton);

    const mensaje = await screen.findByText(/Inicio de sesión \(ADMIN\) exitoso/i);
    expect(mensaje).toBeInTheDocument();
  });
});