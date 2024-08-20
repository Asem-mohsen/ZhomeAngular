import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  private scripts: any = {};

  constructor(@Inject(DOCUMENT) private document: Document) {}

  loadScript(name: string, src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      if (this.scripts[name]?.loaded) {
        resolve();
        return;
      }

      // Load script
      const script = this.document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = () => {
        this.scripts[name] = { loaded: true };
        resolve();
      };
      script.onerror = (error: any) => reject(error);
      this.document.body.appendChild(script);
    });
  }

  unloadScript(name: string): void {
    const scriptElement = document.querySelector(`script[data-name="${name}"]`);
    if (scriptElement) {
      // Remove the script element from the DOM
      scriptElement.remove();
      console.log(`Script ${name} unloaded successfully.`);
    } else {
      console.warn(`Script ${name} not found or already unloaded.`);
    }
  }
}
