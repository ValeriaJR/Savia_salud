"use client"
import Image from "next/image";
import "./globals.css";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import FormData from "form-data";
import axios from "axios";
import ModalH from "./components/Modal";

export default function Home() {
  const [mostrar, setMostrar] = useState(false)
  const [file, setFiles] = useState([])
  const [nombre, setNombre] = useState('Cargar los archivos de censo.')
  const [hospital, setHospitales] = useState([])
  const [open, setOpen] = useState(false)
  const data = new FormData()
  const date = new Date()


  const files = (e) => {
    setFiles([...file, ...Array.from(e.target.files)])
    setNombre(`Archivos cargados`)
  }

  const subirArchivo = async () => {
    const data = new FormData();
    for (let i = 0; i < file.length; i++) {
      data.append("files", file[i]);
    }
  
    try {
      const response = await axios.post("http://localhost:8000/api/cargar-archivos/", data);
      setMostrar(true);
      setHospitales(response.data.data);
      return response;
    } catch (error) {
      console.error(error);
      throw error; // Propaga el error para que toast.promise lo capture
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    toast.promise(subirArchivo(), {
      loading: 'Subiendo archivos...',
      success: 'Se cargó correctamente.',
      error: 'Hubo un error.',
    });
  };  

  const descargarArchivos = async (Url, name, message) => {
    try {
      const response = await axios.get(Url, {
        responseType: "blob"
      })
      const blob = new Blob([response.data], { type: response.headers["Content-Type"] })
      const link = document.createElement("a")
      const url = window.URL.createObjectURL(blob);
      link.href = url
      link.download = name

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      toast(message)
    }
  }

  useEffect(() => {
    if (mostrar) {
      setOpen(true)
    }
  }, [hospital])

  const restart = () => {
    location.reload()
  };

  return (
    <>
      <nav className="w-full h-20"  >
        <Image className="float-end mt-4" src="/logo_savia.png" alt="Logo Savia" width={100} height={100} />
      </nav>
      <div className="w-full h-screen back flex flex-col justify-start items-center">
        <h2 className="texto_cont mt-10 mb-5 " >Cargar datos</h2>
        <form onSubmit={handleSubmit}>
          {!mostrar ? <div className="flex justify-center items-center">
            <label className="custum-file-upload cursor-pointer" >
              <input type="file" multiple onChange={files} />
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
              </div>
              <h3>{nombre}</h3>
            </label>
          </div>
            :
            <div className="flex justify-center items-center opacity-80" >
              <label className="cursor-not-allowed custum-file-upload" >
                <input type="hidden" multiple onChange={files} />
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                </div>
                <h3>{nombre}</h3>
              </label>
            </div>
          }
          <div className="flex justify-center items-center mt-10 gap-2">
            {!mostrar && <button className='button px-4 py-1' type="submit" >Cargar datos</button>}
            {mostrar && <>
              <button className='button px-4 py-1' onClick={() => descargarArchivos("http://localhost:8000/api/descargar-csv/", `Altas ${date}.csv`, "No hay registros nuevos, no se puede descargar")} type="button">Dados de alta</button>
              <button className='button px-4 py-1' onClick={() => descargarArchivos("http://localhost:8000/api/descargar-censo-hoy/", `hospitalizacion ${date}.csv`, "No hay registros nuevos, no se puede descargar")} type="button" href="">En hospitalización</button>
              <button className='button px-4 py-1' onClick={() => descargarArchivos("http://localhost:8000/api/descargar-ingresos/", `Censo-hoy ${date}.csv`, "No hay registros nuevos, no se puede descargar")} type="button" >Nuevos ingresos</button>
              <button type="button" className='button px-4 py-1' onClick={restart}>Volver a cargar archivos</button>
            </>
            }
          </div>
        </form>
      </div>
      <div><Toaster /></div>
      <ModalH
        data={hospital}
        open={open}
        setOpen={setOpen}
      >
        <button className='button px-4 py-1' onClick={() => descargarArchivos("http://localhost:8000/api/descargar-hospital/", `No enviaron censo ${date}.csv`, "No hay registros nuevos, no se puede descargar")} type="button">Descargar reporte</button>
      </ModalH>

    </>
  );
}