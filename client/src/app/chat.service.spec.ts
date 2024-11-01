import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbaseService {
  constructor() {}

  loadChatbot() {
    // Cargar el script solo si no existe ya en el DOM
    if (!document.getElementById('chatbase-script')) {
      // Crear un elemento script para configurar el chatbot
      const configScript = document.createElement('script');
      configScript.type = 'text/javascript';
      configScript.innerHTML = `
        window.embeddedChatbotConfig = {
          chatbotId: "Vdn2K8O2xnualA1ok2km_",
          domain: "www.chatbase.co"
        };
      `;
      document.body.appendChild(configScript);

      // Crear un segundo elemento script para el código embed de Chatbase
      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.setAttribute('chatbotId', 'Vdn2K8O2xnualA1ok2km_');
      script.setAttribute('domain', 'www.chatbase.co');
      script.defer = true;
      script.id = 'chatbase-script';
      document.body.appendChild(script);
    }
  }
}
