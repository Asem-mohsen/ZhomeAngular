import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylesheetLoaderService {

  loadStylesheet(name: string, href: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) {
        resolve(); // The stylesheet is already loaded
        return;
      }

      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = href;

      linkElement.onload = () => resolve();
      linkElement.onerror = () => reject(`Could not load stylesheet: ${href}`);

      document.head.appendChild(linkElement);
    });
  }
}