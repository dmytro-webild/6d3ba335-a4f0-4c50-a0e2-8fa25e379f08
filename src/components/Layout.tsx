import { Outlet } from "react-router-dom";
import NavbarSplitLinks from "@/components/navbars/NavbarSplitLinks";
import FooterDashedColumns from "@/components/sections/footer/FooterDashedColumns";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-particles="auto" data-button="default" data-card="filled" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarSplitLinks
          brand="Jarlux Detailing"
          navItems={[
            {
              name: "Servicios",
              href: "#services"
            },
            {
              name: "Nosotros",
              href: "#about"
            },
            {
              name: "Calificaciones",
              href: "#metrics"
            },
            {
              name: "Opiniones",
              href: "#testimonial"
            },
            {
              name: "Preguntas",
              href: "#faq"
            }
          ]}
          secondaryButton={{
            text: "Ver Servicios",
            href: "#services"
          }}
          primaryButton={{
            text: "Contacto",
            href: "#contact"
          }}
        />
      </header>
      <main className="flex-grow" data-particles="auto" data-button="default" data-card="filled" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterDashedColumns
          brand="Jarlux Detailing"
          columns={[
            {
              title: "Servicios",
              links: [
                {
                  text: "Limpieza interior profunda",
                  href: "#services"
                },
                {
                  text: "Recubrimiento cerámico",
                  href: "#services"
                },
                {
                  text: "Restauración de faros",
                  href: "#services"
                }
              ]
            },
            {
              title: "Navegación",
              links: [
                {
                  text: "Inicio",
                  href: "#hero"
                },
                {
                  text: "Sobre nosotros",
                  href: "#about"
                },
                {
                  text: "Reseñas",
                  href: "#testimonial"
                },
                {
                  text: "Preguntas frecuentes",
                  href: "#faq"
                }
              ]
            },
            {
              title: "Contacto & Ubicación",
              links: [
                {
                  text: "(787) 470-8038",
                  href: "tel:787) 470-8038"
                },
                {
                  text: "contacto@jarluxdetailing.com",
                  href: "mailto:contacto@jarluxdetailing.com"
                },
                {
                  text: "F16 C. 1, Carolina, 00987",
                  href: "https://maps.google.com/?q=F16+C.+1,+Carolina,+00987"
                }
              ]
            }
          ]}
          copyright="Copyright © 2026 Jarlux Detailing."
          rights="Todos los derechos reservados."
          socials={[
            {
              icon: "Instagram",
              href: "#",
              label: "Instagram"
            },
            {
              icon: "Facebook",
              href: "#",
              label: "Facebook"
            },
            {
              icon: "Phone",
              href: "tel:787) 470-8038",
              label: "Teléfono"
            },
            {
              icon: "MapPin",
              href: "https://maps.google.com/?q=F16+C.+1,+Carolina,+00987",
              label: "Ubicación"
            }
          ]}
        />
      </footer>
    </div>
  );
}
