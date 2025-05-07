import { manejarFormulario } from './MensajeErrorFrom.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('vacanteForm');

    const validateForm = () => {
        const requiredFields = [
            'titulo', 'ciudad', 'departamento','tipo', 'experiencia',
            'modalidad', 'cargo', 'descripcion', 'requerimientos','sueldo'
        ];

        for (const id of requiredFields) {
            const input = document.getElementById(id);
            if (!input || !input.value.trim()) {
                alert('Por favor completa todos los campos requeridos.');
                return false;
            }
        }

        const sueldo = document.getElementById('sueldo').value.trim();
        if (sueldo && isNaN(sueldo)) {
            alert('El sueldo debe ser un número válido.');
            return false;
        }

        return true;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        console.log(formData.get("tipo")); // ← Esto debería mostrar "Practica" o "Vacante"


        manejarFormulario({
            form,
            validateForm,
            buildData: (formData) => ({
                titulo: formData.get('titulo'),
                ciudad: formData.get('ciudad'),
                departamento: formData.get('departamento'),
                tipo: formData.get('tipo'),
                modalidad: formData.get('modalidad'),
                sueldo: formData.get('sueldo'),
                cargo: formData.get('cargo'),
                experiencia: formData.get('experiencia'),
                descripcion: formData.get('descripcion'),
                requerimientos: formData.get('requerimientos'),
            }),
            endpointUrl: 'http://localhost:8080/api/vacantes/add',
            redirectUrl: '/empleos/listadoVacantes'
        });
    });
});
