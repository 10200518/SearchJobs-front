// import { useEffect, useState } from 'react';
// import '../styles/pages/candidato.css';

// function SobreMi() {
//   const [perfil, setPerfil] = useState(null);

//   useEffect(() => {
//     const fetchPerfil = async () => {
//       try {
//         const res = await fetch('http://localhost:8080/api/candidatos/perfil', {
//           credentials: 'include',
//         });

//         if (!res.ok) {
//           throw new Error('Error al obtener el perfil');
//         }

//         const data = await res.json();
//         console.log(data); // <-- Aquí ves el objeto completo
//         setPerfil(data);
//       } catch (error) {
//         console.error('Error al obtener el perfil:', error);
//       }
//     };

//     fetchPerfil();
//   }, []);

//   if (!perfil) return <div>Cargando perfil...</div>;

// return (
//   <div>
//     {/* Columna izquierda: perfil */}
//     <div className="w-full md:w-1/3 lg:w-1/4">
//       {/* contenido del perfil */}
//     </div>

//     {/* Columna derecha: SOBRE MÍ y EDUCACIÓN juntos */}
//     <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
//       {/* Sobre mí */}
//       <button 
//             id="editProfileBtn"
//             class="absolute p-2 text-white transition-all duration-300 bg-blue-600 rounded-full shadow-sm top-4 right-4 hover:bg-blue-700 hover:scale-110"
//             aria-label="Editar perfil"
//           >
//              </button>
//       <div className="relative p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
//         <h2 className="flex items-center mb-4 text-xl font-semibold">Sobre mí</h2>
//         <p className="text-gray-600">{perfil.candidato.descripcion}</p>
//       </div>
//     </div>
//   </div>
// );
//       }
//       export default SobreMi;