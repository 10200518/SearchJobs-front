import { manejarFormulario } from './MensajeErrorFrom.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('vacanteForm');
    
    const validateForm = () => {
        const requiredFields = [
            "nombre","sectorEmpresa","correo","passwordEmpresa","telefono"
            ,"nit","descripcion","sitioWeb"
        ];

        for (const id of requiredFields) {
            const input = document.getElementById(id);
            if (!input || !input.value.trim()) {
                alert('Por favor completa todos los campos requeridos.');
                return false;
            }
        }

        return true;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        manejarFormulario({
            form,
            validateForm,
            buildData: (formData) => ({
                nombre: formData.get('nombre'),
                sectorEmpresarial: formData.get('sectorEmpresa'),
                correo: formData.get('correo'),
                contrasena: formData.get('passwordEmpresa'),
                telefono: formData.get('telefono'),
                nit: formData.get('nit'),
                descripcion: formData.get('descipcion'),
                sitioWeb: formData('sitioWeb')
            }),
            endpointUrl: "http://localhost:8080/api/empresas/edit/",
            redirectUrl: '/perfil/candidato',
            metodo:"PUT"
        });
    });
});
