import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ReservationForm = () => {
  const [mesas, setMesas] = useState([]);

  // Función para hacer el fetch de las mesas
  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");
    fetch("http://127.0.0.1:8000/api/v2/mesas/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMesas(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Función que cuando se da click en una mesa se pone una alerta de SweetAlert2 pidiendo datos para la reserva
  const handleTableClick = (mesa) => {
    const { id, numero } = mesa;
    Swal.fire({
      title: `Reservar mesa ${numero}`,
      html: `
        <label for="swal-input-date">Fecha:</label>
        </br>
        <input id="swal-input-date" class="swal2-input" type="date" min="${
          new Date().toISOString().split("T")[0]
        }">
        <label for="swal-input1">Hora de entrada:</label>
        </br>
        <input id="swal-input1" class="swal2-input" placeholder="Hora de entrada" type="time">
        </br>
        <label for="swal-input2">Cantidad de personas:</label>
        </br>
        <input id="swal-input2" class="swal2-input" placeholder="Cantidad de personas" type="number" min="1">
        <label for="swal-input3">Hora de salida (opcional):</label>
        </br>
        <input id="swal-input3" class="swal2-input" placeholder="Hora de salida" type="time">
      `,
      focusConfirm: false,
      allowOutsideClick: false,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const fecha = document.getElementById("swal-input-date").value;
        let hora_entrada = document.getElementById("swal-input1").value;
        const cantidad_personas = document.getElementById("swal-input2").value;
        const hora_salida = document.getElementById("swal-input3").value;

        // Validaciones
        if (!fecha || !hora_entrada || !cantidad_personas) {
          Swal.showValidationMessage(
            "Todos los campos son obligatorios, excepto la hora de salida"
          );
          return false;
        }

        const entradaDate = new Date(`${fecha}T${hora_entrada}:00`);
        const minTime = new Date(`${fecha}T10:00:00`);
        const maxTime = new Date(`${fecha}T20:00:00`);

        if (entradaDate < minTime || entradaDate > maxTime) {
          Swal.showValidationMessage(
            "La hora de entrada debe estar entre las 10:00 AM y las 8:00 PM"
          );
          return false;
        }

        if (cantidad_personas <= 0) {
          Swal.showValidationMessage(
            "La cantidad de personas debe ser un número positivo"
          );
          return false;
        }

        const currentDate = new Date(); // Fecha y hora actual en la zona horaria local
        const selectedDate = new Date(`${fecha}T${hora_entrada}:00`); // La fecha y hora seleccionadas

        // Asegúrate de que ambas fechas estén en la misma zona horaria (local)
        const currentDateLocal = new Date(currentDate.getTime());
        const selectedDateLocal = new Date(selectedDate.getTime());

        // Verificar si la hora de entrada es al menos 10 minutos en el futuro
        const tenMinutesFromNow = new Date(
          currentDateLocal.getTime() + 10 * 60000
        );
        if (selectedDateLocal < tenMinutesFromNow) {
          Swal.showValidationMessage(
            "La hora de entrada debe ser al menos 10 minutos en el futuro"
          );
          return false;
        }

        // Ajustar la hora de entrada para que siempre termine en ":00" si es necesario
        hora_entrada += ":00";

        return { fecha, hora_entrada, cantidad_personas, hora_salida };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { fecha, hora_entrada, cantidad_personas, hora_salida } =
          result.value;
        const token = sessionStorage.getItem("access_token");

        fetch("http://127.0.0.1:8000/api/v1/crear-reserva", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mesa_id: id,
            fecha_reserva: fecha,
            hora_reserva: hora_entrada,
            cantidad_personas,
            hora_salida: hora_salida || null, // Enviar null si la hora de salida no está presente
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("La mesa ya tiene una reserva");
            }
            return response.json();
          })
          .then((data) => {
            if (data.id) {
              Swal.fire(
                "Reserva creada",
                `Reservaste mesa ${numero} para el ${data.fecha_reserva} a las ${data.hora_reserva}`,
                "success"
              );
            } else {
              Swal.fire(
                "Error",
                "Hubo un problema al crear la reserva",
                "error"
              );
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              `Hubo un problema al crear la reserva: ${error.message}`,
              "error"
            );
            console.log("Error creating reservation:", error);
          });
      }
    });
  };

  return (
    <div>
      <div className="container-colors">
        <p>
          Mesas libres <span className="color-box color-element-true"></span>
        </p>
        <p>
          Mesas Ocupadas <span className="color-box color-element-false"></span>
        </p>
      </div>

      <div className="decoration">
        {mesas.map((mesa, index) => (
          <div
            key={index}
            className={`table-container ${mesa.capacidad > 4 ? "large" : ""}`}
          >
            <div
              className={`table ${
                mesa.Estado === "Activa" ? "table-inactive" : "table-active"
              }`}
              onClick={() => handleTableClick(mesa)}
            >
              {Array.from({ length: mesa.capacidad }).map((_, i) => (
                <div
                  key={i}
                  className={`chair ${
                    ["top", "right", "bottom", "left"][i % 4]
                  }`}
                ></div>
              ))}
            </div>
            <div className="table-number">Mesa {mesa.numero}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationForm;
