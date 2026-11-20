import HeroDotField from "@/components/sections/hero/HeroDotField";
import AboutParticleRow from "@/components/sections/about/AboutParticleRow";
import ServicesDotCells from "@/components/sections/features/ServicesDotCells";
import MetricsGrowFrame from "@/components/sections/metrics/MetricsGrowFrame";
import TestimonialHalftoneLead from "@/components/sections/testimonial/TestimonialHalftoneLead";
import FaqCellRows from "@/components/sections/faq/FaqCellRows";
import ContactSplitCell from "@/components/sections/contact/ContactSplitCell";
import LoaderFrameDraw from "@/components/loaders/LoaderFrameDraw";

export default function HomePage() {
  return (
    <>
      <LoaderFrameDraw
        introDelay={1}
      />

      <div id="hero" data-webild-section="HeroDotField" data-webild-section-id="HeroDotField-1" data-section="hero" data-scene>
        <HeroDotField
          tag={{
            text: "Detailing en Carolina, PR",
            href: "#services"
          }}
          title="Tu auto brilla. Luce como nuevo."
          description="Limpieza profunda y detailing profesional en Carolina para devolver el brillo a tu vehículo."
          primaryButton={{
            text: "Llamar ahora",
            href: "tel:7874708038"
          }}
          secondaryButton={{
            text: "Ver servicios",
            href: "#services"
          }}
          introDelay={1}
        />
      </div>

      <div id="about" data-webild-section="AboutParticleRow" data-webild-section-id="AboutParticleRow-1" data-section="about">
        <AboutParticleRow
          label="Cuidado profesional"
          title="Meticulosidad en cada rincón del vehículo"
          description="Trabajamos cada superficie con técnicas especializadas para proteger la pintura y sanear el interior por completo."
          points={[
            "Tratamiento detallado para interiores y exteriores",
            "Productos de alta gama para máxima protección",
            "Atención personalizada para cada auto en Carolina",
            "Técnicas avanzadas de corrección y pulido"
          ]}
          items={[
            {
              title: "Protección de pintura",
              description: "Selladores que resguardan la carrocería del sol.",
              icon: "lock"
            },
            {
              title: "Entregas a tiempo",
              description: "Procesos organizados para devolverte el auto rápido.",
              icon: "zap"
            },
            {
              title: "Atención a medida",
              description: "Tratamientos específicos según el estado del vehículo.",
              icon: "check"
            },
            {
              title: "Calidad comprobada",
              description: "Resultados impecables evaluados con estándares rigurosos.",
              icon: "gauge"
            }
          ]}
        />
      </div>

      <div id="services" data-webild-section="ServicesDotCells" data-webild-section-id="ServicesDotCells-1" data-section="services">
        <ServicesDotCells
          title="Servicios para cada necesidad"
          items={[
            {
              title: "Recubrimiento Cerámico",
              description: "Protección duradera desde $250 que repele la suciedad y resalta el brillo.",
              button: {
                text: "Reservar cita",
                href: "#contact"
              }
            },
            {
              title: "Limpieza Interior",
              description: "Desinfección profunda desde $95 en alfombras, asientos y paneles de tapicería.",
              button: {
                text: "Reservar cita",
                href: "#contact"
              }
            },
            {
              title: "Restauración de Faros",
              description: "Eliminación del tono amarillo desde $45 para recuperar el alcance de luz.",
              button: {
                text: "Reservar cita",
                href: "#contact"
              }
            },
            {
              title: "Corrección de Pintura",
              description: "Eliminación de microrrayones para devolver la claridad y suavidad a la superficie.",
              button: {
                text: "Reservar cita",
                href: "#contact"
              }
            }
          ]}
        />
      </div>

      <div id="metrics" data-webild-section="MetricsGrowFrame" data-webild-section-id="MetricsGrowFrame-1" data-section="metrics">
        <MetricsGrowFrame
          label="Reseñas de clientes"
          title="Confianza comprobada en Google."
          items={[
            {
              value: "5.0",
              label: "Calificación Google"
            },
            {
              value: 100,
              suffix: "%",
              label: "Acabado impecable"
            },
            {
              value: 8,
              suffix: "+",
              label: "Reseñas 5 estrellas"
            },
            {
              value: 100,
              suffix: "%",
              label: "Atención dedicada"
            }
          ]}
        />
      </div>

      <div id="testimonial" data-webild-section="TestimonialHalftoneLead" data-webild-section-id="TestimonialHalftoneLead-1" data-section="testimonial">
        <TestimonialHalftoneLead
          title="Lo que dicen en Carolina"
          items={[
            {
              quote: "Dejé el auto con la tapicería manchada y me lo devolvieron como nuevo.",
              name: "Carlos López",
              role: "Cliente regular",
              imageSrc: "https://img.b2bpic.net/free-photo/attractive-young-man-looking-out-car-window_23-2147937253.jpg",
              imageAlt: "An attractive young man looking out of car window"
            },
            {
              quote: "El tratamiento en los faros cambió por completo la imagen de mi vehículo. Excelente atención.",
              name: "Camila Martínez",
              role: "Conductora local",
              imageSrc: "https://img.b2bpic.net/free-photo/close-up-happy-customer-car-dealership_23-2149117152.jpg",
              imageAlt: "Close up on happy customer in car dealership"
            },
            {
              quote: "Atención rápida en Carolina y el brillo de la pintura dura semanas sin perder intensidad.",
              name: "Alejandro Navarro",
              role: "Cliente frecuente",
              imageSrc: "https://img.b2bpic.net/free-photo/handsome-man-is-buyer-standing-new-car-dealer-center-looking-camera_146671-14725.jpg",
              imageAlt: "A handsome man is a buyer standing next to a new car at the dealer center and looking at the camera."
            },
            {
              quote: "Puntuales en la entrega y muy cuidadosos con los detalles de la limpieza interior.",
              name: "Valeria Ruiz",
              role: "Propietaria de SUV",
              imageSrc: "https://img.b2bpic.net/free-photo/young-rural-travellers-driving-through-country-side_23-2149052480.jpg",
              imageAlt: "Young rural travellers driving through the country side"
            }
          ]}
        />
      </div>

      <div id="faq" data-webild-section="FaqCellRows" data-webild-section-id="FaqCellRows-1" data-section="faq">
        <FaqCellRows
          title="Antes de traer tu auto."
          items={[
            {
              title: "¿Cuánto tarda un servicio de detailing?",
              description: "Depende del estado de la unidad; una limpieza interior profunda toma unas 4 horas y un tratamiento cerámico hasta 8 horas."
            },
            {
              title: "¿Es necesario pedir cita previa?",
              description: "Sí, coordinamos cada vehículo por turno para dedicarle el tiempo necesario sin prisas. Puedes llamar al (787) 470-8038."
            },
            {
              title: "¿Qué métodos de pago aceptan?",
              description: "Aceptamos efectivo, ATH Móvil y las principales tarjetas de crédito al finalizar el trabajo en nuestro taller en Carolina."
            },
            {
              title: "¿Dónde están ubicados y cuál es el horario?",
              description: "Estamos situados en F16 C. 1, Carolina, 00987. Atendemos de lunes a sábado en horario de 8:00 AM a 5:30 PM."
            },
            {
              title: "¿Cuáles son los precios iniciales de sus servicios?",
              description: "La restauración de faros comienza en $45, la limpieza interior profunda en $95 y el recubrimiento cerámico en $250."
            },
            {
              title: "¿Qué incluye la limpieza interior profunda?",
              description: "Aspirado minucioso, desinfección de asientos y paneles, limpieza de vinilos y acondicionador de plásticos para dejarlo como nuevo."
            }
          ]}
        />
      </div>

      <div id="contact" data-webild-section="ContactSplitCell" data-webild-section-id="ContactSplitCell-1" data-section="contact">
        <ContactSplitCell
          title="Agenda tu cita de detailing"
          submitText="Enviar mensaje"
          successText="Gracias. Te contactaremos muy pronto para confirmar la cita de tu vehículo."
          imageSrc="https://img.b2bpic.net/free-photo/close-up-car-care-process_23-2149193155.jpg"
          imageAlt="Close up on car care process"
          labels={{
            name: "Nombre completo",
            email: "Correo electrónico",
            company: "Modelo de auto",
            message: "Detalles del servicio"
          }}
        />
      </div>
    </>
  );
}
