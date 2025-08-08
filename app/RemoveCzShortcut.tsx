'use client';

import { useEffect } from 'react';

export function RemoveCzShortcut() {
  useEffect(() => {
    // Remove o atributo cz-shortcut-listen para evitar erros de hidratação
    const removeCzShortcut = () => {
      if (typeof document !== 'undefined') {
        document.body.removeAttribute('cz-shortcut-listen');
      }
    };

    // Remove o atributo imediatamente
    removeCzShortcut();

    // Configura um MutationObserver para remover o atributo caso ele seja adicionado dinamicamente
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'cz-shortcut-listen') {
          document.body.removeAttribute('cz-shortcut-listen');
        }
      });
    });

    // Inicia a observação do elemento body
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['cz-shortcut-listen'],
      childList: false,
      subtree: false,
    });

    // Limpa o observer quando o componente for desmontado
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
